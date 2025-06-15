
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
};

const pastelGradients = [
  "from-[#FFEFBA] via-[#FFF] to-[#B1FFCE]",  // yellow-green
  "from-[#F8D3FF] via-[#FFA3CF] to-[#F9FFC2]", // pink-yellow
  "from-[#FAFFD1] via-[#A1FFCE] to-[#FAFFD1]", // light green
];

const getStageColor = (stage: number) =>
  pastelGradients[stage % pastelGradients.length];

const infoCard =
  "flex flex-col items-center px-8 py-6 rounded-2xl shadow-md bg-white/60 border-2 font-bold";

const StagePreview: React.FC<StagePreviewProps> = ({
  stage,
  stageScore,
  opponentName,
  opponentEmoji,
  opponentScore,
  onStartStage,
}) => {
  const isFirstStage = stage === 0;
  return (
    <div className={`max-w-xl w-full mx-auto rounded-[40px] shadow-2xl p-0 relative animate-scale-in bg-gradient-to-br ${getStageColor(stage)} min-h-[600px]`}>
      {/* Decorative pastel dots for playful look */}
      <span className="absolute top-8 right-12 w-5 h-5 rounded-full bg-pink-200 opacity-90" />
      <span className="absolute bottom-12 left-10 w-5 h-5 rounded-full bg-yellow-200 opacity-90" />
      <span className="absolute bottom-8 right-14 w-4 h-4 rounded-full bg-lime-200 opacity-90" />

      <div className="flex flex-col items-center pt-12 pb-12 px-8">
        {/* Mascot avatar with yellow circle */}
        <div className="bg-yellow-300 rounded-full flex items-center justify-center shadow-xl mb-8" style={{ width: 96, height: 96 }}>
          <MascotAvatar size={80} className="" />
        </div>
        
        {/* Stage Header */}
        <div className="text-6xl mb-8 mt-4 font-black tracking-tight flex items-center gap-4 text-black font-sans animate-fade-in"
            style={{ letterSpacing: "-0.03em" }}>
          <span className="drop-shadow glow text-5xl">{opponentEmoji}</span>
          <span>
            <span className="text-3xl block font-medium tracking-tight text-black/80 leading-none mb-1">
              STAGE
            </span>
            <span className="text-6xl leading-tight font-extrabold tracking-tighter block">
              {stage + 1}
            </span>
          </span>
        </div>

        {/* Score Cards Comparison */}
        <div className="w-full flex items-center justify-center gap-8 my-10">
          {/* User Score */}
          <div className={`${infoCard} border-yellow-300 shadow-yellow-200/40`}>
            <span className="font-extrabold text-3xl text-yellow-600 flex items-center gap-2 mb-2">
              <Zap className="text-yellow-500" />
              {stageScore ?? 0}
            </span>
            <span className="text-base text-yellow-700 font-bold">Your Last Stage</span>
          </div>
          <div className="flex items-center text-2xl font-black px-3 py-2 text-gray-600">vs</div>
          {/* Opponent Score */}
          <div className={`${infoCard} border-pink-300 shadow-pink-200/40`}>
            <span className="font-extrabold text-3xl text-pink-600 flex items-center gap-2 mb-2">
              <Star className="text-pink-400" />
              {opponentScore ?? 0}
            </span>
            <span className="text-base text-pink-700 font-bold">{opponentName}</span>
          </div>
        </div>

        {/* Heading Text */}
        <div className="text-[1.4rem] md:text-xl font-black text-black text-center mt-6 mb-10 flex flex-col items-center gap-1 animate-fade-in px-4">
          {isFirstStage ? (
            <>
              Ready to start your journey? <span className="inline-block ml-1">🎉</span>
            </>
          ) : (
            <>
              Can you beat your last stage? <span className="inline-block ml-1">🦸‍♂️</span>
            </>
          )}
        </div>
        
        {/* Button */}
        <button
          className="
            text-xl mt-4 px-14 py-5 rounded-full font-extrabold 
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
