
import React from "react";
import { calculateStars, getStarDisplay } from "@/utils/starSystem";

type GameSummaryScoreProps = {
  score: number;
  total: number;
  percent: number;
  playerTotal: number;
  totalStarsEarned: number;
};

const GameSummaryScore: React.FC<GameSummaryScoreProps> = ({ score, total, percent, playerTotal, totalStarsEarned }) => {
  // Ensure we have valid numbers, fallback to 0 if NaN or undefined
  const safeScore = isNaN(score) || score === undefined ? 0 : score;
  const safeTotal = isNaN(total) || total === undefined ? 0 : total;
  const safePercent = isNaN(percent) || percent === undefined ? 0 : percent;
  const safeStarsEarned = isNaN(totalStarsEarned) || totalStarsEarned === undefined ? 0 : totalStarsEarned;

  return (
    <div className="relative z-10 space-y-4">
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6 border-2 border-pink-200">
        <div className="text-6xl font-black mb-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 bg-clip-text text-transparent animate-pop">
          {safeStarsEarned} ⭐
        </div>
        <div className="text-xl font-bold text-gray-700">Stars Earned This Game!</div>
        <div className="text-lg text-gray-600 mt-2">
          {safeScore} / {safeTotal} correct ({safePercent}%)
        </div>
      </div>
    </div>
  );
};

export default GameSummaryScore;
