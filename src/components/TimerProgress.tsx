import React from "react";

type TimerProgressProps = {
  timer: number;
  maxTime: number;
};

const TimerProgress: React.FC<TimerProgressProps> = ({ timer, maxTime }) => {
  const timeRemaining = Math.max(0, maxTime - timer);
  const progressPercentage = ((timeRemaining / maxTime) * 100);
  
  return (
    <div className="mb-3 w-full h-3 bg-red-100 rounded-lg overflow-hidden shadow-inner">
      <div
        className="h-full bg-gradient-to-r from-red-400 to-orange-300 transition-all duration-1000 ease-linear"
        style={{
          width: `${progressPercentage.toFixed(1)}%`
        }}
      />
    </div>
  );
};

export default TimerProgress;