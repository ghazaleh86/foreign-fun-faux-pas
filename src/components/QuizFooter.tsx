
import React from "react";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type QuizFooterProps = {
  stage: number;
  stageScore: number;
  showNextButton: boolean;
  onNext: () => void;
};

const QuizFooter: React.FC<QuizFooterProps> = ({
  stage,
  stageScore,
  showNextButton,
  onNext,
}) => {
  return (
    <CardFooter className="flex justify-between items-center">
      <div>
        Stage {stage + 1} Score:{" "}
        <span className="font-bold">{stageScore}</span>
      </div>
      {showNextButton && (
        <Button
          onClick={onNext}
          variant="default"
          className="animate-bounce"
        >
          Next
        </Button>
      )}
    </CardFooter>
  );
};

export default QuizFooter;
