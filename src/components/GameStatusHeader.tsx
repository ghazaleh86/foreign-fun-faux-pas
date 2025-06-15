
import React from "react";
import { Gem, Heart, SquareCheck } from "lucide-react";
import { cn } from "@/lib/utils";

// Profile props: includes hearts, xp, current_streak
type HeaderProps = {
  hearts: number;
  maxHearts: number;
  xp: number;
  currentStreak: number;
};

const GameStatusHeader: React.FC<HeaderProps> = ({
  hearts,
  maxHearts,
  xp,
  currentStreak,
}) => {
  return (
    <div className="flex items-center justify-between px-3 py-3 max-w-xl mx-auto">
      {/* Hearts */}
      <div className="flex items-center gap-1">
        {Array.from({ length: maxHearts }).map((_, i) => (
          <Heart
            key={i}
            className={cn(
              "w-6 h-6",
              i < hearts ? "text-pink-500 fill-pink-300" : "text-gray-300"
            )}
            fill={i < hearts ? "currentColor" : "none"}
          />
        ))}
      </div>
      {/* XP */}
      <div className="flex items-center gap-1 text-yellow-600 font-bold text-lg">
        <Gem className="w-5 h-5 mr-1 text-amber-400" />
        {xp} XP
      </div>
      {/* Streak */}
      <div className="flex items-center gap-1 text-orange-600 font-black text-lg">
        <SquareCheck className="w-5 h-5 mr-1 text-orange-400" />
        x{currentStreak} streak
      </div>
    </div>
  );
};

export default GameStatusHeader;

