import React, { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  getLevelFromStars,
  getLootItem,
  getRewardsState,
  setActiveHotbarSlot,
  type HotbarSlot,
} from "@/utils/gameRewards";

type GameHudProps = {
  hearts: number;
  maxHearts: number;
  totalStars: number;
  stage: number;
  totalStages: number;
  className?: string;
};

function HeartsRow({ hearts, maxHearts }: { hearts: number; maxHearts: number }) {
  const safeMax = Math.max(1, maxHearts);
  const safeHearts = Math.max(0, Math.min(hearts, safeMax));

  return (
    <div className="flex items-center gap-1" aria-label={`Hearts: ${safeHearts} of ${safeMax}`}>
      {Array.from({ length: safeMax }).map((_, i) => (
        <span key={i} className="text-base leading-none select-none">
          {i < safeHearts ? "❤️" : "🖤"}
        </span>
      ))}
    </div>
  );
}

function Hotbar({
  hotbar,
  activeSlot,
}: {
  hotbar: HotbarSlot[];
  activeSlot: number;
}) {
  return (
    <div className="hotbar game-panel-inset px-2 py-2 flex items-center gap-2">
      {hotbar.map((slot, idx) => {
        const isActive = idx === activeSlot;
        const item = slot ? getLootItem(slot.id) : null;
        return (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveHotbarSlot(idx)}
            className={cn(
              "hotbar-slot w-10 h-10 md:w-11 md:h-11 flex items-center justify-center relative",
              isActive && "hotbar-slot--active"
            )}
            aria-label={item ? `${item.name} x${slot?.count ?? 0}` : "Empty slot"}
            title={item ? `${item.name} x${slot?.count ?? 0}` : "Empty"}
          >
            <span className="text-lg select-none">{item?.emoji ?? ""}</span>
            {slot && slot.count > 1 && (
              <span className="absolute bottom-0 right-0 text-[10px] font-pixel bg-black/60 text-white px-1 leading-none">
                {slot.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

const GameHud: React.FC<GameHudProps> = ({
  hearts,
  maxHearts,
  totalStars,
  stage,
  totalStages,
  className,
}) => {
  const [rewards, setRewards] = useState(() => getRewardsState());

  useEffect(() => {
    const sync = () => setRewards(getRewardsState());
    window.addEventListener("game-rewards-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("game-rewards-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const level = useMemo(() => getLevelFromStars(totalStars), [totalStars]);
  const stageLabel = `Stage ${stage + 1}/${totalStages}`;

  return (
    <div className={cn("w-full", className)}>
      {/* Top HUD */}
      <div className="game-panel game-panel-inset px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <HeartsRow hearts={hearts} maxHearts={maxHearts} />
          <div className="font-pixel text-xs leading-none uppercase tracking-wide">
            ⭐ {totalStars}
          </div>
          <div className="font-pixel text-xs leading-none uppercase tracking-wide">
            🟦 {rewards.studs}
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 min-w-[140px]">
          <div className="font-pixel text-[10px] uppercase tracking-wide text-black/80">
            {stageLabel} · LV {level.level}
          </div>
          <div className="xp-bar w-full h-3 overflow-hidden">
            <div
              className="xp-bar__fill h-full"
              style={{ width: `${Math.round(level.ratio * 100)}%` }}
            />
          </div>
          <div className="font-pixel text-[10px] uppercase tracking-wide text-black/70">
            XP {level.progress}/{level.needed}
          </div>
        </div>
      </div>

      {/* Bottom hotbar */}
      <div className="mt-3 flex justify-center">
        <Hotbar hotbar={rewards.hotbar} activeSlot={rewards.activeSlot} />
      </div>
    </div>
  );
};

export default GameHud;

