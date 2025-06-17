
import { useState, useEffect } from "react";
import { STAGE_SIZE, ROUND_SIZE } from "@/utils/quizHelpers";

export function useStageManagement(phrases: any[], profile: any) {
  const [stage, setStage] = useState(0);
  const [stageScores, setStageScores] = useState<number[]>([]);
  const [stageCompleted, setStageCompleted] = useState(false);
  const [opponentScores, setOpponentScores] = useState<number[]>([]);
  const [showStagePreview, setShowStagePreview] = useState(true);
  const [roundQuestions, setRoundQuestions] = useState<any[]>([]);
  const [roundCorrect, setRoundCorrect] = useState(0);

  // Prepare a new round (5 unplayed questions)
  useEffect(() => {
    if (phrases.length === 0) return;
    // Pick next ROUND_SIZE questions not played yet in this session
    const roundStart = stage * ROUND_SIZE;
    setRoundQuestions(phrases.slice(roundStart, roundStart + ROUND_SIZE));
    setRoundCorrect(0);
    if (profile) {
      // Reset hearts functionality would be called here
    }
  }, [stage, phrases, profile]);

  const totalStages = Math.ceil(phrases.length / STAGE_SIZE);
  const currentStageStart = stage * STAGE_SIZE;
  const currentStageEnd = Math.min(currentStageStart + STAGE_SIZE, phrases.length);

  function updateStageScores(stageIdx: number, value: number) {
    setStageScores((prev) => {
      const next = [...prev];
      next[stageIdx] = (next[stageIdx] ?? 0) + value;
      return next;
    });
  }

  function updateOpponentScores(stageIdx: number, value: number) {
    setOpponentScores((prev) => {
      const next = [...prev];
      next[stageIdx] = (next[stageIdx] ?? 0) + value;
      return next;
    });
  }

  return {
    stage,
    setStage,
    stageScores,
    stageCompleted,
    setStageCompleted,
    opponentScores,
    showStagePreview,
    setShowStagePreview,
    roundQuestions,
    roundCorrect,
    setRoundCorrect,
    totalStages,
    currentStageStart,
    currentStageEnd,
    updateStageScores,
    updateOpponentScores,
  };
}
