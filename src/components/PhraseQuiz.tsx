import React, { useEffect, useState } from "react";
import {
  Card, CardHeader, CardTitle, CardContent, CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useAudioPlayback } from "@/hooks/useAudioPlayback";
import { useStageTimer } from "@/hooks/useStageTimer";
import StageSummary from "./StageSummary";
import GameSummary from "./GameSummary";
import StagePreview from "./StagePreview";
import MultipleChoiceOptions, { Option } from "./MultipleChoiceOptions";
import { getPlayedPhraseIds, setPlayedPhraseIds } from "@/utils/playedPhraseIds";
import { languageToFlag } from "@/utils/languageToFlag";

type Phrase = {
  id: string;
  phrase_text: string;
  language: string;
  pronunciation: string | null;
  correct_meaning: string;
  incorrect1: string;
  incorrect2: string;
  notes: string | null;
};

type State = "loading" | "quiz" | "finished";

const STAGE_SIZE = 10;

const ELEVENLABS_VOICES = [
  { name: "Aria", id: "9BWtsMINqrJLrRacOk9x" },
  { name: "Roger", id: "CwhRBWXzGAHq8TQ4Fs17" },
  { name: "Sarah", id: "EXAVITQu4vr4xnSDxMaL" },
  { name: "Laura", id: "FGY2WhTYpPnrIDTdsKH5" },
  { name: "Charlie", id: "IKne3meq5aSn9XLyUdCD" },
  { name: "George", id: "JBFqnCBsd6RMkjVDRZzb" },
  { name: "Callum", id: "N2lVS1w4EtoT3dr4eOWO" },
  { name: "Liam", id: "TX3LPaxmHKxFdv7VOQHJ" }
];

const getShuffledOptions = (phrase: Phrase): Option[] => {
  const options: Option[] = [
    { label: phrase.correct_meaning, isCorrect: true },
    { label: phrase.incorrect1, isCorrect: false },
    { label: phrase.incorrect2, isCorrect: false },
  ];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
};

type PhraseQuizProps = {
  opponentName: string;
  opponentEmoji: string;
};

