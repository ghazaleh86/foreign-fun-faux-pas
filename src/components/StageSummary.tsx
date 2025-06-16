
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

const StageSummary: React.FC<StageSummaryProps> = ({
  stage,
  stageScore,
  opponentName,
  opponentEmoji,
  opponentScore,
  onAdvanceStage,
}) => (
  <div className="w-full max-w-xl mx-auto px-4">
    <Card className="w-full bg-white shadow-xl border border-gray-100">
      {/* Header Section */}
      <CardHeader className="text-center pt-12 pb-8 px-8 bg-gray-50 border-b border-gray-100">
        {/* Mascot */}
        <div className="mb-8">
          <div className="bg-white rounded-full p-3 shadow-lg mx-auto w-24 h-24 flex items-center justify-center border border-gray-200">
            <MascotAvatar size={60} className="ring-0" />
          </div>
        </div>
        
        {/* Title */}
        <div className="space-y-3">
          <div className="text-5xl mb-2">{opponentEmoji}</div>
          <CardTitle className="text-3xl font-bold text-gray-900 tracking-tight">
            STAGE {stage + 1}
          </CardTitle>
          <div className="text-xl font-medium text-gray-600">Complete!</div>
        </div>
      </CardHeader>

      {/* Content Section */}
      <CardContent className="px-8 py-12 bg-white">
        {/* Score Comparison */}
        <div className="flex items-center justify-center gap-6 mb-12">
          {/* User Score */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 min-w-[140px] text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Zap className="text-amber-500 w-6 h-6" />
              <span className="text-4xl font-bold text-amber-600">{stageScore}</span>
            </div>
            <div className="text-sm font-semibold text-gray-700">Your Stage</div>
          </div>
          
          {/* VS Divider */}
          <div className="text-2xl font-bold text-gray-400 px-4">VS</div>
          
          {/* Opponent Score */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 min-w-[140px] text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Star className="text-pink-500 w-6 h-6" />
              <span className="text-4xl font-bold text-pink-600">{opponentScore}</span>
            </div>
            <div className="text-sm font-semibold text-gray-700">{opponentName}</div>
          </div>
        </div>

        {/* Congratulations Message */}
        <div className="text-center mb-12">
          <p className="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2">
            <span className="text-2xl">🎉</span>
            Awesome — you finished this stage!
          </p>
        </div>
        
        {/* Modern Button */}
        <div className="text-center">
          <Button
            onClick={onAdvanceStage}
            className="text-lg font-semibold px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white shadow-lg rounded-xl border-0 transition-all duration-300 hover:shadow-xl"
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
