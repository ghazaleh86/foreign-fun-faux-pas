import React from "react";

type TimerProgressProps = {
  timer: number;
  maxTime: number;
};

const TimerProgress: React.FC<TimerProgressProps> = ({ timer, maxTime }) => {
  const progressPercentage = Math.min(100, (timer / maxTime) * 100);
  
  return (
    <div className="mb-3 w-full h-3 bg-gray-200 rounded-lg overflow-hidden shadow-inner">
      <div
        className="h-full bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-1000 ease-linear"
        style={{
          width: `${progressPercentage.toFixed(1)}%`
        }}
      />
    </div>
  );
};

export default TimerProgress;