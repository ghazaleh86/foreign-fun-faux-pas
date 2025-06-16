
import React, { useState, useEffect } from "react";
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
import GameStatusHeader from "./GameStatusHeader";
import { usePlayerProfile } from "@/hooks/usePlayerProfile";
import { Volume2 } from "lucide-react";

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
const ROUND_SIZE = 5;

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

// --- ADDED HELPERS ---
function computeSpeedBonus(timeTaken: number): number {
  if (timeTaken <= 4) return 3;
  if (timeTaken <= 8) return 2;
  return 1;
}

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

  // Add state to control if user can proceed after review:
  const [advanceRequested, setAdvanceRequested] = useState(false);

  // --- Player Progress (hearts, xp, streaks) ---
  const {
    profile,
    loading: profileLoading,
    addXP,
    loseHeart,
    resetHearts,
    advanceStreak,
    refresh: refreshProfile,
  } = usePlayerProfile();

  // Set up per-round state
  const [roundQuestions, setRoundQuestions] = useState<Phrase[]>([]);
  const [roundCorrect, setRoundCorrect] = useState(0);

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

  // Helper functions need to be INSIDE the component to access state hooks
  function updateStageScores(stageIdx: number, value: number) {
    setStageScores((prev) => {
      const next = [...prev];
      next[stageIdx] = (next[stageIdx] ?? 0) + value;
      return next;
    });
  }

  function updateOpponentScores(stageIdx: number, value: number) {
    setOpponentScores((prev) => {
      const next = [...prev];
      next[stageIdx] = (next[stageIdx] ?? 0) + value;
      return next;
    });
  }

  // Prepare a new round (5 unplayed questions)
  useEffect(() => {
    if (phrases.length === 0) return;
    // Pick next ROUND_SIZE questions not played yet in this session
    const roundStart = current;
    setRoundQuestions(phrases.slice(roundStart, roundStart + ROUND_SIZE));
    setRoundCorrect(0);
    if (profile) resetHearts(); // refill on new round
  }, [current, phrases, profile]);

  // Fetch phrases on mount with rotation logic
  useEffect(() => {
    const fetchPhrases = async () => {
      setState("loading");
      let playedIds: string[] = [];
      try {
        playedIds = getPlayedPhraseIds();
      } catch { 
        playedIds = []; 
      }

      const { data, error } = await supabase
        .from("phrases")
        .select("*")
        .order("created_at", { ascending: false });

      if (!data || error) {
        setPhrases([]);
        setState("quiz");
        setFeedback("Error fetching phrases. Please try again.");
      } else {
        // Filter out phrases that have been played before
        const unplayedPhrases = data.filter((p: Phrase) => !playedIds.includes(p.id));
        
        if (unplayedPhrases.length === 0) {
          // All phrases have been played - clear the played list and start fresh
          setPlayedPhraseIds([]);
          setPhrases(data as Phrase[]);
          console.log("All phrases played! Starting fresh with full database.");
        } else {
          setPhrases(unplayedPhrases as Phrase[]);
          console.log(`Found ${unplayedPhrases.length} unplayed phrases out of ${data.length} total.`);
        }
        setState("quiz");
      }
    };
    fetchPhrases();
  }, []);

  // Staging logic
  const totalStages = Math.ceil(phrases.length / STAGE_SIZE);
  const currentStageStart = stage * STAGE_SIZE;
  const currentStageEnd = Math.min(currentStageStart + STAGE_SIZE, phrases.length);

  // Shuffle options and reset timer only when phrase changes
  useEffect(() => {
    if (phrase) {
      setOptionOrder(getShuffledOptions(phrase));
      resetTimer(); // Only reset timer when showing a new phrase
    }
  }, [phrase]); // <--- Only depend on phrase

  // Compute bonus XP
  function getSpeedBonusXP(timeTaken: number) {
    if (timeTaken <= 4) return 5;
    if (timeTaken <= 8) return 2;
    return 0;
  }

  function handleSelect(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    setShowAnswer(true);

    let timeTaken = getElapsed();

    if (optionOrder[idx].isCorrect) {
      // +10 XP, plus speed bonus
      const bonusXP = getSpeedBonusXP(timeTaken);
      addXP(10 + bonusXP);
      setRoundCorrect((c) => c + 1);
      const bonus = computeSpeedBonus(timeTaken);
      setScore((s) => s + bonus);
      updateStageScores(stage, bonus);
      setFeedback(`🎉 Correct! (+10 XP${bonusXP ? ` +${bonusXP} bonus` : ""}) Time: ${timeTaken}s`);
    } else {
      loseHeart();
      const opponentGotIt = Math.random() < 0.7 ? 1 : 0;
      updateOpponentScores(stage, opponentGotIt);
      setFeedback("❌ Wrong! " + randomWrongTaunt(opponentName));
    }

    // Mark this phrase as played immediately
    if (phrase) {
      const playedIds = getPlayedPhraseIds();
      const updatedPlayedIds = Array.from(new Set([...playedIds, phrase.id]));
      setPlayedPhraseIds(updatedPlayedIds);
    }

    // If game over (no more hearts), auto end round
    if (profile && profile.hearts === 1 && !optionOrder[idx].isCorrect) {
      setShowAnswer(false);
      setTimeout(() => {
        setStageCompleted(true);
      }, 700); // Short delay to show last answer
      return;
    }

    // Detect if this was the last question in the stage
    const isLastInStage =
      (current - currentStageStart + 1) === Math.min(STAGE_SIZE, phrases.length - currentStageStart);

    if (isLastInStage || current === phrases.length - 1) {
      setStageCompleted(true);
      setAdvanceRequested(false);
    }
  }

  function handleNext() {
    // Only allow next question if not at end of stage
    const isLastInStage =
      (current - currentStageStart + 1) === Math.min(STAGE_SIZE, phrases.length - currentStageStart);

    if (!isLastInStage && current < phrases.length - 1) {
      setCurrent((c) => c + 1);
      // Reset state for fresh step
      setSelected(null);
      setShowAnswer(false);
      setFeedback(null);
    }
  }

  function handleAdvanceStage() {
    // Assess if user passed (3+ correct)
    if (roundCorrect >= 3) {
      advanceStreak();
      setShowStagePreview(true);
      setStage((s) => s + 1);
      setStageCompleted(false);
      setCurrent((stage + 1) * ROUND_SIZE);
      setSelected(null);
      setShowAnswer(false);
      setFeedback(null);
      refreshProfile();
    } else {
      // Did not pass: refill hearts, restart round, reset corrects (using same questions)
      resetHearts();
      setStageCompleted(false);
      setSelected(null);
      setShowAnswer(false);
      setFeedback("You need at least 3 correct to pass. Try again!");
      setCurrent(stage * ROUND_SIZE);
      setRoundCorrect(0);
      refreshProfile();
    }
  }

  function handleStartStage() {
    // Called when user presses "Start Stage"
    setShowStagePreview(false);
    setAdvanceRequested(false);
    setSelected(null);
    setShowAnswer(false);
    setFeedback(null);
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

  // Calculate percentage for GameSummary
  const percent = phrases.length > 0 ? Math.round((score / phrases.length) * 100) : 0;

  // Reset state when moving to a new stage (preview)
  useEffect(() => {
    if (showStagePreview) {
      setSelected(null);
      setShowAnswer(false);
      setFeedback(null);
    }
  }, [showStagePreview]);

  // Main layout: consistent container for all game states
  return (
    <div className="w-full flex justify-center items-start min-h-[80vh] pt-6">
      <div className="w-full max-w-xl flex flex-col gap-4">
        <GameStatusHeader
          hearts={profile?.hearts ?? 3}
          maxHearts={profile?.max_hearts ?? 3}
          xp={profile?.xp ?? 0}
          currentStreak={profile?.current_streak ?? 0}
        />
        <div className="flex-1 w-full flex flex-col items-center justify-center">
          {/* Loading State */}
          {state === "loading" && (
            <div className="flex flex-col items-center w-full">
              <div className="animate-pulse h-8 w-40 bg-muted rounded mb-6" />
              <div className="animate-pulse h-16 w-80 bg-muted rounded" />
            </div>
          )}

          {/* All phrases played state */}
          {state === "quiz" && phrases.length === 0 && (
            <Card className="max-w-xl w-full">
              <CardContent className="p-6">
                <div className="text-center my-10 text-pink-700 font-bold">
                  <p className="mb-2">
                    You have played all available phrases!
                    <br />
                    The rotation system will automatically reset and show you phrases again.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stage Summary */}
          {stageCompleted && state === "quiz" && (
            <StageSummary
              stage={stage}
              stageScore={stageScores[stage] || 0}
              opponentName={opponentName}
              opponentEmoji={opponentEmoji}
              opponentScore={opponentScores[stage] || 0}
              onAdvanceStage={handleAdvanceStage}
            />
          )}

          {/* Game summary on finish */}
          {state === "finished" && (
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
          )}

          {/* Stage preview */}
          {showStagePreview && state === "quiz" && current < phrases.length && (
            <StagePreview
              stage={stage}
              stageScore={stageScores[stage - 1] ?? 0}
              opponentName={opponentName}
              opponentEmoji={opponentEmoji}
              opponentScore={opponentScores[stage - 1] ?? 0}
              onStartStage={handleStartStage}
            />
          )}

          {/* Main quiz UI per stage */}
          {state === "quiz" &&
            !stageCompleted &&
            !showStagePreview &&
            phrases.length > 0 &&
            current < phrases.length && (
              <Card className="max-w-xl w-full shadow-2xl bg-white/90 border-2 border-pink-200/40">
                <CardHeader>
                  <CardTitle className="flex flex-col items-center justify-center gap-2 text-gradient bg-gradient-to-r from-pink-500 via-fuchsia-500 to-yellow-400 bg-clip-text text-transparent text-2xl font-bold text-center">
                    <div className="flex items-center justify-center gap-2 w-full">
                      <span className="text-2xl">{opponentEmoji}</span>
                      <span>
                        Stage {stage + 1} of {totalStages} – Phrase {current - (stage * STAGE_SIZE) + 1} of {Math.min(STAGE_SIZE, phrases.length - (stage * STAGE_SIZE))}
                      </span>
                    </div>
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
                        className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                        size="lg"
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
                        <Volume2 className="w-5 h-5 mr-2" />
                        Play Audio
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
                  {/* Only show Next button if not the last in stage */}
                  {showAnswer &&
                    (current - currentStageStart + 1) < Math.min(STAGE_SIZE, phrases.length - currentStageStart) && (
                      <Button
                        onClick={handleNext}
                        variant="default"
                        className="animate-bounce"
                      >
                        Next
                      </Button>
                    )
                  }
                </CardFooter>
              </Card>
            )}
        </div>
      </div>
    </div>
  );
};

export default PhraseQuiz;
