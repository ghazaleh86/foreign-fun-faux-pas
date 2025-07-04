
import { useAnswerSelection } from "./useAnswerSelection";
import { useNavigation } from "./useNavigation";
import { useStageProgression } from "./useStageProgression";
import { useAudioPlaybackControls } from "./useAudioPlaybackControls";
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
  setState: (state: "loading" | "quiz" | "finished") => void;
}

export function useQuizHandlers(props: UseQuizHandlersProps) {
  const { handleSelect } = useAnswerSelection({
    selected: props.selected,
    setSelected: props.setSelected,
    setShowAnswer: props.setShowAnswer,
    getElapsed: props.getElapsed,
    optionOrder: props.optionOrder,
    addXP: props.addXP,
    setRoundCorrect: props.setRoundCorrect,
    setScore: props.setScore,
    updateStageScores: props.updateStageScores,
    stage: props.stage,
    setFeedback: props.setFeedback,
    phrase: props.phrase,
    markPhraseAsLearned: props.markPhraseAsLearned,
    markPhraseAsPlayed: props.markPhraseAsPlayed,
    profile: props.profile,
    loseHeart: props.loseHeart,
    updateOpponentScores: props.updateOpponentScores,
    opponentName: props.opponentName,
    current: props.current,
    currentStageStart: props.currentStageStart,
    phrases: props.phrases,
    setStageCompleted: props.setStageCompleted,
  });

  const { handleNext } = useNavigation({
    current: props.current,
    currentStageStart: props.currentStageStart,
    phrases: props.phrases,
    setCurrent: props.setCurrent,
    resetQuestionState: props.resetQuestionState,
  });

  const { handleAdvanceStage, handleStartStage } = useStageProgression({
    roundCorrect: props.roundCorrect,
    stage: props.stage,
    phrases: props.phrases,
    advanceStreak: props.advanceStreak,
    setShowStagePreview: props.setShowStagePreview,
    setStage: props.setStage,
    setStageCompleted: props.setStageCompleted,
    setCurrent: props.setCurrent,
    resetQuestionState: props.resetQuestionState,
    refreshProfile: props.refreshProfile,
    resetHearts: props.resetHearts,
    setFeedback: props.setFeedback,
    setRoundCorrect: props.setRoundCorrect,
    setState: props.setState,
  });

  const { handlePlayAudio } = useAudioPlaybackControls({
    phrase: props.phrase,
  });

  return {
    handleSelect,
    handleNext,
    handleAdvanceStage,
    handleStartStage,
    handlePlayAudio,
  };
}
