
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
  const isCorrect = selected !== null && optionOrder[selected]?.isCorrect;

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
      <CardContent className="space-y-3">
        {/* Compact Progress and Timer Section */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <QuizProgress stageScore={stageScore} maxScore={maxStageScore} />
          </div>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-200">
            ⏱️ {timer}s
          </span>
        </div>

        {/* Compact Feedback Section */}
        {feedback && (
          <div className="space-y-2">
            {/* Main Feedback Message - More Compact */}
            <div
              className={cn(
                "p-3 rounded-lg border text-center transition-all duration-300",
                isCorrect
                  ? "bg-green-50 border-green-200 text-green-800"
                  : "bg-blue-50 border-blue-200 text-blue-800"
              )}
            >
              <div className="text-lg font-semibold mb-1">
                {isCorrect ? "🎉 Correct!" : "💭 Not quite!"}
              </div>
              <div className="text-sm">
                {feedback}
              </div>
            </div>

            {/* Compact Phrase Notes */}
            {showAnswer && phrase?.notes && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                <div className="text-center">
                  <div className="text-xs font-medium text-yellow-800 mb-1">
                    💡 Did you know?
                  </div>
                  <div className="text-xs text-yellow-700">
                    {phrase.notes}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Multiple Choice Options */}
        <div>
          {!feedback && (
            <div className="text-center text-gray-600 text-sm font-medium mb-3">
              Choose the correct meaning:
            </div>
          )}
          <MultipleChoiceOptions
            options={optionOrder}
            selected={selected}
            showAnswer={showAnswer}
            onSelect={onSelect}
          />
        </div>
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
