
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
        <CardContent className="px-6 py-6 text-center relative">
          {/* Mascot - Made bigger */}
          <div className="relative z-10 mb-4">
            <div className="bg-gray-50 rounded-full p-3 shadow-sm mx-auto w-24 h-24 flex items-center justify-center border border-gray-100">
              <MascotAvatar size={64} className="ring-0" />
            </div>
          </div>

          {/* Stage Info - More compact */}
          <div className="relative z-10 mb-6">
            <div className="text-4xl mb-3">{opponentEmoji}</div>
            <h1 className="text-4xl font-black tracking-tight mb-2 text-gray-900">
              STAGE {stage + 1}
            </h1>
            <div className="text-lg font-semibold text-gray-600 flex items-center justify-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-amber-500" />
              Complete!
            </div>

            {/* Result Badge - More compact */}
            <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full font-bold text-base shadow-sm mb-6 border-2 ${
              playerWon 
                ? "bg-green-50 text-green-700 border-green-200" 
                : isTie 
                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                : "bg-blue-50 text-blue-700 border-blue-200"
            }`}>
              {playerWon ? "🏆 You Won!" : isTie ? "🤝 It's a Tie!" : "💪 Keep Going!"}
            </div>
          </div>

          {/* Battle Results - More compact */}
          <div className="relative z-10 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Battle Results</h2>
            
            <div className="flex items-center justify-center gap-6">
              {/* Your Score */}
              <div className="text-center">
                <div className={`w-20 h-20 rounded-xl flex items-center justify-center shadow-sm border-2 ${
                  playerWon ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                }`}>
                  <div className="text-center">
                    <div className={`text-2xl font-black ${playerWon ? "text-green-600" : "text-gray-700"}`}>
                      {stageScore}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-sm font-semibold text-gray-600">You</div>
              </div>
              
              {/* VS Divider */}
              <div className="text-2xl font-black text-gray-300">VS</div>
              
              {/* Opponent Score */}
              <div className="text-center">
                <div className={`w-20 h-20 rounded-xl flex items-center justify-center shadow-sm border-2 ${
                  !playerWon && !isTie ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-200"
                }`}>
                  <div className="text-center">
                    <div className={`text-2xl font-black ${!playerWon && !isTie ? "text-red-600" : "text-gray-700"}`}>
                      {opponentScore}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-sm font-semibold text-gray-600">{opponentName}</div>
              </div>
            </div>
          </div>
          
          {/* Action Button */}
          <div className="relative z-10">
            <Button
              onClick={onAdvanceStage}
              variant="default"
              size="lg"
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
