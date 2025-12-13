import React from "react";

type TimerProgressProps = {
  timer: number;
  maxTime: number;
};

const TimerProgress: React.FC<TimerProgressProps> = ({ timer, maxTime }) => {
  const progressPercentage = Math.min(100, (timer / maxTime) * 100);
  
  return (
    <div className="mb-3 w-full h-3 xp-bar overflow-hidden">
      <div
        className="h-full xp-bar__fill transition-all duration-1000 ease-linear"
        style={{
          width: `${progressPercentage.toFixed(1)}%`
        }}
      />
    </div>
  );
};

export default TimerProgress;