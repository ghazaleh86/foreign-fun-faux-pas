
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
      <CardContent>
        <div className="space-y-4">
          {/* Progress and Timer Section */}
          <div className="space-y-3">
            <QuizProgress stageScore={stageScore} maxScore={maxStageScore} />
            <div className="text-right">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-200">
                ⏱️ {timer}s
              </span>
            </div>
          </div>

          {/* Feedback Section - Only show when there's feedback */}
          {feedback && (
            <div className="space-y-4">
              {/* Main Feedback Message */}
              <div
                className={cn(
                  "p-6 rounded-xl border-2 text-center transition-all duration-300",
                  isCorrect
                    ? "bg-green-50 border-green-200 text-green-800 animate-pop"
                    : "bg-red-50 border-red-200 text-red-800 animate-shake-fast"
                )}
              >
                <div className="text-2xl font-bold mb-2">
                  {isCorrect ? "🎉 Correct!" : "❌ Wrong!"}
                </div>
                <div className="text-lg font-medium">
                  {feedback}
                </div>
              </div>

              {/* Phrase Notes - Only show when answer is revealed and notes exist */}
              {showAnswer && phrase?.notes && (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-yellow-800 mb-2">
                      💡 Did you know?
                    </div>
                    <div className="text-sm text-yellow-700 font-medium">
                      {phrase.notes}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Multiple Choice Options */}
          <div className="space-y-3">
            {!feedback && (
              <div className="text-center text-gray-600 font-medium mb-4">
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
