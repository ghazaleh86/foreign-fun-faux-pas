
import React, { useState, useCallback, useEffect } from "react";
import { useQuizState } from "@/hooks/useQuizState";
import GameStateRenderer from "./GameStateRenderer";
import GameStateManager from "./GameStateManager";
import QuizLogic from "./QuizLogic";
import { QuizProps } from "@/types/quiz";

const PhraseQuiz: React.FC<QuizProps> = ({ opponentName, opponentEmoji }) => {
  const [sessionId] = useState(() => Date.now().toString());

  console.log("🎮 PhraseQuiz: Component initializing");

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

  // Initialize stage management state - let GameStateManager handle restoration
  const [stage, setStage] = useState(0);
  const [stageCompleted, setStageCompleted] = useState(false);
  const [showStagePreview, setShowStagePreview] = useState(false);
  const [roundCorrect, setRoundCorrect] = useState(0);
  const [gameStateRestored, setGameStateRestored] = useState(false);

  // Mock stage scores for now - these would come from the stage management hook
  const stageScores: number[] = [];
  const opponentScores: number[] = [];

  // Handle game state restoration
  const handleGameStateRestored = useCallback((restoredState: any) => {
    console.log("🔄 PhraseQuiz: Game state restored callback triggered:", restoredState);
    setGameStateRestored(true);
    
    // Reset question state when restoring to avoid showing stale UI
    console.log("🧹 PhraseQuiz: Resetting question state after restoration");
    resetQuestionState();
  }, [resetQuestionState]);

  // Log current state for debugging
  useEffect(() => {
    console.log("📊 PhraseQuiz: Current state update:", {
      current,
      stage,
      stageCompleted,
      showStagePreview,
      roundCorrect,
      phrasesLength: phrases.length,
      gameState: state,
      gameStateRestored
    });
  }, [current, stage, stageCompleted, showStagePreview, roundCorrect, phrases.length, state, gameStateRestored]);

  // Log when phrases change
  useEffect(() => {
    console.log("📝 PhraseQuiz: Phrases changed:", {
      phrasesLength: phrases.length,
      firstPhraseId: phrases[0]?.id,
      state
    });
  }, [phrases, state]);

  // Main layout: consistent container for all game states
  return (
    <div className="w-full flex justify-center items-start min-h-[80vh] pt-6">
      <div className="w-full max-w-xl flex flex-col gap-4">
        <div className="flex-1 w-full flex flex-col items-center justify-center">
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
            onGameStateRestored={handleGameStateRestored}
          />
          
          <QuizLogic
            phrases={phrases}
            current={current}
            setCurrent={setCurrent}
            score={score}
            setScore={setScore}
            selected={selected}
            setSelected={setSelected}
            showAnswer={showAnswer}
            setShowAnswer={setShowAnswer}
            feedback={feedback}
            setFeedback={setFeedback}
            state={state}
            markPhraseAsPlayed={markPhraseAsPlayed}
            resetQuestionState={resetQuestionState}
            stage={stage}
            stageCompleted={stageCompleted}
            setStageCompleted={setStageCompleted}
            showStagePreview={showStagePreview}
            opponentName={opponentName}
          >
            {({
              phrase,
              optionOrder,
              timer,
              onSelect,
              onNext,
              onPlayAudio,
              onAdvanceStage,
              onStartStage,
              showNextButton,
              profile,
              stageScores: logicStageScores,
              opponentScores: logicOpponentScores,
              totalStages,
              currentStageStart,
            }) => (
              <GameStateRenderer
                state={state}
                phrases={phrases}
                stageCompleted={stageCompleted}
                showStagePreview={showStagePreview}
                current={current}
                stage={stage}
                stageScores={logicStageScores}
                opponentScores={logicOpponentScores}
                opponentName={opponentName}
                opponentEmoji={opponentEmoji}
                onAdvanceStage={onAdvanceStage}
                onStartStage={onStartStage}
                profile={profile}
                score={score}
                totalStages={totalStages}
                onPlayAgain={() => {
                  // Clear game state and reload
                  window.location.reload();
                }}
                phrase={phrase}
                timer={timer}
                stageSize={10} // STAGE_SIZE constant
                maxStageScore={30} // Calculated based on stage size
                optionOrder={optionOrder}
                selected={selected}
                showAnswer={showAnswer}
                feedback={feedback}
                showNextButton={showNextButton}
                onSelect={onSelect}
                onNext={onNext}
                onPlayAudio={onPlayAudio}
                currentStageStart={currentStageStart}
              />
            )}
          </QuizLogic>
        </div>
      </div>
    </div>
  );
};

export default PhraseQuiz;
