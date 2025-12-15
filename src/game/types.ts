import type { Phrase } from "@/types/quiz";

export type GameMode = "landing" | "language" | "playing" | "stage_summary" | "game_summary";

export type GameSettings = {
  language: string | null; // null = all
  stageSize: number; // questions per stage
  timeLimitSec: number; // per question
  totalStages: number; // derived from deck length / stageSize
};

export type Deck = {
  phraseIds: string[];
};

export type QuestionState = {
  idx: number; // index in deck
  selectedOption: number | null;
  showAnswer: boolean;
  feedback: string | null;
  secondsElapsed: number;
};

export type GameProgress = {
  stage: number;
  scoreTotal: number;
  stageScore: number;
  stageCorrect: number;
  hearts: number;
  maxHearts: number;
  totalStars: number;
  studs: number;
};

export type GameState = {
  version: 1;
  mode: GameMode;
  settings: GameSettings;
  deck: Deck;
  question: QuestionState;
  progress: GameProgress;
  // cache phrases by id for rendering
  phrasesById: Record<string, Phrase>;
};

export type AnswerOption = {
  label: string;
  isCorrect: boolean;
};

export type Action =
  | { type: "GO_LANGUAGE" }
  | { type: "START"; language: string | null; deck: Deck; phrasesById: Record<string, Phrase> }
  | { type: "TICK" }
  | { type: "ANSWER"; selected: number; isCorrect: boolean }
  | { type: "NEXT" }
  | { type: "STAGE_CONTINUE" }
  | { type: "RESET_RUN" }
  | { type: "BACK_TO_START" };

