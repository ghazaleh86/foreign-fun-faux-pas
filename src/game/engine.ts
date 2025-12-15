import type { Phrase } from "@/types/quiz";
import { addLearnedPhrase } from "@/utils/learnedPhrases";
import { addStuds, getRewardsState, setRewardsState } from "@/utils/gameRewards";
import { calculateStars } from "@/utils/starSystem";
import type { Action, AnswerOption, GameState } from "./types";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildOptions(phrase: Phrase): AnswerOption[] {
  const opts: AnswerOption[] = [
    { label: phrase.correct_meaning, isCorrect: true },
    { label: phrase.incorrect1, isCorrect: false },
    { label: phrase.incorrect2, isCorrect: false },
  ];
  return shuffle(opts);
}

export function createInitialState(): GameState {
  const rewards = getRewardsState();
  return {
    version: 1,
    mode: "landing",
    settings: {
      language: null,
      stageSize: 10,
      timeLimitSec: 30,
      totalStages: 1,
    },
    deck: { phraseIds: [] },
    phrasesById: {},
    question: {
      idx: 0,
      selectedOption: null,
      showAnswer: false,
      feedback: null,
      secondsElapsed: 0,
    },
    progress: {
      stage: 0,
      scoreTotal: 0,
      stageScore: 0,
      stageCorrect: 0,
      hearts: 3,
      maxHearts: 3,
      totalStars: 0,
      studs: rewards.studs ?? 0,
    },
  };
}

function stageFromIdx(idx: number, stageSize: number) {
  return Math.floor(idx / stageSize);
}

function isStageEnd(nextIdx: number, stageSize: number) {
  return nextIdx % stageSize === 0;
}