const PhraseQuiz: React.FC<PhraseQuizProps> = ({ opponentName, opponentEmoji }) => {
  // Quiz/load state and data
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [state, setState] = useState<State>("loading");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [optionOrder, setOptionOrder] = useState<Option[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Stage/progress logic
  const [stage, setStage] = useState(0);
  const [stageScores, setStageScores] = useState<number[]>([]);
  const [stageCompleted, setStageCompleted] = useState(false);
  const [opponentScores, setOpponentScores] = useState<number[]>([]);
  const [showStagePreview, setShowStagePreview] = useState(true);

  // Timer via custom hook
  const { timer, getElapsed, reset: resetTimer } = useStageTimer(
    !showAnswer && state === "quiz" && !showStagePreview && !stageCompleted
  );

  const phrase = phrases[current];

  // Voice logic
  const getCurrentVoice = (idx: number) => ELEVENLABS_VOICES[idx % ELEVENLABS_VOICES.length].id;

  // Audio auto-play with duplicate guard
  useAudioPlayback(
    [current, state, showStagePreview, showAnswer, stageCompleted],
    phrase ? (phrase.pronunciation || phrase.phrase_text) : "",
    phrase?.language || "en",
    getCurrentVoice(current),
    !!(phrase && state === "quiz" && !showAnswer && !showStagePreview && !stageCompleted)
  );

  // Fetch phrases on mount
  useEffect(() => {
    const fetchPhrases = async () => {
      setState("loading");
      let playedIds: string[] = [];
      try {
        playedIds = getPlayedPhraseIds();
      } catch { playedIds = []; }
      const { data, error } = await supabase
        .from("phrases")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (!data || error) {
        setPhrases([]);
        setState("quiz");
        setFeedback("Error fetching phrases. Please try again.");
      } else {
        const unseen = data.filter((p: Phrase) => !playedIds.includes(p.id));
        setPhrases(unseen as Phrase[]);
        setState("quiz");
      }
    };
    fetchPhrases();
  }, []);

  // Staging logic
  const totalStages = Math.ceil(phrases.length / STAGE_SIZE);
  const currentStageStart = stage * STAGE_SIZE;
  const currentStageEnd = Math.min(currentStageStart + STAGE_SIZE, phrases.length);

  // Map current index to stage
  useEffect(() => {
    const nextStageIdx = Math.floor(current / STAGE_SIZE);
    if (nextStageIdx !== stage) setStage(nextStageIdx);
    if ((current % STAGE_SIZE === 0 && current !== 0) && state === "quiz") {
      setStageCompleted(true);
    }
  }, [current]);

  useEffect(() => {
    setStageCompleted(false);
  }, [stage]);

  // Option order (shuffling) per step
  useEffect(() => {
    if (phrases.length > 0 && state === "quiz") {
      setOptionOrder(getShuffledOptions(phrases[current]));
      setSelected(null);
      setShowAnswer(false);
      setFeedback(null);
      resetTimer();
    }
    // eslint-disable-next-line
  }, [phrases, current, state]);

  function computeSpeedBonus(secondsElapsed: number): number {
    if (secondsElapsed < 3) return 3;
    if (secondsElapsed < 7) return 2;
    return 1;
  }

  function updateStageScores(idx: number, pts: number) {
    setStageScores((arr) => {
      const next = [...arr];
      next[idx] = (next[idx] || 0) + pts;
      return next;
    });
  }
  function updateOpponentScores(idx: number, pts: number) {
    setOpponentScores((arr) => {
      const next = [...arr];
      next[idx] = (next[idx] || 0) + pts;
      return next;
    });
  }

  function handleSelect(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    setShowAnswer(true);

    let timeTaken = getElapsed();

    if (optionOrder[idx].isCorrect) {
      const bonus = computeSpeedBonus(timeTaken);
      setScore((s) => s + bonus);
      updateStageScores(stage, bonus);
      setFeedback(`🎉 Correct! (+${bonus}pt${bonus > 1 ? "s" : ""}) Time: ${timeTaken}s`);
    } else {
      const opponentGotIt = Math.random() < 0.7 ? 1 : 0;
      updateOpponentScores(stage, opponentGotIt);
      setFeedback("❌ Wrong! " + randomWrongTaunt(opponentName));
    }
  }

  function handleNext() {
    const nextIdx = current + 1;
    // Instead of marking stageCompleted here, we just step to next question.
    setCurrent(nextIdx);
    // If the next question crosses the stage, we set completed in useEffect below.
  }

  function handleAdvanceStage() {
    setShowStagePreview(true);
    setStage((s) => s + 1);
    setStageCompleted(false);
    setSelected(null);
    setShowAnswer(false);
    setFeedback(null);
    // current will be set by useEffect after stage changes.
  }

  function randomWrongTaunt(name: string) {
    const taunts = [
      `Better luck next time!`,
      `Oof! ${name} is still in the game!`,
      `Still one step behind ${name}!`,
      `Maybe try a random guess?`,
      `You can do it! Just not on this question.`,
      ];
    return taunts[Math.floor(Math.random() * taunts.length)];
  }

  // Store played phrase IDs at finish
  useEffect(() => {
    if (state !== "finished") return;
    if (phrases.length > 0 && phrases[0]?.id) {
      const playedIds = getPlayedPhraseIds();
      const currentIds = phrases.map(p => p.id);
      const merged = Array.from(new Set([...playedIds, ...currentIds]));
      setPlayedPhraseIds(merged);
    }
  // eslint-disable-next-line
  }, [state]);

  // -- Updated effect for stage progression
  useEffect(() => {
    // If the current question is at the end of a stage, trigger stage completion
    if (
      state === "quiz" &&
      !stageCompleted &&
      (current > 0) &&
      (current % STAGE_SIZE === 0 || current >= phrases.length)
    ) {
      setStageCompleted(true);
    } else if (
      state === "quiz" &&
      stageCompleted &&
      (current % STAGE_SIZE !== 0 && current < phrases.length)
    ) {
      // If user advanced to a new question in the next stage, exit stageCompleted
      setStageCompleted(false);
    }
    // eslint-disable-next-line
  }, [current, state, stage, phrases.length]);

  // -- Show StageSummary when stageCompleted and not finished
  if (stageCompleted && state === "quiz" && current <= phrases.length) {
    // Stage score: previous stage if just completed, else last available.
    const thisStage = stage;
    return (
      <StageSummary
        stage={thisStage}
        stageScore={stageScores[thisStage] || 0}
        opponentName={opponentName}
        opponentEmoji={opponentEmoji}
        opponentScore={opponentScores[thisStage] || 0}
        onAdvanceStage={handleAdvanceStage}
      />
    );
  }

  if (state === "loading") {
    return (
      <div className="flex flex-col items-center">
        <div className="animate-pulse h-8 w-40 bg-muted rounded mb-6" />
        <div className="animate-pulse h-16 w-80 bg-muted rounded" />
      </div>
    );
  }

  if (state === "quiz" && phrases.length === 0) {
    return (
      <Card className="max-w-xl w-full">
        <CardContent className="p-6">
          <div className="text-center my-10 text-pink-700 font-bold">
            <p className="mb-2">
              You have played all available phrases!
              <br />
              To repeat, please clear your browser data (localStorage).
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const percent = phrases.length ? Math.round((score / phrases.length) * 100) : 0;

  if (state === "finished") {
    return (
      <GameSummary
        score={score}
        total={phrases.length}
        percent={percent}
        totalStages={totalStages}
        stageScores={stageScores}
        opponentScores={opponentScores}
        opponentName={opponentName}
        opponentEmoji={opponentEmoji}
        onPlayAgain={() => window.location.reload()}
      />
    );
  }

  if (stageCompleted && state === "quiz" && current < phrases.length) {
    return (
      <StageSummary
        stage={stage}
        stageScore={stageScores[stage] || 0}
        opponentName={opponentName}
        opponentEmoji={opponentEmoji}
        opponentScore={opponentScores[stage] || 0}
        onAdvanceStage={handleAdvanceStage}
      />
    );
  }

  if (showStagePreview && state === "quiz" && current < phrases.length) {
    const prevStageIdx = stage - 1;
    return (
      <StagePreview
        stage={stage}
        stageScore={stageScores[prevStageIdx] ?? 0}
        opponentName={opponentName}
        opponentEmoji={opponentEmoji}
        opponentScore={opponentScores[prevStageIdx] ?? 0}
        onStartStage={handleStartStage}
      />
    );
  }

  // Main quiz UI per stage
  return (
    <Card className="max-w-xl w-full shadow-2xl bg-white/90 border-2 border-pink-200/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gradient bg-gradient-to-r from-pink-500 via-fuchsia-500 to-yellow-400 bg-clip-text text-transparent text-2xl font-bold">
          <span className="text-2xl">{opponentEmoji}</span>
          Stage {stage + 1} of {totalStages} – Phrase {current - (stage * STAGE_SIZE) + 1} of {Math.min(STAGE_SIZE, phrases.length - (stage * STAGE_SIZE))}
          <span className="ml-2 text-base font-normal text-muted-foreground"></span>
        </CardTitle>
        {/* Audio controls */}
        {phrase &&
          <div className="flex flex-col items-center justify-center mt-1">
            <div className="flex gap-1 mb-2 scale-90">
              <div className="h-2 w-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:0.1s]" />
              <div className="h-3 w-2 rounded-full bg-pink-400 animate-bounce [animation-delay:0.2s]" />
              <div className="h-4 w-2 rounded-full bg-fuchsia-400 animate-bounce [animation-delay:0.3s]" />
            </div>
            <div className="text-lg font-semibold tracking-wide mb-0 flex items-center gap-2">
              <span>
                {phrase.pronunciation ? <span className="italic">{phrase.pronunciation}</span> : phrase.phrase_text}
              </span>
              <span className="text-2xl" title={phrase.language}>
                {languageToFlag(phrase.language)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Language: <span className="font-bold">{phrase.language}</span>
            </div>
            <Button
              className="mt-2 px-5"
              variant="secondary"
              size="sm"
              onClick={() => {
                const ttsText = phrase.pronunciation || phrase.phrase_text;
                import("@/lib/elevenlabsTtsClient").then(({ playWithElevenLabsTTS }) =>
                  playWithElevenLabsTTS({ text: ttsText, voiceId: "9BWtsMINqrJLrRacOk9x" }).catch(() => {
                    if ("speechSynthesis" in window) {
                      window.speechSynthesis.cancel();
                      const u = new window.SpeechSynthesisUtterance(ttsText);
                      u.lang = phrase.language || "en";
                      u.rate = 0.98;
                      window.speechSynthesis.speak(u);
                    }
                  })
                );
              }}
            >
              🔈 Play Again
            </Button>
          </div>
        }
      </CardHeader>
      <CardContent>
        <div className="mb-3 w-full h-3 bg-pink-100 rounded-lg overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-pink-300 transition-all"
            style={{
              width:
                (
                  ((stageScores[stage] || 0) /
                    ((Math.min(STAGE_SIZE, phrases.length - (stage * STAGE_SIZE))) * 3)) *
                  100
                ).toFixed(1) + "%"
            }}
          />
        </div>
        <div className="mb-2 text-sm font-bold text-fuchsia-700">
          Time: {timer}s
        </div>
        <MultipleChoiceOptions
          options={optionOrder}
          selected={selected}
          showAnswer={showAnswer}
          onSelect={handleSelect}
        />
        {feedback && (
          <div
            className={cn(
              "text-center mt-5 text-lg font-semibold transition-all",
              selected !== null && optionOrder[selected].isCorrect
                ? "text-green-700 animate-pop"
                : "text-pink-700 animate-shake-fast"
            )}
          >
            {feedback}
          </div>
        )}
        {showAnswer && phrase?.notes && (
          <div className="text-xs text-muted-foreground mt-2 text-center">
            <span className="inline-block rounded-full px-3 py-1 bg-yellow-100/60 font-mono">{phrase.notes}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div>
          Stage {stage + 1} Score:{" "}
          <span className="font-bold">{stageScores[stage] || 0}</span>
        </div>
        {showAnswer && (
          <Button
            onClick={handleNext}
            variant="default"
            className="animate-bounce"
            disabled={
              (current + 1) >= phrases.length
            }
          >
            {current + 1 < currentStageEnd ? "Next" : "Finish Stage"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PhraseQuiz;
