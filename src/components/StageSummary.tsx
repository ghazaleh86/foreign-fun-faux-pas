
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MascotAvatar from "./MascotAvatar";
import { Trophy, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type StageSummaryProps = {
  stage: number;
  stageScore: number;
  opponentName: string;
  opponentEmoji: string;
  opponentScore: number;
  onAdvanceStage: () => void;
  profile: any; // Player profile with hearts, xp, streak
  stageScores: number[];
  opponentScores: number[];
};

const StageSummary: React.FC<StageSummaryProps> = ({
  stage,
  stageScore,
  opponentName,
  opponentEmoji,
  opponentScore,
  onAdvanceStage,
  profile,
  stageScores,
  opponentScores,
}) => {
  const playerWon = stageScore > opponentScore;
  const isTie = stageScore === opponentScore;
  const isMobile = useIsMobile();
  const [showDetails, setShowDetails] = useState(false);
  
  // Calculate totals
  const playerTotal = stageScores.reduce((sum, score) => sum + score, 0);
  const opponentTotal = opponentScores.reduce((sum, score) => sum + score, 0);

  return (
    <div className={`w-full max-w-md mx-auto ${isMobile ? 'h-screen' : 'py-8 min-h-screen'} flex items-center justify-center`}>
      <Card className="w-full bg-white border-0 overflow-hidden shadow-xl">
        {/* Main Content */}
        <CardContent className={`${isMobile ? 'px-4 py-4' : 'px-6 py-6'} text-center relative space-y-6`}>
          {/* Mascot - Bigger and more prominent */}
          <div className="relative z-10">
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full p-4 shadow-lg mx-auto w-24 h-24 flex items-center justify-center border-2 border-yellow-200 animate-scale-in">
              <MascotAvatar size={64} className="ring-0 hover:scale-110 transition-transform duration-300" />
            </div>
          </div>

          {/* Stage Info */}
          <div className="relative z-10 space-y-3">
            <h1 className="text-2xl font-black tracking-tight text-gray-900">
              STAGE {stage + 1}
            </h1>
            <div className="text-sm font-semibold text-gray-600 flex items-center justify-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              Complete!
            </div>

            {/* Result Badge - More prominent */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-base shadow-lg border-2 ${
              playerWon 
                ? "bg-green-50 text-green-700 border-green-200" 
                : isTie 
                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                : "bg-blue-50 text-blue-700 border-blue-200"
            }`}>
              {playerWon ? "🏆 You Won This Stage!" : isTie ? "🤝 Stage Tied!" : "💪 Good Effort!"}
            </div>
          </div>

          {/* Battle Results */}
          <div className="relative z-10 space-y-4">
            <h2 className="text-lg font-bold text-gray-800">Stage Results</h2>
            
            <div className="flex items-center justify-center gap-6">
              {/* Your Score */}
              <div className="text-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg border-2 mx-auto mb-2 ${
                  playerWon ? "bg-green-50 border-green-300" : "bg-gray-50 border-gray-200"
                }`}>
                  <div className="text-center">
                    <div className={`text-xl font-black ${playerWon ? "text-green-700" : "text-gray-700"}`}>
                      {stageScore}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-700">You</div>
              </div>
              
              {/* VS Divider */}
              <div className="text-lg font-black text-gray-300 px-2">VS</div>
              
              {/* Opponent Score */}
              <div className="text-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg border-2 mx-auto mb-2 ${
                  !playerWon && !isTie ? "bg-red-50 border-red-300" : "bg-gray-50 border-gray-200"
                }`}>
                  <div className="text-center">
                    <div className={`text-xl font-black ${!playerWon && !isTie ? "text-red-700" : "text-gray-700"}`}>
                      {opponentScore}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-700">{opponentName}</div>
              </div>
            </div>
            
            {/* Total Scores - Only show after first stage */}
            {stage > 0 && (
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-xs font-semibold text-gray-600 mb-1">Overall Progress</div>
                <div className="flex justify-center items-center gap-4">
                  <div className="text-center">
                    <div className="text-base font-bold text-gray-800">{playerTotal}</div>
                    <div className="text-xs text-gray-500">Your Total</div>
                  </div>
                  <div className="text-gray-300 font-bold text-sm">vs</div>
                  <div className="text-center">
                    <div className="text-base font-bold text-gray-800">{opponentTotal}</div>
                    <div className="text-xs text-gray-500">{opponentName} Total</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Action Button */}
          <div className="relative z-10">
            <Button
              onClick={onAdvanceStage}
              variant="primary-cta"
              size="lg"
              className="w-full min-h-[56px] text-lg font-bold px-8 shadow-lg"
            >
              <span>Continue Journey</span>
              <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StageSummary;
