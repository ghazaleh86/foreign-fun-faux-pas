import { useMemo } from "react";
import { useStageTimer } from "@/hooks/useStageTimer";
import { State } from "@/types/quiz";

interface QuizTimerControllerProps {
  showAnswer: boolean;
  state: State;
  showStagePreview: boolean;
  stageCompleted: boolean;
}

export function useQuizTimer({
  showAnswer,
  state,
  showStagePreview,
  stageCompleted,
}: QuizTimerControllerProps) {
  // Timer via custom hook - memoize the timer condition to prevent re-renders
  const timerShouldRun = useMemo(() => 
    !showAnswer && state === "quiz" && !showStagePreview && !stageCompleted,
    [showAnswer, state, showStagePreview, stageCompleted]
  );

  const { timer, getElapsed, reset: resetTimer } = useStageTimer(timerShouldRun);

  return { timer, getElapsed, resetTimer };
}