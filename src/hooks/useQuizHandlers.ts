
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

    // If game over (no more hearts), auto end round
    if (profile && profile.hearts === 1 && !optionOrder[idx].isCorrect) {
      setShowAnswer(false);
      setTimeout(() => {
        setStageCompleted(true);
      }, 700); // Short delay to show last answer
      return;
    }

    // Detect if this was the last question in the stage
    const isLastInStage =
      (current - currentStageStart + 1) === Math.min(STAGE_SIZE, phrases.length - currentStageStart);

    if (isLastInStage || current === phrases.length - 1) {
      setStageCompleted(true);
    }
  }, [selected, setSelected, setShowAnswer, getElapsed, optionOrder, addXP, setRoundCorrect, setScore, updateStageScores, stage, setFeedback, phrase, markPhraseAsLearned, markPhraseAsPlayed, profile, loseHeart, updateOpponentScores, opponentName, current, currentStageStart, phrases.length, setStageCompleted]);

  const handleNext = useCallback(() => {
    // Only allow next question if not at end of stage
    const isLastInStage =
      (current - currentStageStart + 1) === Math.min(STAGE_SIZE, phrases.length - currentStageStart);

    if (!isLastInStage && current < phrases.length - 1) {
      console.log("➡️ QuizLogic: Moving to next question");
      setCurrent((c) => c + 1);
      resetQuestionState();
    }
  }, [current, currentStageStart, phrases.length, setCurrent, resetQuestionState]);

  const handleAdvanceStage = useCallback(() => {
    // Assess if user passed (3+ correct)
    if (roundCorrect >= 3) {
      advanceStreak();
      // Skip stage preview, go directly to next stage
      setShowStagePreview(false);
      setStage((s) => s + 1);
      setStageCompleted(false);
      setCurrent((stage + 1) * ROUND_SIZE);
      resetQuestionState();
      refreshProfile();
    } else {
      // Did not pass: refill hearts, restart round, reset corrects (using same questions)
      resetHearts();
      setStageCompleted(false);
      resetQuestionState();
      setFeedback("You need at least 3 correct to pass. Try again!");
      setCurrent(stage * ROUND_SIZE);
      setRoundCorrect(0);
      refreshProfile();
    }
  }, [roundCorrect, advanceStreak, setShowStagePreview, setStage, setStageCompleted, setCurrent, stage, resetQuestionState, refreshProfile, resetHearts, setFeedback, setRoundCorrect]);

  const handleStartStage = useCallback(() => {
    // Called when user presses "Start Stage"
    setShowStagePreview(false);
    resetQuestionState();
  }, [setShowStagePreview, resetQuestionState]);

  const handlePlayAudio = useCallback(() => {
    if (!phrase) return;
    
    const ttsText = phrase.pronunciation || phrase.phrase_text;
    const voiceSettings = getVoiceSettings(getCurrentVoice(current));
    
    import("@/lib/elevenlabsTtsClient").then(({ playWithElevenLabsTTS }) =>
      playWithElevenLabsTTS({ 
        text: ttsText, 
        voiceId: getCurrentVoice(current),
        ...voiceSettings,
        useSpeakerBoost: true
      }).catch(() => {
        // Enhanced fallback
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel();
          const u = new window.SpeechSynthesisUtterance(ttsText);
          u.lang = phrase.language || "en";
          u.rate = 0.9; // Slightly slower
          u.pitch = 1.0; // Natural pitch
          u.volume = 0.9;
          
          // Try to use a more natural voice
          const voices = window.speechSynthesis.getVoices();
          const naturalVoices = voices.filter(voice => 
            voice.lang.startsWith(phrase.language || "en") && 
            (voice.name.includes('Neural') || voice.name.includes('Premium'))
          );
          
          if (naturalVoices.length > 0) {
            u.voice = naturalVoices[0];
          }
          
          window.speechSynthesis.speak(u);
        }
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
