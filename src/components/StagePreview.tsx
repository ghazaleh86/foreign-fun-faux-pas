
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

const funColors = [
  "from-green-300 via-lime-200 to-yellow-300",
  "from-fuchsia-300 via-pink-200 to-yellow-200",
  "from-cyan-200 via-blue-200 to-green-200",
];

function getFunColor(stage: number) {
  return funColors[stage % funColors.length];
}

const StagePreview: React.FC<StagePreviewProps> = ({
  stage,
  stageScore,
  opponentName,
  opponentEmoji,
  opponentScore,
  onStartStage
}) => {
  const isFirstStage = stage === 0;
  return (
    <Card className={`max-w-xl w-full py-8 bg-gradient-to-br ${getFunColor(stage)} relative shadow-2xl`}>
      <CardHeader className="flex flex-col items-center gap-5">
        <MascotAvatar size={78} className="mb-2 animate-pop" />
        <div className="text-5xl font-extrabold flex items-center gap-2 mb-2">
          <span className="drop-shadow glow">{opponentEmoji}</span>
          <span className="text-black">STAGE {stage + 1}</span>
        </div>
        <div className="w-full flex items-center justify-center gap-8 my-5">
          {/* User Score */}
          <div className="flex flex-col items-center px-4 py-2 bg-white/60 rounded-xl shadow-md border-2 border-yellow-300">
            <span className="font-bold text-xl text-yellow-600 flex items-center gap-2">
              <Zap className="text-yellow-500" />
              {stageScore ?? 0}
            </span>
            <span className="text-xs mt-1 text-yellow-700 font-bold">Your Last Stage</span>
          </div>
          <div className="flex items-center text-lg font-black px-3 py-1">
            <span className="text-zinc-600">vs</span>
          </div>
          {/* Opponent Score */}
          <div className="flex flex-col items-center px-4 py-2 bg-white/60 rounded-xl shadow-md border-2 border-fuchsia-300">
            <span className="font-bold text-xl text-pink-600 flex items-center gap-2">
              <Star className="text-pink-500" />
              {opponentScore ?? 0}
            </span>
            <span className="text-xs mt-1 text-pink-700 font-bold">
              {opponentName}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="text-2xl mb-5 font-extrabold text-black animate-pop flex items-center gap-2">
          {isFirstStage
            ? (
              <>
                Ready to start your journey? <span role="img" aria-label="party">🎉</span>
              </>
            )
            : (
              <>
                Can you beat your last stage? <span role="img" aria-label="challenge">🦸‍♂️</span>
              </>
            )}
        </div>
        <Button
          size="lg"
          className="text-lg font-black px-10 py-5 bg-gradient-to-r from-yellow-400 to-pink-400 hover:from-yellow-500 hover:to-fuchsia-400 shadow-xl rounded-full border-none transition-all animate-bounce"
          onClick={onStartStage}
        >
          Start Stage!
        </Button>
      </CardContent>

      {/* Fun confetti dots */}
      <div className="absolute top-6 right-10 w-5 h-5 rounded-full bg-pink-300 animate-bounce [animation-delay:0.3s]" />
      <div className="absolute bottom-8 left-10 w-5 h-5 rounded-full bg-yellow-200 animate-pulse" />
      <div className="absolute bottom-5 right-12 w-4 h-4 rounded-full bg-lime-300 animate-bounce [animation-delay:0.15s]" />
    </Card>
  );
};

export default StagePreview;
