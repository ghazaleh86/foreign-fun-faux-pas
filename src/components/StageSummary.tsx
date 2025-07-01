
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MascotAvatar from "./MascotAvatar";
import { Trophy, ArrowRight } from "lucide-react";

type StageSummaryProps = {
  stage: number;
  stageScore: number;
  opponentName: string;
  opponentEmoji: string;
  opponentScore: number;
  onAdvanceStage: () => void;
  profile: any; // Player profile with hearts, xp, streak
};

const StageSummary: React.FC<StageSummaryProps> = ({
  stage,
  stageScore,
  opponentName,
  opponentEmoji,
  opponentScore,
  onAdvanceStage,
  profile,
}) => {
  const playerWon = stageScore > opponentScore;
  const isTie = stageScore === opponentScore;

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <Card className="w-full bg-white border-0 overflow-hidden shadow-xl">
        <CardContent className="px-6 py-4 text-center relative">
          {/* Mascot - Smaller and more compact */}
          <div className="relative z-10 mb-3">
            <div className="bg-gray-50 rounded-full p-2 shadow-sm mx-auto w-20 h-20 flex items-center justify-center border border-gray-100">
              <MascotAvatar size={64} className="ring-0" />
            </div>
          </div>

          {/* Stage Info - More compact */}
          <div className="relative z-10 mb-4">
            <h1 className="text-3xl font-black tracking-tight mb-1 text-gray-900">
              STAGE {stage + 1}
            </h1>
            <div className="text-base font-semibold text-gray-600 flex items-center justify-center gap-2 mb-3">
              <Trophy className="w-4 h-4 text-amber-500" />
              Complete!
            </div>

            {/* Result Badge - Smaller */}
            <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full font-bold text-sm shadow-sm mb-4 border-2 ${
              playerWon 
                ? "bg-green-50 text-green-700 border-green-200" 
                : isTie 
                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                : "bg-blue-50 text-blue-700 border-blue-200"
            }`}>
              {playerWon ? "🏆 You Won!" : isTie ? "🤝 It's a Tie!" : "💪 Keep Going!"}
            </div>
          </div>

          {/* Battle Results - Compact */}
          <div className="relative z-10 mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Battle Results</h2>
            
            <div className="flex items-center justify-center gap-4">
              {/* Your Score */}
              <div className="text-center">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-sm border-2 ${
                  playerWon ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                }`}>
                  <div className={`text-xl font-black ${playerWon ? "text-green-600" : "text-gray-700"}`}>
                    {stageScore}
                  </div>
                </div>
                <div className="mt-1 text-xs font-semibold text-gray-600">You</div>
              </div>
              
              {/* VS Divider */}
              <div className="text-xl font-black text-gray-300">VS</div>
              
              {/* Opponent Score */}
              <div className="text-center">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-sm border-2 ${
                  !playerWon && !isTie ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-200"
                }`}>
                  <div className={`text-xl font-black ${!playerWon && !isTie ? "text-red-600" : "text-gray-700"}`}>
                    {opponentScore}
                  </div>
                </div>
                <div className="mt-1 text-xs font-semibold text-gray-600">{opponentName}</div>
              </div>
            </div>
          </div>
          
          {/* Action Button */}
          <div className="relative z-10">
            <Button
              onClick={onAdvanceStage}
              variant="default"
              size="default"
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <span>Continue Journey</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StageSummary;
