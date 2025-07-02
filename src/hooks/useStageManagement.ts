
import { useState, useEffect, useMemo } from "react";
import { STAGE_SIZE } from "@/utils/quizHelpers";
import { getGameState } from "@/utils/gameStateManager";

export function useStageManagement(phrases: any[], profile: any) {
  // Initialize from saved state if available - use useEffect to set initial state
  const [stage, setStage] = useState(0);
  const [stageCompleted, setStageCompleted] = useState(false);
  const [showStagePreview, setShowStagePreview] = useState(false);
  const [roundCorrect, setRoundCorrect] = useState(0);
  const [stageScores, setStageScores] = useState<number[]>([]);
  const [opponentScores, setOpponentScores] = useState<number[]>([]);
  const [roundQuestions, setRoundQuestions] = useState<any[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Initialize state from saved data only once
  useEffect(() => {
    if (!initialized) {
      const savedState = getGameState();
      console.log("🏗️ useStageManagement: One-time initialization from saved state:", savedState);
      
      if (savedState) {
        console.log("🔄 useStageManagement: Restoring saved values");
        setStage(savedState.stage || 0);
        setStageCompleted(savedState.stageCompleted || false);
        setShowStagePreview(savedState.showStagePreview || false);
        setRoundCorrect(savedState.roundCorrect || 0);
        setStageScores(savedState.stageScores || []);
        setOpponentScores(savedState.opponentScores || []);
      } else {
        console.log("📝 useStageManagement: No saved state, using defaults");
      }
      
      setInitialized(true);
    }
  }, [initialized]);

  // Memoize computed values to prevent unnecessary re-renders
  const totalStages = useMemo(() => Math.ceil(phrases.length / STAGE_SIZE), [phrases.length]);
  const currentStageStart = useMemo(() => stage * STAGE_SIZE, [stage]);
  const currentStageEnd = useMemo(() => Math.min(currentStageStart + STAGE_SIZE, phrases.length), [currentStageStart, phrases.length]);

  // Prepare a new round (STAGE_SIZE questions) - only depend on stage and phrases.length
  useEffect(() => {
    if (!initialized || phrases.length === 0) return;
    
    console.log("🎯 useStageManagement: Round questions effect triggered", {
      phrasesLength: phrases.length,
      stage,
      roundStart: stage * STAGE_SIZE,
      initialized
    });
    
    // Pick next STAGE_SIZE questions not played yet in this session
    const roundStart = stage * STAGE_SIZE;
    const newRoundQuestions = phrases.slice(roundStart, roundStart + STAGE_SIZE);
    console.log("🎯 useStageManagement: Setting round questions:", newRoundQuestions.map(p => p.id));
    setRoundQuestions(newRoundQuestions);
  }, [stage, phrases.length, initialized]);

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
