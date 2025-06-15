
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
  <Card className={`max-w-xl w-full py-8 px-6 bg-gradient-to-br ${getFunColor(stage)} relative shadow-2xl h-[500px] flex flex-col justify-between`}>
    {/* Simplified header with smaller mascot */}
    <CardHeader className="flex flex-col items-center gap-3 pb-4">
      <div className="bg-yellow-300 rounded-full flex items-center justify-center shadow-lg" style={{ width: 60, height: 60 }}>
        <MascotAvatar size={48} className="" />
      </div>
      <div className="text-3xl font-extrabold flex items-center gap-2 text-black text-center">
        <span className="text-2xl">{opponentEmoji}</span>
        <span>STAGE {stage + 1} Complete!</span>
      </div>
    </CardHeader>

    {/* Compact score comparison */}
    <CardContent className="flex flex-col items-center justify-center flex-1">
      <div className="w-full flex items-center justify-center gap-6 mb-6">
        {/* User Score */}
        <div className="flex flex-col items-center px-6 py-3 bg-white/80 rounded-2xl shadow-md border-2 border-yellow-300 font-bold">
          <span className="font-extrabold text-2xl text-yellow-600 flex items-center gap-1">
            <Zap className="text-yellow-500 w-4 h-4" />
            {stageScore}
          </span>
          <span className="text-sm text-yellow-700 font-bold">Your Stage</span>
        </div>
        <div className="flex items-center text-xl font-black px-2 text-gray-600">vs</div>
        {/* Opponent Score */}
        <div className="flex flex-col items-center px-6 py-3 bg-white/80 rounded-2xl shadow-md border-2 border-pink-300 font-bold">
          <span className="font-extrabold text-2xl text-pink-600 flex items-center gap-1">
            <Star className="text-pink-500 w-4 h-4" />
            {opponentScore}
          </span>
          <span className="text-sm text-pink-700 font-bold">{opponentName}</span>
        </div>
      </div>

      {/* Simplified congratulations message */}
      <div className="text-lg font-extrabold text-black text-center mb-6">
        🎉 Awesome — you finished this stage!
      </div>
      
      {/* Button */}
      <Button
        onClick={onAdvanceStage}
        className="text-lg font-black px-10 py-4 bg-gradient-to-r from-yellow-400 to-pink-400 hover:from-yellow-500 hover:to-fuchsia-400 shadow-lg rounded-full border-none transition-all"
        size="lg"
      >
        Next Stage
      </Button>
    </CardContent>
  </Card>
);

export default StageSummary;
