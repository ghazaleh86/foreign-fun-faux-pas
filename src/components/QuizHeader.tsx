
import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Phrase } from "@/types/quiz";
import { languageToFlag } from "@/utils/languageToFlag";
import { LanguageToggle } from "./LanguageToggle";

type QuizHeaderProps = {
  phrase: Phrase;
  stage: number;
  totalStages: number;
  current: number;
  stageSize: number;
  phrasesLength: number;
  currentStageStart: number;
  opponentEmoji: string;
  onPlayAudio: () => void;
};

const QuizHeader: React.FC<QuizHeaderProps> = ({
  phrase,
  stage,
  totalStages,
  current,
  stageSize,
  phrasesLength,
  currentStageStart,
  opponentEmoji,
  onPlayAudio,
}) => {
  // Calculate stage-relative position with bounds checking
  const stagePosition = Math.max(1, Math.min(current - currentStageStart + 1, stageSize));
  const stageQuestionsCount = Math.max(1, Math.min(stageSize, phrasesLength - currentStageStart));
  
  console.log("🎯 QuizHeader: Phrase position calculation:", {
    current,
    currentStageStart,
    stagePosition,
    stageQuestionsCount,
    stage: stage + 1,
    totalStages
  });
  return (
    <CardHeader>
      {/* Language Toggle - positioned at top right */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageToggle />
      </div>
      
      <CardTitle className="flex flex-col items-center justify-center gap-2 text-gradient bg-gradient-to-r from-pink-500 via-fuchsia-500 to-yellow-400 bg-clip-text text-transparent text-2xl font-bold text-center">
        <div className="flex items-center justify-center gap-2 w-full">
          <span className="text-2xl">{opponentEmoji}</span>
          <span>
            Stage {stage + 1} of {totalStages} – Phrase {stagePosition} of {stageQuestionsCount}
          </span>
        </div>
      </CardTitle>
      {phrase && (
        <div className="flex flex-col items-center justify-center mt-1">
          <div className="flex gap-1 mb-2 scale-90">
            <div className="h-2 w-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:0.1s]" />
            <div className="h-3 w-2 rounded-full bg-pink-400 animate-bounce [animation-delay:0.2s]" />
            <div className="h-4 w-2 rounded-full bg-fuchsia-400 animate-bounce [animation-delay:0.3s]" />
          </div>
          <div className="text-lg font-semibold tracking-wide mb-0">
            <span>
              <span className="italic">{phrase.phrase_text}</span>
            </span>
          </div>
          <div className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
            <span className="text-xl font-emoji" title={phrase.language} style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif' }}>
              {languageToFlag(phrase.language)}
            </span>
            <span className="font-medium">{phrase.language}</span>
          </div>
        </div>
      )}
    </CardHeader>
  );
};

export default QuizHeader;
