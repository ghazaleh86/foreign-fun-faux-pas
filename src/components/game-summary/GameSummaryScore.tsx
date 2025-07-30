
import React from "react";

type GameSummaryScoreProps = {
  score: number;
  total: number;
  percent: number;
  playerTotal: number;
};

const GameSummaryScore: React.FC<GameSummaryScoreProps> = ({ score, total, percent, playerTotal }) => {
  // Ensure we have valid numbers, fallback to 0 if NaN or undefined
  const safeScore = isNaN(score) || score === undefined ? 0 : score;
  const safeTotal = isNaN(total) || total === undefined ? 0 : total;
  const safePercent = isNaN(percent) || percent === undefined ? 0 : percent;

  return (
    <div className="relative z-10 space-y-4">
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6 border-2 border-pink-200">
        <div className="text-6xl font-black mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 bg-clip-text text-transparent animate-pop">
          {safeScore} / {safeTotal}
        </div>
        <div className="text-xl font-bold text-gray-700">Correct Answers: {safePercent}%</div>
        <div className="text-sm text-gray-600 mt-3">
          <div>• Each correct answer = 1 point</div>
          <div>• You got {safeScore} correct answers out of {safeTotal} questions</div>
        </div>
      </div>
    </div>
  );
};

export default GameSummaryScore;
