import { useCallback } from "react";
import { STAGE_SIZE, MAX_STAGES } from "@/utils/quizHelpers";
import { Phrase } from "@/types/quiz";
import { calculateStars } from "@/utils/starSystem";

interface UseStageProgressionProps {
  roundCorrect: number;
  stage: number;
  phrases: Phrase[];
  advanceStreak: () => void;
  setShowStagePreview: (value: boolean) => void;
  setStage: (value: number | ((prev: number) => number)) => void;
  setStageCompleted: (value: boolean) => void;
  setCurrent: (value: number | ((prev: number) => number)) => void;
  resetQuestionState: () => void;
  refreshProfile: () => void;
  resetHearts: () => void;
  setFeedback: (feedback: string | null) => void;
  setRoundCorrect: (value: number | ((prev: number) => number)) => void;
  setState: (state: "loading" | "quiz" | "finished") => void;
  addStars: (stars: number) => void;
}

export function useStageProgression({
  roundCorrect,
  stage,
  phrases,
  advanceStreak,
  setShowStagePreview,
  setStage,
  setStageCompleted,
  setCurrent,
  resetQuestionState,
  refreshProfile,
  resetHearts,
  setFeedback,
  setRoundCorrect,
  setState,
  addStars,
}: UseStageProgressionProps) {
  const handleAdvanceStage = useCallback(() => {
    console.log("🚀 useStageProgression: handleAdvanceStage called", { roundCorrect, stage });
    
    // Calculate stars based on performance and award them
    const stageStars = calculateStars(roundCorrect, STAGE_SIZE);
    console.log(`⭐ useStageProgression: Stage completed with ${roundCorrect}/${STAGE_SIZE} correct, awarding ${stageStars} stars`);
    
    // Award stars for stage completion
    addStars(stageStars);
    
    // Assess if user passed (3+ correct) 
    if (roundCorrect >= 3) {
      console.log("✅ useStageProgression: User passed, advancing to next stage");
      advanceStreak();
      
      // Check if this was the final stage - use MAX_STAGES instead of calculating from phrases
      const isGameComplete = stage + 1 >= MAX_STAGES;
      
      console.log("🏁 useStageProgression: Game completion check:", {
        currentStage: stage,
        maxStages: MAX_STAGES,
        isGameComplete,
        phrasesLength: phrases.length
      });
      
      if (isGameComplete) {
        console.log("🎉 useStageProgression: Game completed! Setting state to finished");
        // Game is complete - trigger finished state
        setState("finished");
      } else {
        // Skip stage preview, go directly to next stage
        setShowStagePreview(false);
        setStage((s) => s + 1);
        setStageCompleted(false);
        // FIXED: Use STAGE_SIZE for consistency with stage management
        setCurrent((stage + 1) * STAGE_SIZE);
        resetQuestionState();
        refreshProfile();
      }
    } else {
      console.log("❌ useStageProgression: User did not pass, restarting stage");
      // Did not pass: refill hearts, restart round, reset corrects (using same questions)
      resetHearts();
      setStageCompleted(false);
      resetQuestionState();
      setFeedback("You need at least 3 correct to pass. Try again!");
      // FIXED: Use STAGE_SIZE for consistency with stage management
      setCurrent(stage * STAGE_SIZE);
      setRoundCorrect(0);
      refreshProfile();
    }
  }, [roundCorrect, advanceStreak, setShowStagePreview, setStage, setStageCompleted, setCurrent, stage, resetQuestionState, refreshProfile, resetHearts, setFeedback, setRoundCorrect, phrases.length, setState]);

  const handleStartStage = useCallback(() => {
    // Called when user presses "Start Stage"
    console.log("▶️ useStageProgression: handleStartStage called");
    setShowStagePreview(false);
    resetQuestionState();
  }, [setShowStagePreview, resetQuestionState]);

  return { handleAdvanceStage, handleStartStage };
}
