
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useAudioPlayback } from "@/hooks/useAudioPlayback";
import { useStageTimer } from "@/hooks/useStageTimer";
import { useLearnedPhrases } from "@/hooks/useLearnedPhrases";
import { usePlayerProfile } from "@/hooks/usePlayerProfile";
import { useStageManagement } from "@/hooks/useStageManagement";
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
import { Phrase, State } from "@/types/quiz";

interface QuizLogicProps {
  phrases: Phrase[];
  current: number;
  setCurrent: (value: number | ((prev: number) => number)) => void;
  score: number;
  setScore: (value: number | ((prev: number) => number)) => void;
  selected: number | null;
  setSelected: (value: number | null) => void;
  showAnswer: boolean;
  setShowAnswer: (value: boolean) => void;
  feedback: string | null;
  setFeedback: (value: string | null) => void;
  state: State;
  markPhraseAsPlayed: (phraseId: string) => void;
  resetQuestionState: () => void;
  stage: number;
  stageCompleted: boolean;
  setStageCompleted: (value: boolean) => void;
  showStagePreview: boolean;
  opponentName: string;
  children: (props: {
    phrase: Phrase;
    optionOrder: Option[];
    timer: number;
    onSelect: (idx: number) => void;
    onNext: () => void;
    onPlayAudio: () => void;
    onAdvanceStage: () => void;
    onStartStage: () => void;
    showNextButton: boolean;
    profile: any;
    stageScores: number[];
    opponentScores: number[];
    totalStages: number;
    currentStageStart: number;
    roundCorrect: number;
    setRoundCorrect: (value: number | ((prev: number) => number)) => void;
  }) => React.ReactNode;
}

const QuizLogic: React.FC<QuizLogicProps> = ({
  phrases,
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
  state,
  markPhraseAsPlayed,
  resetQuestionState,
  stage,
  stageCompleted,
  setStageCompleted,
  showStagePreview,
  opponentName,
  children,
}) => {
  const [optionOrder, setOptionOrder] = useState<Option[]>([]);
  const [advanceRequested, setAdvanceRequested] = useState(false);

  // Memoize the current phrase to prevent unnecessary re-renders
  const phrase = useMemo(() => phrases[current], [phrases, current]);

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
    stage: stageFromHook,
    setStage,
    stageScores,
    stageCompleted: stageCompletedFromHook,
    opponentScores,
    showStagePreview: showStagePreviewFromHook,
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

  // Timer via custom hook - memoize the timer condition to prevent re-renders
  const timerShouldRun = useMemo(() => 
    !showAnswer && state === "quiz" && !showStagePreview && !stageCompleted,
    [showAnswer, state, showStagePreview, stageCompleted]
  );

  const { timer, getElapsed, reset: resetTimer } = useStageTimer(timerShouldRun);

  // Memoize audio playback dependencies to prevent re-renders
  const audioPlaybackDeps = useMemo(() => 
    [current, state, showStagePreview, showAnswer, stageCompleted],
    [current, state, showStagePreview, showAnswer, stageCompleted]
  );

  // Audio auto-play with duplicate guard
  useAudioPlayback(
    audioPlaybackDeps,
    phrase ? (phrase.pronunciation || phrase.phrase_text) : "",
    phrase?.language || "en",
    getCurrentVoice(current),
    !!(phrase && state === "quiz" && !showAnswer && !showStagePreview && !stageCompleted)
  );

  // Shuffle options only when phrase changes - remove resetTimer from dependencies
  useEffect(() => {
    if (phrase) {
      console.log("Setting new options for phrase:", phrase.id);
      setOptionOrder(getShuffledOptions(phrase));
    }
  }, [phrase?.id]); // Only depend on phrase.id to prevent unnecessary re-renders

  // Reset timer separately when showing new phrase
  useEffect(() => {
    if (phrase && !showAnswer) {
      console.log("Resetting timer for new phrase");
      resetTimer();
    }
  }, [phrase?.id, showAnswer, resetTimer]);

  // Memoize handlers to prevent unnecessary re-renders
  const handleSelect = useCallback((idx: number) => {
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
  }, [selected, setSelected, setShowAnswer, getElapsed, optionOrder, addXP, setRoundCorrect, setScore, updateStageScores, stage, setFeedback, phrase, markPhraseAsLearned, markPhraseAsPlayed, profile, loseHeart, updateOpponentScores, opponentName, current, currentStageStart, phrases.length, setStageCompleted]);

  const handleNext = useCallback(() => {
    // Only allow next question if not at end of stage
    const isLastInStage =
      (current - currentStageStart + 1) === Math.min(STAGE_SIZE, phrases.length - currentStageStart);

    if (!isLastInStage && current < phrases.length - 1) {
      setCurrent((c) => c + 1);
      resetQuestionState();
    }
  }, [current, currentStageStart, phrases.length, setCurrent, resetQuestionState]);

  const handleAdvanceStage = useCallback(() => {
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
  }, [roundCorrect, advanceStreak, setShowStagePreview, setStage, setStageCompleted, setCurrent, stage, resetQuestionState, refreshProfile, resetHearts, setFeedback, setRoundCorrect]);

  const handleStartStage = useCallback(() => {
    // Called when user presses "Start Stage"
    setShowStagePreview(false);
    setAdvanceRequested(false);
    resetQuestionState();
  }, [setShowStagePreview, resetQuestionState]);

  const handlePlayAudio = useCallback(() => {
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
  }, [phrase, current]);

  // Reset state when moving to a new stage (preview)
  useEffect(() => {
    if (showStagePreview) {
      resetQuestionState();
    }
  }, [showStagePreview, resetQuestionState]);

  // Memoize showNextButton calculation
  const showNextButton = useMemo(() => 
    showAnswer && (current - currentStageStart + 1) < Math.min(STAGE_SIZE, phrases.length - currentStageStart),
    [showAnswer, current, currentStageStart, phrases.length]
  );

  return (
    <>
      {children({
        phrase,
        optionOrder,
        timer,
        onSelect: handleSelect,
        onNext: handleNext,
        onPlayAudio: handlePlayAudio,
        onAdvanceStage: handleAdvanceStage,
        onStartStage: handleStartStage,
        showNextButton,
        profile,
        stageScores,
        opponentScores,
        totalStages,
        currentStageStart,
        roundCorrect,
        setRoundCorrect,
      })}
    </>
  );
};

export default QuizLogic;
