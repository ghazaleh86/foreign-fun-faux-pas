
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Phrase, State } from "@/types/quiz";
import { getPlayedPhraseIds, setPlayedPhraseIds } from "@/utils/playedPhraseIds";
import { selectWeightedPhrases } from "@/utils/weightedPhraseSelection";

export function useQuizState() {
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [state, setState] = useState<State>("loading");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Fetch phrases on mount with weighted selection and rotation logic
  useEffect(() => {
    const fetchPhrases = async () => {
      setState("loading");
      let playedIds: string[] = [];
      try {
        playedIds = getPlayedPhraseIds();
      } catch { 
        playedIds = []; 
      }

      const { data, error } = await supabase
        .from("phrases")
        .select("*")
        .order("difficulty", { ascending: true })
        .order("created_at", { ascending: false });

      if (!data || error) {
        setPhrases([]);
        setState("quiz");
        setFeedback("Error fetching phrases. Please try again.");
      } else {
        console.log(`📊 Total phrases in database: ${data.length}`);
        
        // Filter out phrases that have been played before
        const unplayedPhrases = data.filter((p: Phrase) => !playedIds.includes(p.id));
        
        if (unplayedPhrases.length === 0) {
          // All phrases have been played - clear the played list and start fresh
          setPlayedPhraseIds([]);
          console.log("All phrases played! Starting fresh with weighted selection.");
          
          // Apply weighted selection to all phrases
          const weightedPhrases = selectWeightedPhrases(data as Phrase[], Math.min(50, data.length));
          setPhrases(weightedPhrases);
        } else {
          console.log(`Found ${unplayedPhrases.length} unplayed phrases out of ${data.length} total.`);
          
          // Apply weighted selection to unplayed phrases
          const weightedUnplayedPhrases = selectWeightedPhrases(
            unplayedPhrases as Phrase[], 
            Math.min(50, unplayedPhrases.length)
          );
          setPhrases(weightedUnplayedPhrases);
        }
        setState("quiz");
      }
    };
    fetchPhrases();
  }, []);

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
