
import { useCallback } from "react";
import { 
  computeSpeedBonus, 
  getSpeedBonusXP, 
  getCurrentVoice, 
  randomWrongTaunt, 
  getVoiceSettings,
  STAGE_SIZE,
  ROUND_SIZE
} from "@/utils/quizHelpers";
import { Option } from "@/components/MultipleChoiceOptions";
import { Phrase } from "@/types/quiz";

interface UseQuizHandlersProps {
  selected: number | null;
  setSelected: (value: number | null) => void;
  setShowAnswer: (value: boolean) => void;
  getElapsed: () => number;
  optionOrder: Option[];
  addXP: (xp: number) => void;
  setRoundCorrect: (value: number | ((prev: number) => number)) => void;
  setScore: (value: number | ((prev: number) => number)) => void;
  updateStageScores: (stage: number, value: number) => void;
  stage: number;
  setFeedback: (feedback: string | null) => void;
  phrase: Phrase | undefined;
  markPhraseAsLearned: (phrase: Phrase) => void;
  markPhraseAsPlayed: (phraseId: string) => void;
  profile: any;
  loseHeart: () => void;
  updateOpponentScores: (stage: number, value: number) => void;
  opponentName: string;
  current: number;
  currentStageStart: number;
  phrases: Phrase[];
  setStageCompleted: (value: boolean) => void;
  setCurrent: (value: number | ((prev: number) => number)) => void;
  resetQuestionState: () => void;
  roundCorrect: number;
  advanceStreak: () => void;
  setShowStagePreview: (value: boolean) => void;
  setStage: (value: number | ((prev: number) => number)) => void;
  refreshProfile: () => void;
  resetHearts: () => void;
}

