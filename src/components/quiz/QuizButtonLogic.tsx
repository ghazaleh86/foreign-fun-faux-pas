import { useMemo } from "react";
import { STAGE_SIZE } from "@/utils/quizHelpers";
import { Phrase } from "@/types/quiz";

interface QuizButtonLogicProps {
  showAnswer: boolean;
  current: number;
  currentStageStart: number;
  phrases: Phrase[];
  stageCompleted: boolean;
}

export function useQuizButtonLogic({
  showAnswer,
  current,
  currentStageStart,
  phrases,
  stageCompleted,
}: QuizButtonLogicProps) {
  // Enhanced showNextButton calculation with debugging
  const showNextButton = useMemo(() => {
    const isLastInStage = (current - currentStageStart + 1) >= Math.min(STAGE_SIZE, phrases.length - currentStageStart);
    const shouldShow = showAnswer && !isLastInStage && !stageCompleted;
    
    console.log("🔘 QuizButtonLogic: Next button calculation:", {
      current,
      currentStageStart,
      stageSize: STAGE_SIZE,
      phrasesLength: phrases.length,
      currentPosition: current - currentStageStart + 1,
      maxInStage: Math.min(STAGE_SIZE, phrases.length - currentStageStart),
      isLastInStage,
      showAnswer,
      stageCompleted,
      shouldShow
    });
    
    return shouldShow;
  }, [showAnswer, current, currentStageStart, phrases.length, stageCompleted]);

  return { showNextButton };
}