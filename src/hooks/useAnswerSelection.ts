
import { useCallback } from "react";
import { 
  computeSpeedBonus, 
  getSpeedBonusXP, 
  randomWrongTaunt, 
  STAGE_SIZE
} from "@/utils/quizHelpers";
import { Option } from "@/components/MultipleChoiceOptions";
import { Phrase } from "@/types/quiz";

interface UseAnswerSelectionProps {
  selected: number | null;
  setSelected: (value: number | null) => void;
  setShowAnswer: (value: boolean) => void;
  getElapsed: () => number;
  optionOrder: Option[];
  addStars: (stars: number) => void;
  setRoundCorrect: (value: number | ((prev: number) => number)) => void;
  setScore: (value: number | ((prev: number) => number)) => void;
  updateStageScores: (stage: number, value: number) => void;
  updateStageCorrectCounts: (stage: number, value: number) => void;
  updateStageTotalCounts: (stage: number, value: number) => void;
  stage: number;
  setFeedback: (feedback: string | null) => void;
  phrase: Phrase | undefined;
  markPhraseAsLearned: (phrase: Phrase) => void;
  markPhraseAsPlayed: (phraseId: string) => void;
  profile: any;
  loseHeart: () => void;
  updateOpponentScores: (stage: number, value: number) => void;
  opponentName: string;
  current: number;
  currentStageStart: number;
  phrases: Phrase[];
  setStageCompleted: (value: boolean) => void;
}

export function useAnswerSelection({
  selected,
  setSelected,
  setShowAnswer,
  getElapsed,
  optionOrder,
  addStars,
  setRoundCorrect,
  setScore,
  updateStageScores,
  updateStageCorrectCounts,
  updateStageTotalCounts,
  stage,
  setFeedback,
  phrase,
  markPhraseAsLearned,
  markPhraseAsPlayed,
  profile,
  loseHeart,
  updateOpponentScores,
  opponentName,
  current,
  currentStageStart,
  phrases,
  setStageCompleted,
}: UseAnswerSelectionProps) {
  const handleSelect = useCallback((idx: number) => {
    if (selected !== null) return;
    console.log("🎯 QuizLogic: Answer selected:", idx);
    setSelected(idx);
    setShowAnswer(true);

    let timeTaken = getElapsed();

    if (optionOrder[idx].isCorrect) {
      // No XP in new system
      setRoundCorrect((c) => c + 1);
      // Simple scoring: 1 point per correct answer
      setScore((s) => s + 1);
      updateStageScores(stage, 1);
      updateStageCorrectCounts(stage, 1);
      setFeedback(`🎉 Correct! Time: ${timeTaken}s`);
      
      // Mark phrase as learned immediately when answered correctly
      if (phrase) {
        markPhraseAsLearned(phrase);
      }
    } else {
      loseHeart();
      const opponentGotIt = Math.random() < 0.7 ? 1 : 0;
      updateOpponentScores(stage, opponentGotIt);
      setFeedback(randomWrongTaunt(opponentName));
    }

    // Always track total questions answered
    updateStageTotalCounts(stage, 1);

    // Mark this phrase as played immediately
    if (phrase) {
      markPhraseAsPlayed(phrase.id);
    }

    // Check if this is truly the last question in the stage
    const currentPositionInStage = current - currentStageStart + 1;
    const maxQuestionsInStage = Math.min(STAGE_SIZE, phrases.length - currentStageStart);
    const isLastInStage = currentPositionInStage >= maxQuestionsInStage;
    const isLastOverall = current >= phrases.length - 1;

    console.log("🔍 useAnswerSelection: Stage completion check:", {
      current,
      currentStageStart,
      currentPositionInStage,
      maxQuestionsInStage,
      isLastInStage,
      isLastOverall,
      profileHearts: profile?.hearts,
      isCorrect: optionOrder[idx].isCorrect
    });

    // If game over (no more hearts), auto end stage
    if (profile && profile.hearts === 1 && !optionOrder[idx].isCorrect) {
      console.log("💔 useAnswerSelection: Game over - no more hearts");
      setShowAnswer(false);
      setTimeout(() => {
        setStageCompleted(true);
      }, 700); // Short delay to show last answer
      return;
    }

    // Only complete stage if this is truly the last question
    if (isLastInStage || isLastOverall) {
      console.log("🏁 useAnswerSelection: Completing stage - last question reached");
      setStageCompleted(true);
    }
  }, [selected, setSelected, setShowAnswer, getElapsed, optionOrder, addStars, setRoundCorrect, setScore, updateStageScores, stage, setFeedback, phrase, markPhraseAsLearned, markPhraseAsPlayed, profile, loseHeart, updateOpponentScores, opponentName, current, currentStageStart, phrases.length, setStageCompleted]);

  return { handleSelect };
}
