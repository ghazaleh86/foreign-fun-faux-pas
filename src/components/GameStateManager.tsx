
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
  // Restore game state immediately when phrases are loaded
  useEffect(() => {
    if (phrases.length === 0 || state !== "quiz") return;
    
    const savedState = getGameState();
    console.log("Checking for saved state:", savedState);
    
    if (savedState) {
      // Validate saved state bounds
      const isValidState = savedState.current >= 0 && 
                          savedState.current < phrases.length && 
                          savedState.stage >= 0;
      
      if (isValidState) {
        console.log("Restoring valid game state:", {
          current: savedState.current,
          score: savedState.score,
          stage: savedState.stage,
          stageCompleted: savedState.stageCompleted,
          showStagePreview: savedState.showStagePreview,
          roundCorrect: savedState.roundCorrect
        });
        
        // Use setTimeout to ensure this runs after other state initializations
        setTimeout(() => {
          setCurrent(savedState.current);
          setScore(savedState.score);
          setStage(savedState.stage);
          setRoundCorrect(savedState.roundCorrect);
          setStageCompleted(savedState.stageCompleted);
          setShowStagePreview(savedState.showStagePreview);
          
          // Notify parent component
          onGameStateRestored(savedState);
        }, 0);
      } else {
        console.log("Invalid saved state, clearing:", savedState);
        clearGameState();
      }
    }
  }, [phrases.length, state]); // Trigger when phrases load and state is quiz

  // Save game state whenever values change
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
      
      console.log("Saving game state:", gameState);
      saveGameState(gameState);
    }
  }, [phrases, current, score, stage, stageScores, opponentScores, roundCorrect, stageCompleted, showStagePreview, sessionId, state]);

  // Clear game state when quiz is finished
  useEffect(() => {
    if (state === "finished") {
      console.log("Clearing game state - quiz finished");
      clearGameState();
    }
  }, [state]);

  return null;
};

export default GameStateManager;
