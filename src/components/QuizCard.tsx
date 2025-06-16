
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Phrase } from "@/types/quiz";
import { Option } from "@/components/MultipleChoiceOptions";
import QuizHeader from "./QuizHeader";
import QuizProgress from "./QuizProgress";
import QuizFooter from "./QuizFooter";
import MultipleChoiceOptions from "./MultipleChoiceOptions";

type QuizCardProps = {
  phrase: Phrase;
  stage: number;
  totalStages: number;
  current: number;
  stageSize: number;
  phrasesLength: number;
  opponentEmoji: string;
  timer: number;
  stageScore: number;
  maxStageScore: number;
  optionOrder: Option[];
  selected: number | null;
  showAnswer: boolean;
  feedback: string | null;
  showNextButton: boolean;
  onSelect: (idx: number) => void;
  onNext: () => void;
  onPlayAudio: () => void;
};

const QuizCard: React.FC<QuizCardProps> = ({
  phrase,
  stage,
  totalStages,
  current,
  stageSize,
  phrasesLength,
  opponentEmoji,
  timer,
  stageScore,
  maxStageScore,
  optionOrder,
  selected,
  showAnswer,
  feedback,
  showNextButton,
  onSelect,
  onNext,
  onPlayAudio,
}) => {
  return (
    <Card className="max-w-xl w-full shadow-2xl bg-white/90 border-2 border-pink-200/40">
      <QuizHeader
        phrase={phrase}
        stage={stage}
        totalStages={totalStages}
        current={current}
        stageSize={stageSize}
        phrasesLength={phrasesLength}
        opponentEmoji={opponentEmoji}
        onPlayAudio={onPlayAudio}
      />
      <CardContent>
        <QuizProgress stageScore={stageScore} maxScore={maxStageScore} />
        <div className="mb-2 text-sm font-bold text-fuchsia-700">
          Time: {timer}s
        </div>
        <MultipleChoiceOptions
          options={optionOrder}
          selected={selected}
          showAnswer={showAnswer}
          onSelect={onSelect}
        />
        {feedback && (
          <div
            className={cn(
              "text-center mt-5 text-lg font-semibold transition-all",
              selected !== null && optionOrder[selected].isCorrect
                ? "text-green-700 animate-pop"
                : "text-pink-700 animate-shake-fast"
            )}
          >
            {feedback}
          </div>
        )}
        {showAnswer && phrase?.notes && (
          <div className="text-xs text-muted-foreground mt-2 text-center">
            <span className="inline-block rounded-full px-3 py-1 bg-yellow-100/60 font-mono">{phrase.notes}</span>
          </div>
        )}
      </CardContent>
      <QuizFooter
        stage={stage}
        stageScore={stageScore}
        showNextButton={showNextButton}
        onNext={onNext}
      />
    </Card>
  );
};

export default QuizCard;
