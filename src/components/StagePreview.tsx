
import React from "react";
import { Star, Zap } from "lucide-react";
import MascotAvatar from "./MascotAvatar";

type StagePreviewProps = {
  stage: number;
  stageScore: number;
  opponentName: string;
  opponentEmoji: string;
  opponentScore: number;
  onStartStage: () => void;
  profile: any; // Player profile with hearts, xp, streak
};

const pastelGradients = [
  "from-[#FFEFBA] via-[#FFF] to-[#B1FFCE]",  // yellow-green
  "from-[#F8D3FF] via-[#FFA3CF] to-[#F9FFC2]", // pink-yellow
  "from-[#FAFFD1] via-[#A1FFCE] to-[#FAFFD1]", // light green
];

const getStageColor = (stage: number) =>
  pastelGradients[stage % pastelGradients.length];

const infoCard =
  "flex flex-col items-center px-6 py-4 rounded-2xl shadow-md bg-white/60 border-2 font-bold";

const StagePreview: React.FC<StagePreviewProps> = ({
  stage,
  stageScore,
  opponentName,
  opponentEmoji,
  opponentScore,
  onStartStage,
  profile,
}) => {
  const isFirstStage = stage === 0;
  return (
    <div className={`max-w-xl w-full mx-auto rounded-[40px] shadow-2xl p-0 relative animate-scale-in bg-gradient-to-br ${getStageColor(stage)} h-[500px] flex flex-col justify-between`}>
      {/* Removed decorative dots for cleaner look */}

      <div className="flex flex-col items-center pt-8 pb-6 px-6 flex-1 justify-between">
        {/* Smaller mascot avatar */}
        <div className="bg-yellow-300 rounded-full flex items-center justify-center shadow-xl" style={{ width: 72, height: 72 }}>
          <MascotAvatar size={60} className="" />
        </div>
        
        {/* Compact Stage Header */}
        <div className="text-4xl font-black tracking-tight flex items-center gap-3 text-black font-sans animate-fade-in"
            style={{ letterSpacing: "-0.03em" }}>
          <span className="drop-shadow glow text-3xl">{opponentEmoji}</span>
          <span>
            <span className="text-2xl block font-medium tracking-tight text-black/80 leading-none mb-1">
              STAGE
            </span>
            <span className="text-4xl leading-tight font-extrabold tracking-tighter block">
              {stage + 1}
            </span>
          </span>
        </div>

        {/* Compact Score Cards */}
        <div className="w-full flex items-center justify-center gap-6">
          {/* User Score */}
          <div className={`${infoCard} border-yellow-300 shadow-yellow-200/40`}>
            <span className="font-extrabold text-2xl text-yellow-600 flex items-center gap-1">
              <Zap className="text-yellow-500 w-4 h-4" />
              {stageScore ?? 0}
            </span>
            <span className="text-sm text-yellow-700 font-bold">Your Last</span>
          </div>
          <div className="flex items-center text-xl font-black px-2 py-1 text-gray-600">vs</div>
          {/* Opponent Score */}
          <div className={`${infoCard} border-pink-300 shadow-pink-200/40`}>
            <span className="font-extrabold text-2xl text-pink-600 flex items-center gap-1">
              <Star className="text-pink-400 w-4 h-4" />
              {opponentScore ?? 0}
            </span>
            <span className="text-sm text-pink-700 font-bold">{opponentName}</span>
          </div>
        </div>

        {/* Simplified heading */}
        <div className="text-lg font-black text-black text-center animate-fade-in">
          {isFirstStage ? "Ready to start? 🎉" : "Beat your last score! 🦸‍♂️"}
        </div>
        
        {/* Button */}
        <button
          className="
            text-lg px-12 py-4 rounded-full font-extrabold 
            bg-gradient-to-r from-yellow-400 via-pink-400 to-yellow-300 
            shadow-lg text-white drop-shadow-lg hover:scale-105 transition-all
            border-none animate-bounce focus:outline-none focus:ring-4 focus:ring-pink-300
          "
          onClick={onStartStage}
        >
          Start Stage!
        </button>
      </div>
    </div>
  );
};

export default StagePreview;
