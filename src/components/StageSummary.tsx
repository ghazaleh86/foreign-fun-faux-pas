
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MascotAvatar from "./MascotAvatar";
import { Star, Zap } from "lucide-react";

type StageSummaryProps = {
  stage: number;
  stageScore: number;
  opponentName: string;
  opponentEmoji: string;
  opponentScore: number;
  onAdvanceStage: () => void;
};

const funColors = [
  "from-green-200 via-lime-100 to-yellow-200",
  "from-fuchsia-200 via-pink-100 to-yellow-100",
  "from-cyan-100 via-blue-100 to-green-100",
];

function getFunColor(stage: number) {
  return funColors[stage % funColors.length];
}

const StageSummary: React.FC<StageSummaryProps> = ({
  stage,
  stageScore,
  opponentName,
  opponentEmoji,
  opponentScore,
  onAdvanceStage,
}) => (
  <Card className={`max-w-xl w-full py-10 px-8 bg-gradient-to-br ${getFunColor(stage)} relative shadow-2xl`}>
    {/* Decorative mascot at top */}
    <CardHeader className="flex flex-col items-center gap-4">
      <MascotAvatar size={90} className="mb-2 animate-pop" />
      <div className="text-5xl font-extrabold flex items-center gap-2 mb-1">
        <span className="drop-shadow glow">{opponentEmoji}</span>
        <span className="text-black">STAGE {stage + 1} Complete!</span>
      </div>
    </CardHeader>
    {/* Score comparison */}
    <CardContent className="flex flex-col items-center mt-4">
      <div className="w-full flex items-center justify-center gap-8 mb-6">
        {/* User Score */}
        <div className="flex flex-col items-center px-8 py-4 bg-white/80 rounded-2xl shadow-lg border-4 border-yellow-300 font-bold">
          <span className="font-extrabold text-3xl text-yellow-600 flex items-center gap-2">
            <Zap className="text-yellow-500" />
            {stageScore}
          </span>
          <span className="text-base mt-1 text-yellow-700 font-bold">Your Stage</span>
        </div>
        <div className="flex items-center text-2xl font-black px-3 py-1">
          <span className="text-zinc-600">vs</span>
        </div>
        {/* Opponent Score */}
        <div className="flex flex-col items-center px-8 py-4 bg-white/80 rounded-2xl shadow-lg border-4 border-fuchsia-300 font-bold">
          <span className="font-extrabold text-3xl text-pink-600 flex items-center gap-2">
            <Star className="text-pink-500" />
            {opponentScore}
          </span>
          <span className="text-base mt-1 text-pink-700 font-bold">
            {opponentName}
          </span>
        </div>
      </div>
      <div className="text-2xl font-extrabold text-black animate-pop flex items-center gap-2 mb-7">
        🎉 Awesome — you finished this stage!
      </div>
      <Button
        onClick={onAdvanceStage}
        className="text-lg font-black px-10 py-5 bg-gradient-to-r from-yellow-400 to-pink-400 hover:from-yellow-500 hover:to-fuchsia-400 shadow-xl rounded-full border-none transition-all animate-bounce"
        size="lg"
      >
        Next Stage
      </Button>
    </CardContent>
    {/* Confetti dots (decorative) */}
    <div className="absolute top-6 right-10 w-5 h-5 rounded-full bg-pink-300 animate-bounce [animation-delay:0.3s]" />
    <div className="absolute bottom-8 left-10 w-5 h-5 rounded-full bg-yellow-200 animate-pulse" />
    <div className="absolute bottom-5 right-12 w-4 h-4 rounded-full bg-lime-300 animate-bounce [animation-delay:0.15s]" />
  </Card>
);

export default StageSummary;
