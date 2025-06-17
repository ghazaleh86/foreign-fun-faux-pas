
import React, { useState, useEffect } from "react";
import { useAudioPlayback } from "@/hooks/useAudioPlayback";
import { useStageTimer } from "@/hooks/useStageTimer";
import { useLearnedPhrases } from "@/hooks/useLearnedPhrases";
import { usePlayerProfile } from "@/hooks/usePlayerProfile";
import { useQuizState } from "@/hooks/useQuizState";
import { useStageManagement } from "@/hooks/useStageManagement";
import GameStatusHeader from "./GameStatusHeader";
import GameStateRenderer from "./GameStateRenderer";
import { QuizProps } from "@/types/quiz";
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
  const [optionOrder, setOptionOrder] = useState<Option[]>([]);
  const [advanceRequested, setAdvanceRequested] = useState(false);

  // Custom hooks
  const {
    phrases,
    state,
    setState,
    current,
    setCurrent,
    score,
    setScore,
    selected,
    setSelected,
    showAnswer,
    setShowAnswer,
    feedback,
    setFeedback,
    markPhraseAsPlayed,
    resetQuestionState,
  } = useQuizState();

  const {
    profile,
    loading: profileLoading,
    addXP,
    loseHeart,
    resetHearts,
    advanceStreak,
    refresh: refreshProfile,
  } = usePlayerProfile();

  const {
    stage,
    setStage,
    stageScores,
    stageCompleted,
    setStageCompleted,
    opponentScores,
    showStagePreview,
    setShowStagePreview,
    roundQuestions,
    roundCorrect,
    setRoundCorrect,
    totalStages,
    currentStageStart,
    currentStageEnd,
    updateStageScores,
    updateOpponentScores,
  } = useStageManagement(phrases, profile);

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

  // Shuffle options and reset timer only when phrase changes
  useEffect(() => {
    if (phrase) {
      setOptionOrder(getShuffledOptions(phrase));
      resetTimer(); // Only reset timer when showing a new phrase
    }
  }, [phrase]);

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
      markPhraseAsPlayed(phrase.id);
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
      resetQuestionState();
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
      resetQuestionState();
      refreshProfile();
    } else {
      // Did not pass: refill hearts, restart round, reset corrects (using same questions)
      resetHearts();
      setStageCompleted(false);
      resetQuestionState();
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
    resetQuestionState();
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

  // Reset state when moving to a new stage (preview)
  useEffect(() => {
    if (showStagePreview) {
      resetQuestionState();
    }
  }, [showStagePreview]);

  // Determine if we should show GameStatusHeader (only during transition screens)
  const shouldShowGameStatusHeader = state === "loading" || 
                                   state === "finished" || 
                                   stageCompleted || 
                                   showStagePreview ||
                                   phrases.length === 0;

  const maxStageScore = (Math.min(STAGE_SIZE, phrases.length - (stage * STAGE_SIZE))) * 3;
  const showNextButton = showAnswer && (current - currentStageStart + 1) < Math.min(STAGE_SIZE, phrases.length - currentStageStart);

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
          <GameStateRenderer
            state={state}
            phrases={phrases}
            stageCompleted={stageCompleted}
            showStagePreview={showStagePreview}
            current={current}
            stage={stage}
            stageScores={stageScores}
            opponentScores={opponentScores}
            opponentName={opponentName}
            opponentEmoji={opponentEmoji}
            onAdvanceStage={handleAdvanceStage}
            onStartStage={handleStartStage}
            profile={profile}
            score={score}
            totalStages={totalStages}
            onPlayAgain={() => window.location.reload()}
            phrase={phrase}
            timer={timer}
            stageSize={STAGE_SIZE}
            maxStageScore={maxStageScore}
            optionOrder={optionOrder}
            selected={selected}
            showAnswer={showAnswer}
            feedback={feedback}
            showNextButton={showNextButton}
            onSelect={handleSelect}
            onNext={handleNext}
            onPlayAudio={handlePlayAudio}
            currentStageStart={currentStageStart}
          />
        </div>
      </div>
    </div>
  );
};

export default PhraseQuiz;
