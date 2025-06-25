
import { Phrase } from "@/types/quiz";

export type GameState = {
  currentQuizSession: {
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
  } | null;
};

const GAME_STATE_KEY = "currentGameState_v1";

export function saveGameState(gameState: GameState["currentQuizSession"]) {
  if (gameState) {
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState));
  }
}

export function getGameState(): GameState["currentQuizSession"] {
  try {
    const stored = localStorage.getItem(GAME_STATE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function clearGameState() {
  localStorage.removeItem(GAME_STATE_KEY);
}

export function hasActiveGame(): boolean {
  const state = getGameState();
  return !!(state && state.phrases.length > 0 && state.current < state.phrases.length);
}
