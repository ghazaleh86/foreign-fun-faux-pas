
import { Phrase } from "@/types/quiz";

const LEARNED_PHRASES_KEY = "learnedPhrases_v1";

export type LearnedPhraseLocal = {
  phraseId: string;
  learnedAt: string;
  phrase: Phrase;
};

export function getLearnedPhrases(): LearnedPhraseLocal[] {
  try {
    const stored = localStorage.getItem(LEARNED_PHRASES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addLearnedPhrase(phrase: Phrase) {
  const learned = getLearnedPhrases();
  
  // Check if already learned
  if (learned.some(lp => lp.phraseId === phrase.id)) {
    return;
  }
  
  const newLearnedPhrase: LearnedPhraseLocal = {
    phraseId: phrase.id,
    learnedAt: new Date().toISOString(),
    phrase: phrase
  };
  
  learned.push(newLearnedPhrase);
  localStorage.setItem(LEARNED_PHRASES_KEY, JSON.stringify(learned));
}

export function clearLearnedPhrases() {
  localStorage.removeItem(LEARNED_PHRASES_KEY);
}
