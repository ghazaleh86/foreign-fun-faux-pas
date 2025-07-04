
import { useCallback } from "react";
import { STAGE_SIZE } from "@/utils/quizHelpers";
import { Phrase } from "@/types/quiz";

interface UseNavigationProps {
  current: number;
  currentStageStart: number;
  phrases: Phrase[];
  setCurrent: (value: number | ((prev: number) => number)) => void;
  resetQuestionState: () => void;
}

export function useNavigation({
  current,
  currentStageStart,
  phrases,
  setCurrent,
  resetQuestionState,
}: UseNavigationProps) {
  const handleNext = useCallback(() => {
    // Only allow next question if not at end of stage
    const currentPositionInStage = current - currentStageStart + 1;
    const maxQuestionsInStage = Math.min(STAGE_SIZE, phrases.length - currentStageStart);
    const isLastInStage = currentPositionInStage >= maxQuestionsInStage;

    console.log("➡️ useNavigation: Next button clicked:", {
      current,
      currentStageStart,
      currentPositionInStage,
      maxQuestionsInStage,
      isLastInStage,
      canProceed: !isLastInStage && current < phrases.length - 1
    });

    if (!isLastInStage && current < phrases.length - 1) {
      console.log("➡️ QuizLogic: Moving to next question");
      setCurrent((c) => c + 1);
      resetQuestionState();
    }
  }, [current, currentStageStart, phrases.length, setCurrent, resetQuestionState]);

  return { handleNext };
}
