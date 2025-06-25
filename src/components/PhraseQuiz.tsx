
import React, { useState, useEffect } from "react";
import { useAudioPlayback } from "@/hooks/useAudioPlayback";
import { useStageTimer } from "@/hooks/useStageTimer";
import { useLearnedPhrases } from "@/hooks/useLearnedPhrases";
import { usePlayerProfile } from "@/hooks/usePlayerProfile";
import { useQuizState } from "@/hooks/useQuizState";
import { useStageManagement } from "@/hooks/useStageManagement";
import GameStateRenderer from "./GameStateRenderer";
import { QuizProps } from "@/types/quiz";
import { 
  STAGE_SIZE, 
  ROUND_SIZE, 
  getShuffledOptions, 
  computeSpeedBonus, 
  getSpeedBonusXP, 
  getCurrentVoice, 
  randomWrongTaunt, 
  getVoiceSettings
} from "@/utils/quizHelpers";
import { Option } from "./MultipleChoiceOptions";
import { saveGameState, getGameState, clearGameState } from "@/utils/gameStateManager";

const PhraseQuiz: React.FC<QuizProps> = ({ opponentName, opponentEmoji }) => {
  const [optionOrder, setOptionOrder] = useState<Option[]>([]);
  const [advanceRequested, setAdvanceRequested] = useState(false);
  const [sessionId] = useState(() => Date.now().toString());

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

  // Restore game state on component mount
  useEffect(() => {
    const savedState = getGameState();
    if (savedState && savedState.sessionId !== sessionId && phrases.length > 0) {
      // Only restore if it's a different session and we have phrases loaded
      setCurrent(savedState.current);
      setScore(savedState.score);
      setStage(savedState.stage);
      setRoundCorrect(savedState.roundCorrect);
      setStageCompleted(savedState.stageCompleted);
      // Skip showing stage preview - go straight to quiz
      setShowStagePreview(false);
      console.log("Game state restored:", savedState);
    }
  }, [phrases.length, sessionId]);

  // Save game state whenever key values change
  useEffect(() => {
    if (phrases.length > 0 && state === "quiz") {
      const gameState = {
        phrases,
        current,
        score,
        stage,
        stageScores,
        opponentScores,
        roundCorrect,
        stageCompleted,
        showStagePreview,
        sessionId
      };
      saveGameState(gameState);
    }
  }, [phrases, current, score, stage, stageScores, opponentScores, roundCorrect, stageCompleted, showStagePreview, sessionId, state]);

  // Audio auto-play with duplicate guard
  useAudioPlaybook(
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
      // Skip stage preview, go directly to next stage
      setShowStagePreview(false);
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
    const voiceSettings = getVoiceSettings(getCurrentVoice(current));
    
    import("@/lib/elevenlabsTtsClient").then(({ playWithElevenLabsTTS }) =>
      playWithElevenLabsTTS({ 
        text: ttsText, 
        voiceId: getCurrentVoice(current),
        ...voiceSettings,
        useSpeakerBoost: true
      }).catch(() => {
        // Enhanced fallback
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel();
          const u = new window.SpeechSynthesisUtterance(ttsText);
          u.lang = phrase.language || "en";
          u.rate = 0.9; // Slightly slower
          u.pitch = 1.0; // Natural pitch
          u.volume = 0.9;
          
          // Try to use a more natural voice
          const voices = window.speechSynthesis.getVoices();
          const naturalVoices = voices.filter(voice => 
            voice.lang.startsWith(phrase.language || "en") && 
            (voice.name.includes('Neural') || voice.name.includes('Premium'))
          );
          
          if (naturalVoices.length > 0) {
            u.voice = naturalVoices[0];
          }
          
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

  // Clear game state when quiz is finished
  useEffect(() => {
    if (state === "finished") {
      clearGameState();
    }
  }, [state]);

  const maxStageScore = (Math.min(STAGE_SIZE, phrases.length - (stage * STAGE_SIZE))) * 3;
  const showNextButton = showAnswer && (current - currentStageStart + 1) < Math.min(STAGE_SIZE, phrases.length - currentStageStart);

  // Main layout: consistent container for all game states
  return (
    <div className="w-full flex justify-center items-start min-h-[80vh] pt-6">
      <div className="w-full max-w-xl flex flex-col gap-4">
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
            onPlayAgain={() => {
              clearGameState();
              window.location.reload();
            }}
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
