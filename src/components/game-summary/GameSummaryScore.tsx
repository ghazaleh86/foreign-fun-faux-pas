import React from "react";

type GameSummaryScoreProps = {
  score: number;
  total: number;
  percent: number;
  playerTotal: number;
};

const GameSummaryScore: React.FC<GameSummaryScoreProps> = ({ score, total, percent, playerTotal }) => {
  return (
    <div className="relative z-10 space-y-4">
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6 border-2 border-pink-200">
        <div className="text-6xl font-black mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 bg-clip-text text-transparent animate-pop">
          {score} / {total}
        </div>
        <div className="text-xl font-bold text-gray-700">Questions Correct: {percent}%</div>
        <div className="text-lg font-semibold text-gray-600 mt-2">Battle Points: {playerTotal}</div>
      </div>
    </div>
  );
};

export default GameSummaryScore;