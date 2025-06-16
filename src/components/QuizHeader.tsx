
import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Volume2 } from "lucide-react";
import { Phrase } from "@/types/quiz";
import { languageToFlag } from "@/utils/languageToFlag";

type QuizHeaderProps = {
  phrase: Phrase;
  stage: number;
  totalStages: number;
  current: number;
  stageSize: number;
  phrasesLength: number;
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
  opponentEmoji,
  onPlayAudio,
}) => {
  return (
    <CardHeader>
      <CardTitle className="flex flex-col items-center justify-center gap-2 text-gradient bg-gradient-to-r from-pink-500 via-fuchsia-500 to-yellow-400 bg-clip-text text-transparent text-2xl font-bold text-center">
        <div className="flex items-center justify-center gap-2 w-full">
          <span className="text-2xl">{opponentEmoji}</span>
          <span>
            Stage {stage + 1} of {totalStages} – Phrase {current - (stage * stageSize) + 1} of {Math.min(stageSize, phrasesLength - (stage * stageSize))}
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
              {phrase.pronunciation ? <span className="italic">{phrase.pronunciation}</span> : phrase.phrase_text}
            </span>
          </div>
          <div className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
            <span className="text-xl" title={phrase.language}>
              {languageToFlag(phrase.language)}
            </span>
            <span className="font-medium">{phrase.language}</span>
          </div>
          <button
            className="mt-4 px-6 py-3 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 font-medium text-base rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2"
            onClick={onPlayAudio}
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
      )}
    </CardHeader>
  );
};

export default QuizHeader;
