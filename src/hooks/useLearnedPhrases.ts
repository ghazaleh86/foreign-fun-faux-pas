
import { addLearnedPhrase } from "@/utils/learnedPhrases";
import { Phrase } from "@/types/quiz";

export function useLearnedPhrases() {
  const markPhraseAsLearned = async (phrase: Phrase) => {
    addLearnedPhrase(phrase);
  };

  return {
    markPhraseAsLearned,
  };
}
