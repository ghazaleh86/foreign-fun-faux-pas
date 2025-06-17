
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAudioPlayback } from "@/hooks/useAudioPlayback";
import { useStageTimer } from "@/hooks/useStageTimer";
import { useLearnedPhrases } from "@/hooks/useLearnedPhrases";
import StageSummary from "./StageSummary";
import GameSummary from "./GameSummary";
import StagePreview from "./StagePreview";
import QuizCard from "./QuizCard";
import { getPlayedPhraseIds, setPlayedPhraseIds } from "@/utils/playedPhraseIds";
import GameStatusHeader from "./GameStatusHeader";
import { usePlayerProfile } from "@/hooks/usePlayerProfile";
import { Phrase, State, QuizProps } from "@/types/quiz";
import { 
  STAGE_SIZE, 
  ROUND_SIZE, 
  getShuffledOptions, 
  computeSpeedBonus, 
  getSpeedBonusXP, 
  getCurrentVoice, 
  randomWrongTaunt 
} from "@/utils/quizHelpers";
import { Option } from "./MultipleChoiceOptions";

const PhraseQuiz: React.FC<QuizProps> = ({ opponentName, opponentEmoji }) => {
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

  // Learned phrases hook
  const { markPhraseAsLearned } = useLearnedPhrases();

  // Timer via custom hook
  const { timer, getElapsed, reset: resetTimer } = useStageTimer(
    !showAnswer && state === "quiz" && !showStagePreview && !stageCompleted
  );

  const phrase = phrases[current];

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
      
      // Mark phrase as learned when answered correctly
      if (phrase) {
        markPhraseAsLearned(phrase.id);
      }
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

  function handlePlayAudio() {
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

  // Determine if we should show GameStatusHeader (only during transition screens)
  const shouldShowGameStatusHeader = state === "loading" || 
                                   state === "finished" || 
                                   stageCompleted || 
                                   showStagePreview ||
                                   phrases.length === 0;

  // Main layout: consistent container for all game states
  return (
    <div className="w-full flex justify-center items-start min-h-[80vh] pt-6">
      <div className="w-full max-w-xl flex flex-col gap-4">
        {shouldShowGameStatusHeader && (
          <GameStatusHeader
            hearts={profile?.hearts ?? 3}
            maxHearts={profile?.max_hearts ?? 3}
            xp={profile?.xp ?? 0}
            currentStreak={profile?.current_streak ?? 0}
          />
        )}
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
              profile={profile}
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
              profile={profile}
            />
          )}

          {/* Main quiz UI per stage */}
          {state === "quiz" &&
            !stageCompleted &&
            !showStagePreview &&
            phrases.length > 0 &&
            current < phrases.length && (
              <QuizCard
                phrase={phrase}
                stage={stage}
                totalStages={totalStages}
                current={current}
                stageSize={STAGE_SIZE}
                phrasesLength={phrases.length}
                opponentEmoji={opponentEmoji}
                timer={timer}
                stageScore={stageScores[stage] || 0}
                maxStageScore={(Math.min(STAGE_SIZE, phrases.length - (stage * STAGE_SIZE))) * 3}
                optionOrder={optionOrder}
                selected={selected}
                showAnswer={showAnswer}
                feedback={feedback}
                showNextButton={showAnswer && (current - currentStageStart + 1) < Math.min(STAGE_SIZE, phrases.length - currentStageStart)}
                onSelect={handleSelect}
                onNext={handleNext}
                onPlayAudio={handlePlayAudio}
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default PhraseQuiz;
