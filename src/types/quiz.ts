
export type Phrase = {
  id: string;
  phrase_text: string;
  language: string;
  pronunciation: string | null;
  correct_meaning: string;
  incorrect1: string;
  incorrect2: string;
  notes: string | null;
  difficulty: number;
};

export type State = "loading" | "quiz" | "finished";

export type QuizProps = {
  opponentName: string;
  opponentEmoji: string;
};
