
import React, { useState, useMemo } from "react";
import { useAudioPlayback } from "@/hooks/useAudioPlayback";
import { useStageTimer } from "@/hooks/useStageTimer";
import { useLearnedPhrases } from "@/hooks/useLearnedPhrases";
import { usePlayerProfile } from "@/hooks/usePlayerProfile";
import { useStageManagement } from "@/hooks/useStageManagement";
import { useQuizHandlers } from "@/hooks/useQuizHandlers";
import { useQuizEffects } from "@/hooks/useQuizEffects";
import { 
  STAGE_SIZE, 
  getCurrentVoice, 
} from "@/utils/quizHelpers";
import { Option } from "./MultipleChoiceOptions";
import { Phrase, State } from "@/types/quiz";
import GameStateManager from "./GameStateManager";

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
  setState: (state: State) => void;
  markPhraseAsPlayed: (phraseId: string) => void;
  resetQuestionState: () => void;
  opponentName: string;
  sessionId: string;
  onGameStateRestored: (restoredState: any) => void;
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
    stage: number;
    stageCompleted: boolean;
    showStagePreview: boolean;
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
  setState,
  markPhraseAsPlayed,
  resetQuestionState,
  opponentName,
  sessionId,
  onGameStateRestored,
  children,
}) => {
  const [optionOrder, setOptionOrder] = useState<Option[]>([]);

  // Memoize the current phrase to prevent unnecessary re-renders
  const phrase = useMemo(() => phrases[current], [phrases, current]);

  console.log("🎮 QuizLogic: Rendering with current:", current, "phrase:", phrase?.id);

  const {
    profile,
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
    opponentScores,
    stageCompleted,
    setStageCompleted,
    showStagePreview,
    setShowStagePreview,
    roundCorrect,
    setRoundCorrect,
    totalStages,
    currentStageStart,
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

  console.log('🎮 QuizLogic Audio Debug:', {
    phraseLanguage: phrase?.language,
    phraseText: phrase?.phrase_text?.slice(0, 20),
    shouldPlay: !!(phrase && state === "quiz" && !showAnswer && !showStagePreview && !stageCompleted)
  });

  // Use the quiz handlers hook
  const {
    handleSelect,
    handleNext,
    handleAdvanceStage,
    handleStartStage,
    handlePlayAudio,
  } = useQuizHandlers({
    selected,
    setSelected,
    setShowAnswer,
    getElapsed,
    optionOrder,
    addXP,
    setRoundCorrect,
    setScore,
    updateStageScores,
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
    setCurrent,
    resetQuestionState,
    roundCorrect,
    advanceStreak,
    setShowStagePreview,
    setStage,
    refreshProfile,
    resetHearts,
    setState,
  });

  // Use the quiz effects hook - memoize dependencies to prevent re-renders
  const quizEffectsDeps = useMemo(() => ({
    phrase,
    showAnswer,
    showStagePreview,
    resetQuestionState,
    resetTimer,
    setOptionOrder,
  }), [phrase?.id, showAnswer, showStagePreview, resetQuestionState, resetTimer, setOptionOrder]);

  useQuizEffects(quizEffectsDeps);

  // Enhanced showNextButton calculation with debugging
  const showNextButton = useMemo(() => {
    const isLastInStage = (current - currentStageStart + 1) >= Math.min(STAGE_SIZE, phrases.length - currentStageStart);
    const shouldShow = showAnswer && !isLastInStage && !stageCompleted;
    
    console.log("🔘 QuizLogic: Next button calculation:", {
      current,
      currentStageStart,
      stageSize: STAGE_SIZE,
      phrasesLength: phrases.length,
      currentPosition: current - currentStageStart + 1,
      maxInStage: Math.min(STAGE_SIZE, phrases.length - currentStageStart),
      isLastInStage,
      showAnswer,
      stageCompleted,
      shouldShow
    });
    
    return shouldShow;
  }, [showAnswer, current, currentStageStart, phrases.length, stageCompleted]);

  return (
    <>
      <GameStateManager
        phrases={phrases}
        current={current}
        score={score}
        stage={stage}
        stageScores={stageScores}
        opponentScores={opponentScores}
        roundCorrect={roundCorrect}
        stageCompleted={stageCompleted}
        showStagePreview={showStagePreview}
        sessionId={sessionId}
        state={state}
        setCurrent={setCurrent}
        setScore={setScore}
        setStage={setStage}
        setRoundCorrect={setRoundCorrect}
        setStageCompleted={setStageCompleted}
        setShowStagePreview={setShowStagePreview}
        onGameStateRestored={onGameStateRestored}
      />
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
        stage,
        stageCompleted,
        showStagePreview,
        roundCorrect,
        setRoundCorrect,
      })}
    </>
  );
};

export default QuizLogic;
