import { useCallback } from "react";
import { STAGE_SIZE, MAX_STAGES } from "@/utils/quizHelpers";
import { Phrase } from "@/types/quiz";
import { calculateStars } from "@/utils/starSystem";
import { toast } from "@/components/ui/sonner";
import { addLootToHotbar, addStuds, getLootItem, rollLootDrop } from "@/utils/gameRewards";

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

    // Reward chest: studs + guaranteed loot on stage end
    const studsEarned = stageStars * 5 + Math.max(0, roundCorrect - 2);
    addStuds(studsEarned);
    const drop = rollLootDrop("stage");
    if (drop) {
      // Better stages feel more rewarding
      addLootToHotbar(drop, stageStars === 3 ? 2 : 1);
      const item = getLootItem(drop);
      toast(`🎁 Stage chest opened! +${studsEarned} studs`, {
        description: `${item.emoji} ${item.name} added to your hotbar.`,
      });
    } else {
      toast(`🎁 Stage chest opened! +${studsEarned} studs`);
    }
    
    // Assess if user passed (3+ correct) 
    if (roundCorrect >= 3) {
      console.log("✅ useStageProgression: User passed, advancing to next stage");
      advanceStreak();
      
      // Check if this was the final stage based on actual phrase availability
      const totalStages = Math.ceil(phrases.length / STAGE_SIZE);
      const isGameComplete = stage + 1 >= totalStages;
      
      console.log("🏁 useStageProgression: Game completion check:", {
        currentStage: stage,
        maxStages: MAX_STAGES,
        isGameComplete,
        phrasesLength: phrases.length,
        totalStages
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
        // Set current with bounds checking to prevent going beyond available phrases
        const nextStageStart = (stage + 1) * STAGE_SIZE;
        setCurrent(Math.min(nextStageStart, phrases.length - 1));
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
      // Reset to stage start with bounds checking
      const stageStart = stage * STAGE_SIZE;
      setCurrent(Math.min(stageStart, phrases.length - 1));
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
