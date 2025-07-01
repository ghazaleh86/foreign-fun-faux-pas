
import React from "react";

type QuizProgressProps = {
  stageScore: number;
  maxScore: number;
};

const QuizProgress: React.FC<QuizProgressProps> = ({ stageScore, maxScore }) => {
  return (
    <div className="mb-3 w-full h-3 bg-pink-100 rounded-lg overflow-hidden shadow-inner">
      <div
        className="h-full bg-gradient-to-r from-green-400 to-pink-300 transition-all"
        style={{
          width: ((stageScore / maxScore) * 100).toFixed(1) + "%"
        }}
      />
    </div>
  );
};

export default QuizProgress;
