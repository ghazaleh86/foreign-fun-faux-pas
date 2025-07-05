
import React, { useState, useMemo } from "react";
import { useQuizHandlers } from "@/hooks/useQuizHandlers";
import { useQuizEffects } from "@/hooks/useQuizEffects";
import { Option } from "./MultipleChoiceOptions";
import { Phrase, State } from "@/types/quiz";
import GameStateManager from "./GameStateManager";
import { 
  QuizAudioController, 
  useQuizTimer, 
  useQuizData, 
  useQuizButtonLogic 
} from "./quiz";

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
    stageCorrectCounts: number[];
    stageTotalCounts: number[];
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

  // Use extracted data management hook
  const {
    profile,
    addXP,
    loseHeart,
    resetHearts,
    advanceStreak,
    refreshProfile,
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
    stageCorrectCounts,
    stageTotalCounts,
    updateStageCorrectCounts,
    updateStageTotalCounts,
    markPhraseAsLearned,
  } = useQuizData({ phrases, profile: null });

  // Use extracted timer hook
  const { timer, getElapsed, resetTimer } = useQuizTimer({
    showAnswer,
    state,
    showStagePreview,
    stageCompleted,
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

  // Use extracted button logic hook
  const { showNextButton } = useQuizButtonLogic({
    showAnswer,
    current,
    currentStageStart,
    phrases,
    stageCompleted,
  });

  return (
    <>
      <QuizAudioController
        phrase={phrase}
        current={current}
        state={state}
        showAnswer={showAnswer}
        showStagePreview={showStagePreview}
        stageCompleted={stageCompleted}
      />
      <GameStateManager
        phrases={phrases}
        current={current}
        score={score}
        stage={stage}
        stageScores={stageScores}
        opponentScores={opponentScores}
        stageCorrectCounts={stageCorrectCounts}
        stageTotalCounts={stageTotalCounts}
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
        stageCorrectCounts,
        stageTotalCounts,
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
