
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
import { Volume2 } from "lucide-react";

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

// Check if we're on a mobile device
function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

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
      <CardContent className="pb-6">
        <QuizProgress stageScore={stageScore} maxScore={maxStageScore} />
        <div className="mb-4 text-sm font-bold text-fuchsia-700">
          Time: {timer}s
        </div>

        {/* Mobile-friendly audio button - show prominently on mobile */}
        {isMobileDevice() && (
          <div className="mb-4 flex justify-center">
            <Button
              onClick={onPlayAudio}
              variant="outline"
              size="lg"
              className="px-6 py-3 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 font-semibold"
            >
              <Volume2 className="w-5 h-5 mr-2" />
              Play Audio
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

        {/* Next button positioned above options for mobile visibility */}
        {showNextButton && (
          <div className="mb-4 flex justify-center">
            <Button
              onClick={onNext}
              variant="primary-cta"
              size="lg"
              className="px-12 py-3"
            >
              Next
            </Button>
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
