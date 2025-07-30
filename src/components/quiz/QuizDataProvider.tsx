import { usePlayerProfile } from "@/hooks/usePlayerProfile";
import { useStageManagement } from "@/hooks/useStageManagement";
import { useLearnedPhrases } from "@/hooks/useLearnedPhrases";
import { Phrase } from "@/types/quiz";

interface QuizDataProviderProps {
  phrases: Phrase[];
  profile: any;
}

export function useQuizData({ phrases, profile }: QuizDataProviderProps) {
  const {
    profile: playerProfile,
    addStars,
    loseHeart,
    resetHearts,
    advanceStreak,
    refresh: refreshProfile,
  } = usePlayerProfile();

  const {
    stage,
    setStage,
    stageScores,
    opponentScores,
    stageCompleted,
    setStageCompleted,
    showStagePreview,
    setShowStagePreview,
    roundCorrect,
    setRoundCorrect,
    totalStages,
    currentStageStart,
    updateStageScores,
    updateOpponentScores,
    stageCorrectCounts,
    stageTotalCounts,
    updateStageCorrectCounts,
    updateStageTotalCounts,
  } = useStageManagement(phrases, profile || playerProfile);

  const { markPhraseAsLearned } = useLearnedPhrases();

  return {
    profile: playerProfile,
    addStars,
    loseHeart,
    resetHearts,
    advanceStreak,
    refreshProfile,
    stage,
    setStage,
    stageScores,
    opponentScores,
    stageCompleted,
    setStageCompleted,
    showStagePreview,
    setShowStagePreview,
    roundCorrect,
    setRoundCorrect,
    totalStages,
    currentStageStart,
    updateStageScores,
    updateOpponentScores,
    stageCorrectCounts,
    stageTotalCounts,
    updateStageCorrectCounts,
    updateStageTotalCounts,
    markPhraseAsLearned,
  };
}