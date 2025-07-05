
import { useEffect, useRef } from "react";
import { saveGameState, getGameState, clearGameState } from "@/utils/gameStateManager";
import { Phrase, State } from "@/types/quiz";

interface GameStateManagerProps {
  phrases: Phrase[];
  current: number;
  score: number;
  stage: number;
  stageScores: number[];
  opponentScores: number[];
  stageCorrectCounts: number[];
  stageTotalCounts: number[];
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
  stageCorrectCounts,
  stageTotalCounts,
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
  const hasRestored = useRef(false);

  // Restore game state immediately when phrases are loaded - only once
  useEffect(() => {
    console.log("🔍 GameStateManager: Restore effect triggered", {
      phrasesLength: phrases.length,
      state,
      current,
      stage,
      score,
      hasRestored: hasRestored.current
    });
    
    if (hasRestored.current || phrases.length === 0 || state !== "quiz") {
      console.log("❌ GameStateManager: Skipping restoration - already done or conditions not met");
      return;
    }
    
    const savedState = getGameState();
    console.log("💾 GameStateManager: Checking for saved state:", savedState);
    
    if (savedState) {
      // Validate saved state bounds
      const isValidState = savedState.current >= 0 && 
                          savedState.current < phrases.length && 
                          savedState.stage >= 0;
      
      console.log("✅ GameStateManager: Validating saved state", {
        isValid: isValidState,
        savedCurrent: savedState.current,
        phrasesLength: phrases.length,
        savedStage: savedState.stage
      });
      
      if (isValidState) {
        console.log("🔄 GameStateManager: Restoring valid game state:", {
          current: savedState.current,
          score: savedState.score,
          stage: savedState.stage,
          stageCompleted: savedState.stageCompleted,
          showStagePreview: savedState.showStagePreview,
          roundCorrect: savedState.roundCorrect
        });
        
        // Mark as restored first to prevent multiple restorations
        hasRestored.current = true;
        
        // Restore state immediately
        setCurrent(savedState.current);
        setScore(savedState.score);
        setStage(savedState.stage);
        setRoundCorrect(savedState.roundCorrect);
        setStageCompleted(savedState.stageCompleted);
        setShowStagePreview(savedState.showStagePreview);
        
        console.log("📢 GameStateManager: Notifying parent component of restoration");
        // Notify parent component
        onGameStateRestored(savedState);
      } else {
        console.log("⚠️ GameStateManager: Invalid saved state, clearing:", savedState);
        clearGameState();
        hasRestored.current = true;
      }
    } else {
      console.log("📝 GameStateManager: No saved state found, starting fresh");
      hasRestored.current = true;
    }
  }, [phrases.length, state]); // Only trigger when phrases load and state is quiz

  // Save game state whenever values change
  useEffect(() => {
    console.log("💾 GameStateManager: Save effect triggered", {
      phrasesLength: phrases.length,
      state,
      current,
      score,
      stage,
      roundCorrect,
      stageCompleted,
      showStagePreview,
      hasRestored: hasRestored.current
    });
    
    // Only save if we've completed initial restoration and conditions are met
    if (hasRestored.current && phrases.length > 0 && state === "quiz") {
      const gameState = {
        phrases,
        current,
        score,
        stage,
        stageScores,
        opponentScores,
        stageCorrectCounts,
        stageTotalCounts,
        roundCorrect,
        stageCompleted,
        showStagePreview,
        sessionId
      };
      
      console.log("💾 GameStateManager: Saving game state:", gameState);
      saveGameState(gameState);
    } else {
      console.log("❌ GameStateManager: Not saving - conditions not met");
    }
  }, [phrases, current, score, stage, stageScores, opponentScores, stageCorrectCounts, stageTotalCounts, roundCorrect, stageCompleted, showStagePreview, sessionId, state]);

  // Clear game state when quiz is finished
  useEffect(() => {
    if (state === "finished") {
      console.log("🏁 GameStateManager: Clearing game state - quiz finished");
      clearGameState();
      hasRestored.current = false; // Reset for next game
    }
  }, [state]);

  return null;
};

export default GameStateManager;
