
import { useState, useEffect, useMemo } from "react";
import { STAGE_SIZE, ROUND_SIZE } from "@/utils/quizHelpers";
import { getGameState } from "@/utils/gameStateManager";

export function useStageManagement(phrases: any[], profile: any) {
  // Initialize from saved state if available
  const [stage, setStage] = useState(() => {
    const savedState = getGameState();
    console.log("🏗️ useStageManagement: Initializing stage from saved state:", savedState?.stage || 0);
    return savedState?.stage || 0;
  });
  
  const [stageScores, setStageScores] = useState<number[]>([]);
  
  const [stageCompleted, setStageCompleted] = useState(() => {
    const savedState = getGameState();
    console.log("🏗️ useStageManagement: Initializing stageCompleted from saved state:", savedState?.stageCompleted || false);
    return savedState?.stageCompleted || false;
  });
  
  const [opponentScores, setOpponentScores] = useState<number[]>([]);
  
  const [showStagePreview, setShowStagePreview] = useState(() => {
    const savedState = getGameState();
    console.log("🏗️ useStageManagement: Initializing showStagePreview from saved state:", savedState?.showStagePreview || false);
    return savedState?.showStagePreview || false;
  });
  
  const [roundQuestions, setRoundQuestions] = useState<any[]>([]);
  
  const [roundCorrect, setRoundCorrect] = useState(() => {
    const savedState = getGameState();
    console.log("🏗️ useStageManagement: Initializing roundCorrect from saved state:", savedState?.roundCorrect || 0);
    return savedState?.roundCorrect || 0;
  });

  // Memoize computed values to prevent unnecessary re-renders
  const totalStages = useMemo(() => Math.ceil(phrases.length / STAGE_SIZE), [phrases.length]);
  const currentStageStart = useMemo(() => stage * STAGE_SIZE, [stage]);
  const currentStageEnd = useMemo(() => Math.min(currentStageStart + STAGE_SIZE, phrases.length), [currentStageStart, phrases.length]);

  // Prepare a new round (5 unplayed questions) - only depend on stage and phrases.length
  useEffect(() => {
    console.log("🎯 useStageManagement: Round questions effect triggered", {
      phrasesLength: phrases.length,
      stage,
      roundStart: stage * ROUND_SIZE
    });
    
    if (phrases.length === 0) return;
    // Pick next ROUND_SIZE questions not played yet in this session
    const roundStart = stage * ROUND_SIZE;
    const newRoundQuestions = phrases.slice(roundStart, roundStart + ROUND_SIZE);
    console.log("🎯 useStageManagement: Setting round questions:", newRoundQuestions.map(p => p.id));
    setRoundQuestions(newRoundQuestions);
    
    // Only reset roundCorrect if we don't have a saved state
    const savedState = getGameState();
    if (!savedState) {
      console.log("🎯 useStageManagement: Resetting roundCorrect to 0 (no saved state)");
      setRoundCorrect(0);
    }
  }, [stage, phrases.length]); // Removed profile and phrases array from dependencies

  function updateStageScores(stageIdx: number, value: number) {
    console.log("📊 useStageManagement: Updating stage scores", { stageIdx, value });
    setStageScores((prev) => {
      const next = [...prev];
      next[stageIdx] = (next[stageIdx] ?? 0) + value;
      console.log("📊 useStageManagement: New stage scores:", next);
      return next;
    });
  }

  function updateOpponentScores(stageIdx: number, value: number) {
    console.log("🤖 useStageManagement: Updating opponent scores", { stageIdx, value });
    setOpponentScores((prev) => {
      const next = [...prev];
      next[stageIdx] = (next[stageIdx] ?? 0) + value;
      console.log("🤖 useStageManagement: New opponent scores:", next);
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
