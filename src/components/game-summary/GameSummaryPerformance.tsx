
import React from "react";
import { Trophy, Star, Medal, Crown } from "lucide-react";

type GameSummaryPerformanceProps = {
  percent: number;
};

const GameSummaryPerformance: React.FC<GameSummaryPerformanceProps> = ({ percent }) => {
  const getPerformanceData = () => {
    if (percent >= 90) return { icon: Crown, message: "Outstanding performance!", color: "text-yellow-600", bgColor: "bg-yellow-50", borderColor: "border-yellow-200" };
    if (percent >= 80) return { icon: Trophy, message: "Excellent work!", color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" };
    if (percent >= 70) return { icon: Medal, message: "Great job!", color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" };
    if (percent >= 60) return { icon: Star, message: "Good effort!", color: "text-purple-600", bgColor: "bg-purple-50", borderColor: "border-purple-200" };
    return { icon: Star, message: "Keep practicing!", color: "text-gray-600", bgColor: "bg-gray-50", borderColor: "border-gray-200" };
  };

  const performance = getPerformanceData();
  const PerformanceIcon = performance.icon;

  return (
    <div className="relative z-10 space-y-4">
      <h1 className="text-3xl font-black tracking-tight text-gray-900">
        🎉 GAME COMPLETE!
      </h1>
      
      <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full font-bold text-lg shadow-lg border-2 ${performance.bgColor} ${performance.color} ${performance.borderColor}`}>
        <PerformanceIcon className="w-6 h-6" />
        {performance.message}
      </div>
    </div>
  );
};

export default GameSummaryPerformance;
