
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
    setStage,
    stageScores,
    opponentScores,
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
  });

  // Use the quiz effects hook
  useQuizEffects({
    phrase,
    showAnswer,
    showStagePreview,
    resetQuestionState,
    resetTimer,
    setOptionOrder,
  });

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
