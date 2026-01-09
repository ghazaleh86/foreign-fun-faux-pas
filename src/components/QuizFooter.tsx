
import React from "react";
import { CardFooter } from "@/components/ui/card";

type QuizFooterProps = {
  stage: number;
  stageScore: number;
  showNextButton: boolean;
  onNext: () => void;
};

const QuizFooter: React.FC<QuizFooterProps> = ({
  stage,
  stageScore,
}) => {
  return (
    <CardFooter className="flex justify-center items-center">
      <div className="font-pixel text-[10px] uppercase tracking-wide text-black/70">
        Stage {stage + 1} Correct: <span className="text-black">{stageScore}</span>
      </div>
    </CardFooter>
  );
};

export default QuizFooter;
