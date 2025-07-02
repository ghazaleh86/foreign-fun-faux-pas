
import { useEffect } from "react";
import { getShuffledOptions } from "@/utils/quizHelpers";
import { Option } from "@/components/MultipleChoiceOptions";
import { Phrase } from "@/types/quiz";

interface UseQuizEffectsProps {
  phrase: Phrase | undefined;
  showAnswer: boolean;
  showStagePreview: boolean;
  resetQuestionState: () => void;
  resetTimer: () => void;
  setOptionOrder: (options: Option[]) => void;
}

export function useQuizEffects(props: UseQuizEffectsProps) {
  const {
    phrase,
    showAnswer,
    showStagePreview,
    resetQuestionState,
    resetTimer,
    setOptionOrder,
  } = props;
  // Shuffle options only when phrase changes - stable phrase ID tracking
  useEffect(() => {
    if (phrase?.id) {
      console.log("🎯 QuizLogic: Setting new options for phrase:", phrase.id);
      setOptionOrder(getShuffledOptions(phrase));
    }
  }, [phrase?.id, setOptionOrder]);

  // Reset timer when phrase changes - FIXED: Remove resetTimer from dependencies to prevent loop
  useEffect(() => {
    if (phrase?.id && !showAnswer) {
      console.log("⏰ QuizLogic: Resetting timer for phrase:", phrase.id);
      resetTimer();
    }
  }, [phrase?.id, showAnswer]); // Removed resetTimer from dependencies

  // Reset state when moving to a new stage (preview)
  useEffect(() => {
    if (showStagePreview) {
      resetQuestionState();
    }
  }, [showStagePreview, resetQuestionState]);
}
