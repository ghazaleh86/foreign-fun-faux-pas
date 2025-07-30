
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
      <div>
        Stage {stage + 1} Correct:{" "}
        <span className="font-bold">{stageScore}</span>
      </div>
    </CardFooter>
  );
};

export default QuizFooter;
