
import { useEffect } from "react";
import { saveGameState, getGameState, clearGameState } from "@/utils/gameStateManager";
import { Phrase, State } from "@/types/quiz";

interface GameStateManagerProps {
  phrases: Phrase[];
  current: number;
  score: number;
  stage: number;
  stageScores: number[];
  opponentScores: number[];
  roundCorrect: number;
  stageCompleted: boolean;
  showStagePreview: boolean;
  sessionId: string;
  state: State;
  setCurrent: (value: number | ((prev: number) => number)) => void;
  setScore: (value: number | ((prev: number) => number)) => void;
  setStage: (value: number | ((prev: number) => number)) => void;
  setRoundCorrect: (value: number | ((prev: number) => number)) => void;
  setStageCompleted: (value: boolean) => void;
  setShowStagePreview: (value: boolean) => void;
}

const GameStateManager: React.FC<GameStateManagerProps> = ({
  phrases,
  current,
  score,
  stage,
  stageScores,
  opponentScores,
  roundCorrect,
  stageCompleted,
  showStagePreview,
  sessionId,
  state,
  setCurrent,
  setScore,
  setStage,
  setRoundCorrect,
  setStageCompleted,
  setShowStagePreview,
}) => {
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
  }, [phrases.length, sessionId, setCurrent, setScore, setStage, setRoundCorrect, setStageCompleted, setShowStagePreview]);

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

  // Clear game state when quiz is finished
  useEffect(() => {
    if (state === "finished") {
      clearGameState();
    }
  }, [state]);

  return null; // This component only handles side effects
};

export default GameStateManager;
