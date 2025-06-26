
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
  onGameStateRestored: (restoredState: any) => void;
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
  onGameStateRestored,
}) => {
  // Restore game state on component mount - only once when phrases are loaded
  useEffect(() => {
    const savedState = getGameState();
    if (savedState && phrases.length > 0 && state === "quiz") {
      // Only restore if we have a valid saved state and it's within bounds
      if (savedState.current < phrases.length && savedState.stage >= 0) {
        console.log("Restoring game state:", savedState);
        
        // Restore all state values
        setCurrent(savedState.current);
        setScore(savedState.score);
        setStage(savedState.stage);
        setRoundCorrect(savedState.roundCorrect);
        setStageCompleted(savedState.stageCompleted);
        setShowStagePreview(savedState.showStagePreview);
        
        // Notify parent component about restoration
        onGameStateRestored(savedState);
      } else {
        // Clear invalid saved state
        clearGameState();
      }
    }
  }, [phrases.length, state]); // Only depend on phrases being loaded and state being quiz

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
