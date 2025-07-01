
import React from "react";

type QuizProgressProps = {
  stageScore: number;
  maxScore: number;
};

const QuizProgress: React.FC<QuizProgressProps> = ({ stageScore, maxScore }) => {
  const progressPercentage = ((stageScore / maxScore) * 100);
  
  return (
    <div className="mb-6 w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-headspace-neutral-600">Progress</span>
        <span className="text-sm font-semibold text-headspace-orange">{stageScore}/{maxScore}</span>
      </div>
      <div className="w-full h-3 bg-headspace-neutral-100 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-headspace-orange to-headspace-orange-light transition-all duration-500 ease-out rounded-full shadow-sm"
          style={{ width: `${progressPercentage.toFixed(1)}%` }}
        />
      </div>
    </div>
  );
};

export default QuizProgress;