// Check if we're on a mobile device
function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function useQuizHandlers({
  selected,
  setSelected,
  setShowAnswer,
  getElapsed,
  optionOrder,
  addXP,
  setRoundCorrect,
  setScore,
  updateStageScores,
  stage,
  setFeedback,
  phrase,
  markPhraseAsLearned,
  markPhraseAsPlayed,
  profile,
  loseHeart,
  updateOpponentScores,
  opponentName,
  current,
  currentStageStart,
  phrases,
  setStageCompleted,
  setCurrent,
  resetQuestionState,
  roundCorrect,
  advanceStreak,
  setShowStagePreview,
  setStage,
  refreshProfile,
  resetHearts,
}: UseQuizHandlersProps) {
  const handleSelect = useCallback((idx: number) => {
    if (selected !== null) return;
    console.log("🎯 QuizLogic: Answer selected:", idx);
    setSelected(idx);
    setShowAnswer(true);

    let timeTaken = getElapsed();

    if (optionOrder[idx].isCorrect) {
      // +10 XP, plus speed bonus
      const bonusXP = getSpeedBonusXP(timeTaken);
      addXP(10 + bonusXP);
      setRoundCorrect((c) => c + 1);
      const bonus = computeSpeedBonus(timeTaken);
      setScore((s) => s + bonus);
      updateStageScores(stage, bonus);
      setFeedback(`🎉 Correct! (+10 XP${bonusXP ? ` +${bonusXP} bonus` : ""}) Time: ${timeTaken}s`);
      
      // Mark phrase as learned immediately when answered correctly
      if (phrase) {
        markPhraseAsLearned(phrase);
      }
    } else {
      loseHeart();
      const opponentGotIt = Math.random() < 0.7 ? 1 : 0;
      updateOpponentScores(stage, opponentGotIt);
      setFeedback(randomWrongTaunt(opponentName));
    }

    // Mark this phrase as played immediately
    if (phrase) {
      markPhraseAsPlayed(phrase.id);
    }

    // Check if this is truly the last question in the stage
    const currentPositionInStage = current - currentStageStart + 1;
    const maxQuestionsInStage = Math.min(STAGE_SIZE, phrases.length - currentStageStart);
    const isLastInStage = currentPositionInStage >= maxQuestionsInStage;
    const isLastOverall = current >= phrases.length - 1;

    console.log("🔍 useQuizHandlers: Stage completion check:", {
      current,
      currentStageStart,
      currentPositionInStage,
      maxQuestionsInStage,
      isLastInStage,
      isLastOverall,
      profileHearts: profile?.hearts,
      isCorrect: optionOrder[idx].isCorrect
    });

    // If game over (no more hearts), auto end stage
    if (profile && profile.hearts === 1 && !optionOrder[idx].isCorrect) {
      console.log("💔 useQuizHandlers: Game over - no more hearts");
      setShowAnswer(false);
      setTimeout(() => {
        setStageCompleted(true);
      }, 700); // Short delay to show last answer
      return;
    }

    // Only complete stage if this is truly the last question
    if (isLastInStage || isLastOverall) {
      console.log("🏁 useQuizHandlers: Completing stage - last question reached");
      setStageCompleted(true);
    }
  }, [selected, setSelected, setShowAnswer, getElapsed, optionOrder, addXP, setRoundCorrect, setScore, updateStageScores, stage, setFeedback, phrase, markPhraseAsLearned, markPhraseAsPlayed, profile, loseHeart, updateOpponentScores, opponentName, current, currentStageStart, phrases.length, setStageCompleted]);

  const handleNext = useCallback(() => {
    // Only allow next question if not at end of stage
    const currentPositionInStage = current - currentStageStart + 1;
    const maxQuestionsInStage = Math.min(STAGE_SIZE, phrases.length - currentStageStart);
    const isLastInStage = currentPositionInStage >= maxQuestionsInStage;

    console.log("➡️ useQuizHandlers: Next button clicked:", {
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

  const handleAdvanceStage = useCallback(() => {
    console.log("🚀 useQuizHandlers: handleAdvanceStage called", { roundCorrect, stage });
    
    // Assess if user passed (3+ correct)
    if (roundCorrect >= 3) {
      console.log("✅ useQuizHandlers: User passed, advancing to next stage");
      advanceStreak();
      // Skip stage preview, go directly to next stage
      setShowStagePreview(false);
      setStage((s) => s + 1);
      setStageCompleted(false);
      // FIXED: Use STAGE_SIZE for consistency with stage management
      setCurrent((stage + 1) * STAGE_SIZE);
      resetQuestionState();
      refreshProfile();
    } else {
      console.log("❌ useQuizHandlers: User did not pass, restarting stage");
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
  }, [roundCorrect, advanceStreak, setShowStagePreview, setStage, setStageCompleted, setCurrent, stage, resetQuestionState, refreshProfile, resetHearts, setFeedback, setRoundCorrect]);

  const handleStartStage = useCallback(() => {
    // Called when user presses "Start Stage"
    console.log("▶️ useQuizHandlers: handleStartStage called");
    setShowStagePreview(false);
    resetQuestionState();
  }, [setShowStagePreview, resetQuestionState]);

  const handlePlayAudio = useCallback(() => {
    if (!phrase) return;
    
    const ttsText = phrase.pronunciation || phrase.phrase_text;
    const voiceSettings = getVoiceSettings(getCurrentVoice(current));
    
    // For mobile devices, try to resume audio context first
    if (isMobileDevice()) {
      try {
        const resumeAudioContext = async () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          if (audioContext.state === 'suspended') {
            await audioContext.resume();
          }
        };
        resumeAudioContext().catch(() => {
          console.log('Could not resume audio context');
        });
      } catch (error) {
        console.log('AudioContext not available');
      }
    }
    
    import("@/lib/elevenlabsTtsClient").then(({ playWithElevenLabsTTS, playWithBrowserTTS }) =>
      playWithElevenLabsTTS({ 
        text: ttsText, 
        voiceId: getCurrentVoice(current),
        ...voiceSettings,
        useSpeakerBoost: true
      }).catch(() => {
        // Enhanced mobile-friendly fallback
        console.log('Falling back to browser TTS for mobile');
        playWithBrowserTTS(ttsText, phrase.language || "en");
      })
    );
  }, [phrase, current]);

  return {
    handleSelect,
    handleNext,
    handleAdvanceStage,
    handleStartStage,
    handlePlayAudio,
  };
}
