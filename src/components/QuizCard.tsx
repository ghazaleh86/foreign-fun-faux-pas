
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Phrase } from "@/types/quiz";
import { Option } from "@/components/MultipleChoiceOptions";
import QuizHeader from "./QuizHeader";
import QuizProgress from "./QuizProgress";
import QuizFooter from "./QuizFooter";
import MultipleChoiceOptions from "./MultipleChoiceOptions";
import { Button } from "@/components/ui/button";

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
        <div className="mb-4 text-sm font-bold text-fuchsia-700">
          Time: {timer}s
        </div>

        {/* Next button positioned below audio, before feedback */}
        {showNextButton && (
          <div className="mb-4 flex justify-center">
            <Button
              onClick={onNext}
              variant="default"
              className="animate-bounce"
            >
              Next
            </Button>
          </div>
        )}

        {/* Dedicated Feedback Section */}
        {feedback && (
          <div className="mb-6 p-4 rounded-lg border-2 border-dashed">
            <div
              className={cn(
                "text-center text-xl font-bold transition-all",
                selected !== null && optionOrder[selected].isCorrect
                  ? "text-green-700 bg-green-50/60 border-green-200 animate-pop"
                  : "text-amber-700 bg-amber-50/60 border-amber-200"
              )}
            >
              {feedback}
            </div>
            {showAnswer && phrase?.notes && (
              <div className="text-sm text-muted-foreground mt-3 text-center">
                <span className="inline-block rounded-full px-3 py-2 bg-yellow-100/80 font-mono border border-yellow-200">
                  {phrase.notes}
                </span>
              </div>
            )}
          </div>
        )}

        <MultipleChoiceOptions
          options={optionOrder}
          selected={selected}
          showAnswer={showAnswer}
          onSelect={onSelect}
        />
      </CardContent>
      <QuizFooter
        stage={stage}
        stageScore={stageScore}
        showNextButton={false}
        onNext={onNext}
      />
    </Card>
  );
};

export default QuizCard;
