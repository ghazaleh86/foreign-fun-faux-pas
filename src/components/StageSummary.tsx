
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
        {/* Main Content */}
        <CardContent className="px-8 py-12 text-center relative">
          {/* Mascot */}
          <div className="relative z-10 mb-8">
            <div className="bg-gray-50 rounded-full p-4 shadow-sm mx-auto w-20 h-20 flex items-center justify-center border border-gray-100">
              <MascotAvatar size={48} className="ring-0" />
            </div>
          </div>

          {/* Stage Info */}
          <div className="relative z-10 mb-8">
            <div className="text-6xl mb-4">{opponentEmoji}</div>
            <h1 className="text-5xl font-black tracking-tight mb-3 text-gray-900">
              STAGE {stage + 1}
            </h1>
            <div className="text-xl font-semibold text-gray-600 flex items-center justify-center gap-2 mb-6">
              <Trophy className="w-6 h-6 text-amber-500" />
              Complete!
            </div>

            {/* Result Badge */}
            <div className={`inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-lg shadow-sm mb-8 border-2 ${
              playerWon 
                ? "bg-green-50 text-green-700 border-green-200" 
                : isTie 
                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                : "bg-blue-50 text-blue-700 border-blue-200"
            }`}>
              {playerWon ? "🏆 You Won!" : isTie ? "🤝 It's a Tie!" : "💪 Keep Going!"}
            </div>
          </div>

          {/* Battle Results - Clean Design */}
          <div className="relative z-10 mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Battle Results</h2>
            
            <div className="flex items-center justify-center gap-8">
              {/* Your Score */}
              <div className="text-center">
                <div className={`w-24 h-24 rounded-xl flex items-center justify-center shadow-sm border-2 ${
                  playerWon ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                }`}>
                  <div className="text-center">
                    <div className={`text-3xl font-black ${playerWon ? "text-green-600" : "text-gray-700"}`}>
                      {stageScore}
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-sm font-semibold text-gray-600">You</div>
              </div>
              
              {/* VS Divider */}
              <div className="text-3xl font-black text-gray-300">VS</div>
              
              {/* Opponent Score */}
              <div className="text-center">
                <div className={`w-24 h-24 rounded-xl flex items-center justify-center shadow-sm border-2 ${
                  !playerWon && !isTie ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-200"
                }`}>
                  <div className="text-center">
                    <div className={`text-3xl font-black ${!playerWon && !isTie ? "text-red-600" : "text-gray-700"}`}>
                      {opponentScore}
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-sm font-semibold text-gray-600">{opponentName}</div>
              </div>
            </div>
          </div>
          
          {/* Action Button */}
          <div className="relative z-10">
            <Button
              onClick={onAdvanceStage}
              variant="default"
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <span>Continue Journey</span>
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StageSummary;
