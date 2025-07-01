
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
    <Card className="max-w-xl w-full shadow-2xl bg-white/95 border border-headspace-neutral-200 rounded-3xl backdrop-blur-sm">
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
      <CardContent className="p-6">
        <QuizProgress stageScore={stageScore} maxScore={maxStageScore} />
        <div className="mb-6 text-sm font-medium text-headspace-neutral-600 bg-headspace-blue/10 px-4 py-2 rounded-2xl inline-block">
          ⏱️ {timer}s remaining
        </div>

        {/* Mobile-friendly audio button */}
        {isMobileDevice() && (
          <div className="mb-6 flex justify-center">
            <Button
              onClick={onPlayAudio}
              variant="gentle"
              size="lg"
              className="px-8 py-4 bg-headspace-blue/10 hover:bg-headspace-blue/20 border-headspace-blue/20 text-headspace-blue-dark font-medium shadow-lg"
            >
              <Volume2 className="w-5 h-5 mr-3" />
              Listen Again
            </Button>
          </div>
        )}

        {/* Next button positioned below audio, before feedback */}
        {showNextButton && (
          <div className="mb-6 flex justify-center">
            <Button
              onClick={onNext}
              variant="primary-cta"
              size="lg"
              className="px-12 shadow-xl"
            >
              Continue →
            </Button>
          </div>
        )}

        {/* Mindful Feedback Section */}
        {feedback && (
          <div className="mb-8 p-6 rounded-3xl border border-headspace-neutral-200 bg-gradient-to-br from-white to-headspace-neutral-50">
            <div
              className={cn(
                "text-center text-xl font-medium transition-all duration-500",
                selected !== null && optionOrder[selected].isCorrect
                  ? "text-headspace-green-dark animate-gentle-bounce"
                  : "text-headspace-orange-dark"
              )}
            >
              {feedback}
            </div>
            {showAnswer && phrase?.notes && (
              <div className="text-sm text-headspace-neutral-600 mt-4 text-center">
                <div className="inline-block rounded-2xl px-4 py-3 bg-headspace-yellow/20 border border-headspace-yellow/30 font-medium">
                  💡 {phrase.notes}
                </div>
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
