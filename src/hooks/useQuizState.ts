
import { useState, useEffect } from "react";
import { Phrase, State } from "@/types/quiz";
import { getPlayedPhraseIds, setPlayedPhraseIds } from "@/utils/playedPhraseIds";
import { selectWeightedPhrases } from "@/utils/weightedPhraseSelection";
import { useLanguage } from "@/contexts/LanguageContext";
import { fetchPhrases as fetchLocalPhrases } from "@/lib/phraseRepository";

export function useQuizState() {
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [state, setState] = useState<State>("loading");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const { selectedLanguage } = useLanguage();

  // Fetch phrases on mount with weighted selection and rotation logic
  // Re-fetch when selectedLanguage changes
  useEffect(() => {
    const loadPhrases = async () => {
      setState("loading");
      let playedIds: string[] = [];
      try {
        playedIds = getPlayedPhraseIds();
      } catch { 
        playedIds = []; 
      }

      try {
        const all = await fetchLocalPhrases(selectedLanguage);
        console.log(`📦 Local phrases loaded: ${all.length}`);

        // Filter out phrases that have been played before
        const unplayedPhrases = all.filter((p: Phrase) => !playedIds.includes(p.id));

        if (unplayedPhrases.length === 0) {
          // All phrases have been played - clear the played list and start fresh
          setPlayedPhraseIds([]);
          console.log("All phrases played! Starting fresh with weighted selection.");

          const weightedPhrases = selectWeightedPhrases(all as Phrase[], Math.min(50, all.length));
          setPhrases(weightedPhrases);
        } else {
          const weightedUnplayedPhrases = selectWeightedPhrases(
            unplayedPhrases as Phrase[],
            Math.min(50, unplayedPhrases.length)
          );
          setPhrases(weightedUnplayedPhrases);
        }

        setState("quiz");
      } catch (e) {
        console.error("Error loading local phrases:", e);
        setPhrases([]);
        setState("quiz");
        setFeedback("Could not load local phrases. Please try again.");
      }
    };
    loadPhrases();
  }, [selectedLanguage]); // Re-fetch when language changes

  const markPhraseAsPlayed = (phraseId: string) => {
    const playedIds = getPlayedPhraseIds();
    const updatedPlayedIds = Array.from(new Set([...playedIds, phraseId]));
    setPlayedPhraseIds(updatedPlayedIds);
  };

  const resetQuestionState = () => {
    setSelected(null);
    setShowAnswer(false);
    setFeedback(null);
  };

  return {
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
  };
}