export function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "GO_LANGUAGE":
      return { ...state, mode: "language" };

    case "START": {
      const totalStages = Math.max(1, Math.ceil(action.deck.phraseIds.length / state.settings.stageSize));
      const rewards = getRewardsState();
      return {
        ...state,
        mode: "playing",
        settings: { ...state.settings, language: action.language, totalStages },
        deck: action.deck,
        phrasesById: action.phrasesById,
        question: { idx: 0, selectedOption: null, showAnswer: false, feedback: null, secondsElapsed: 0 },
        progress: {
          ...state.progress,
          stage: 0,
          scoreTotal: 0,
          stageScore: 0,
          stageCorrect: 0,
          hearts: state.progress.maxHearts,
          studs: rewards.studs ?? state.progress.studs,
        },
      };
    }

    case "TICK": {
      if (state.mode !== "playing") return state;
      if (state.question.showAnswer) return state;
      const nextElapsed = state.question.secondsElapsed + 1;
      if (nextElapsed < state.settings.timeLimitSec) {
        return { ...state, question: { ...state.question, secondsElapsed: nextElapsed } };
      }
      // Time ran out: treat as wrong answer.
      const nextHearts = clamp(state.progress.hearts - 1, 0, state.progress.maxHearts);
      return {
        ...state,
        question: {
          ...state.question,
          secondsElapsed: state.settings.timeLimitSec,
          showAnswer: true,
          feedback: nextHearts === 0 ? "⏰ Time’s up! You’re out of hearts." : "⏰ Time’s up!",
        },
        progress: { ...state.progress, hearts: nextHearts },
      };
    }

    case "ANSWER": {
      if (state.mode !== "playing") return state;
      if (state.question.selectedOption !== null) return state;

      const phraseId = state.deck.phraseIds[state.question.idx];
      const phrase = phraseId ? state.phrasesById[phraseId] : undefined;
      const isCorrect = action.isCorrect;

      if (isCorrect && phrase) {
        // Learned phrase collection (local)
        addLearnedPhrase(phrase);
      }

      // lightweight rewards
      if (isCorrect) addStuds(1);

      const nextHearts = isCorrect ? state.progress.hearts : clamp(state.progress.hearts - 1, 0, state.progress.maxHearts);
      const nextStageCorrect = state.progress.stageCorrect + (isCorrect ? 1 : 0);
      const nextStageScore = state.progress.stageScore + (isCorrect ? 1 : 0);
      const nextScoreTotal = state.progress.scoreTotal + (isCorrect ? 1 : 0);

      return {
        ...state,
        question: {
          ...state.question,
          selectedOption: action.selected,
          showAnswer: true,
          feedback: isCorrect ? `✅ Correct! (${state.question.secondsElapsed}s)` : "❌ Oof! Try the next one.",
        },
        progress: {
          ...state.progress,
          hearts: nextHearts,
          stageCorrect: nextStageCorrect,
          stageScore: nextStageScore,
          scoreTotal: nextScoreTotal,
          studs: getRewardsState().studs,
        },
      };
    }

    case "NEXT": {
      if (state.mode !== "playing") return state;
      const nextIdx = state.question.idx + 1;

      const reachedEnd = nextIdx >= state.deck.phraseIds.length;
      const nextStage = stageFromIdx(nextIdx, state.settings.stageSize);
      const currentStage = state.progress.stage;

      // If out of hearts, show stage summary (acts as fail screen).
      if (state.progress.hearts <= 0) {
        return { ...state, mode: "stage_summary" };
      }

      // End of deck => game summary
      if (reachedEnd) {
        return { ...state, mode: "game_summary" };
      }

      // Stage boundary => stage summary
      if (nextStage !== currentStage && isStageEnd(nextIdx, state.settings.stageSize)) {
        return { ...state, mode: "stage_summary" };
      }

      return {
        ...state,
        question: { idx: nextIdx, selectedOption: null, showAnswer: false, feedback: null, secondsElapsed: 0 },
      };
    }

    case "STAGE_CONTINUE": {
      if (state.mode !== "stage_summary") return state;
      const stageStars = calculateStars(state.progress.stageCorrect, state.settings.stageSize);
      const studsEarned = stageStars * 5 + Math.max(0, state.progress.stageCorrect - 2);

      addStuds(studsEarned);
      // keep studs in sync (we store in rewards state)
      const rewards = getRewardsState();
      setRewardsState({ ...rewards, studs: rewards.studs });

      const nextStage = state.progress.stage + 1;
      const nextIdx = nextStage * state.settings.stageSize;
      const reachedEnd = nextIdx >= state.deck.phraseIds.length;

      // If player failed the stage (too few correct or hearts empty), reset stage but keep deck.
      const passed = state.progress.stageCorrect >= 3 && state.progress.hearts > 0;
      if (!passed) {
        const stageStart = state.progress.stage * state.settings.stageSize;
        return {
          ...state,
          mode: "playing",
          question: { idx: stageStart, selectedOption: null, showAnswer: false, feedback: null, secondsElapsed: 0 },
          progress: {
            ...state.progress,
            hearts: state.progress.maxHearts,
            stageScore: 0,
            stageCorrect: 0,
          },
        };
      }

      if (reachedEnd) {
        return {
          ...state,
          mode: "game_summary",
          progress: {
            ...state.progress,
            totalStars: state.progress.totalStars + stageStars,
            studs: getRewardsState().studs,
          },
        };
      }

      return {
        ...state,
        mode: "playing",
        question: { idx: nextIdx, selectedOption: null, showAnswer: false, feedback: null, secondsElapsed: 0 },
        progress: {
          ...state.progress,
          stage: nextStage,
          stageScore: 0,
          stageCorrect: 0,
          totalStars: state.progress.totalStars + stageStars,
          studs: getRewardsState().studs,
        },
      };
    }

    case "RESET_RUN": {
      const rewards = getRewardsState();
      return {
        ...createInitialState(),
        progress: { ...createInitialState().progress, studs: rewards.studs },
        mode: "language",
      };
    }

    case "BACK_TO_START":
      return { ...createInitialState(), progress: { ...createInitialState().progress, studs: getRewardsState().studs } };

    default:
      return state;
  }
}

