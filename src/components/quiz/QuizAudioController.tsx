import React, { useMemo } from "react";
import { useAudioPlayback } from "@/hooks/useAudioPlayback";
import { getNativeVoiceForLanguage } from "@/utils/quizHelpers";
import { Phrase, State } from "@/types/quiz";

interface QuizAudioControllerProps {
  phrase: Phrase | undefined;
  current: number;
  state: State;
  showAnswer: boolean;
  showStagePreview: boolean;
  stageCompleted: boolean;
}

const QuizAudioController: React.FC<QuizAudioControllerProps> = ({
  phrase,
  current,
  state,
  showAnswer,
  showStagePreview,
  stageCompleted,
}) => {
  // Memoize audio playback dependencies to prevent re-renders
  const audioPlaybackDeps = useMemo(() => 
    [current, state, showStagePreview, showAnswer, stageCompleted],
    [current, state, showStagePreview, showAnswer, stageCompleted]
  );

  // Audio auto-play with duplicate guard - using language-specific voice
  // Pass both phrase_text and pronunciation for optimal text selection
  useAudioPlayback(
    audioPlaybackDeps,
    phrase?.phrase_text || "",
    phrase?.pronunciation,
    phrase?.language || "en",
    getNativeVoiceForLanguage(phrase?.language || "en"),
    !!(phrase && state === "quiz" && !showAnswer && !showStagePreview && !stageCompleted)
  );

  console.log('🎮 QuizAudioController Audio Debug:', {
    phraseLanguage: phrase?.language,
    phraseText: phrase?.phrase_text?.slice(0, 20),
    pronunciationText: phrase?.pronunciation?.slice(0, 20),
    selectedVoice: getNativeVoiceForLanguage(phrase?.language || "en"),
    shouldPlay: !!(phrase && state === "quiz" && !showAnswer && !showStagePreview && !stageCompleted)
  });

  return null; // This is a controller component, renders nothing
};

export default QuizAudioController;