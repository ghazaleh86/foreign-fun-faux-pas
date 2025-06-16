
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
  <div className="w-full max-w-xl mx-auto px-4">
    <Card className={`w-full bg-gradient-to-br ${getFunColor(stage)} shadow-2xl border-0 overflow-hidden`}>
      {/* Header Section */}
      <CardHeader className="text-center pt-12 pb-8 px-8">
        {/* Mascot with premium styling */}
        <div className="mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-xl mx-auto w-20 h-20 flex items-center justify-center">
            <MascotAvatar size={56} className="ring-0" />
          </div>
        </div>
        
        {/* Title with better typography */}
        <div className="space-y-2">
          <div className="text-6xl">{opponentEmoji}</div>
          <CardTitle className="text-3xl font-black text-gray-800 tracking-tight leading-tight">
            STAGE {stage + 1}
            <br />
            <span className="text-2xl font-bold text-gray-600">Complete!</span>
          </CardTitle>
        </div>
      </CardHeader>

      {/* Content Section */}
      <CardContent className="px-8 pb-12">
        {/* Score Comparison with premium cards */}
        <div className="flex items-center justify-center gap-8 mb-10">
          {/* User Score */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50 min-w-[120px] text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="text-yellow-500 w-5 h-5" />
              <span className="text-3xl font-black text-yellow-600">{stageScore}</span>
            </div>
            <div className="text-sm font-semibold text-yellow-700">Your Stage</div>
          </div>
          
          {/* VS Divider */}
          <div className="text-2xl font-black text-gray-500 px-4">VS</div>
          
          {/* Opponent Score */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50 min-w-[120px] text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="text-pink-500 w-5 h-5" />
              <span className="text-3xl font-black text-pink-600">{opponentScore}</span>
            </div>
            <div className="text-sm font-semibold text-pink-700">{opponentName}</div>
          </div>
        </div>

        {/* Congratulations Message */}
        <div className="text-center mb-10">
          <p className="text-xl font-bold text-gray-800 leading-relaxed">
            🎉 Awesome — you finished this stage!
          </p>
        </div>
        
        {/* Premium Button */}
        <div className="text-center">
          <Button
            onClick={onAdvanceStage}
            className="text-lg font-bold px-12 py-4 bg-gradient-to-r from-yellow-400 to-pink-400 hover:from-yellow-500 hover:to-pink-500 shadow-xl rounded-full border-0 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            size="lg"
          >
            Next Stage
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default StageSummary;
