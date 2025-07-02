
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
    <div className="w-full max-w-md mx-auto px-4 py-4 pb-20 safe-area-inset-bottom">
      <Card className="w-full bg-white border-0 overflow-hidden shadow-xl">
        {/* Main Content */}
        <CardContent className="px-6 py-6 text-center relative">
          {/* Mascot - Smaller and less prominent */}
          <div className="relative z-10 mb-6">
            <div className="bg-gray-50 rounded-full p-2 shadow-sm mx-auto w-16 h-16 flex items-center justify-center border border-gray-100">
              <MascotAvatar size={48} className="ring-0" />
            </div>
          </div>

          {/* Stage Info */}
          <div className="relative z-10 mb-8">
            <h1 className="text-3xl font-black tracking-tight mb-3 text-gray-900">
              STAGE {stage + 1}
            </h1>
            <div className="text-base font-semibold text-gray-600 flex items-center justify-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-amber-500" />
              Complete!
            </div>

            {/* Result Badge - More prominent */}
            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg shadow-lg mb-6 border-2 ${
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
          <div className="relative z-10 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Stage Results</h2>
            
            <div className="flex items-center justify-center gap-8 mb-6">
              {/* Your Score */}
              <div className="text-center">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg border-2 mx-auto mb-3 ${
                  playerWon ? "bg-green-50 border-green-300" : "bg-gray-50 border-gray-200"
                }`}>
                  <div className="text-center">
                    <div className={`text-2xl font-black ${playerWon ? "text-green-700" : "text-gray-700"}`}>
                      {stageScore}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-700">You</div>
              </div>
              
              {/* VS Divider */}
              <div className="text-xl font-black text-gray-300 px-2">VS</div>
              
              {/* Opponent Score */}
              <div className="text-center">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg border-2 mx-auto mb-3 ${
                  !playerWon && !isTie ? "bg-red-50 border-red-300" : "bg-gray-50 border-gray-200"
                }`}>
                  <div className="text-center">
                    <div className={`text-2xl font-black ${!playerWon && !isTie ? "text-red-700" : "text-gray-700"}`}>
                      {opponentScore}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-700">{opponentName}</div>
              </div>
            </div>
            
            {/* Total Scores - Only show after first stage */}
            {stage > 0 && (
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="text-sm font-semibold text-gray-600 mb-2">Overall Progress</div>
                <div className="flex justify-center items-center gap-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">{playerTotal}</div>
                    <div className="text-xs text-gray-500">Your Total</div>
                  </div>
                  <div className="text-gray-300 font-bold">vs</div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">{opponentTotal}</div>
                    <div className="text-xs text-gray-500">{opponentName} Total</div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Expandable Details - Only show when there are multiple stages */}
            {stage > 0 && stageScores.length > 1 && (
              <div className="mt-2">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-xs text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1 mx-auto"
                >
                  <span>Details</span>
                  {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
                
                {showDetails && (
                  <div className="mt-2 bg-gray-50 rounded-lg p-2 text-xs">
                    <div className="grid grid-cols-3 gap-1 text-center font-semibold mb-1">
                      <span>Stage</span>
                      <span>You</span>
                      <span>{opponentName}</span>
                    </div>
                    {stageScores.map((score, idx) => (
                      <div key={idx} className="grid grid-cols-3 gap-1 text-center py-0.5">
                        <span className="text-gray-600">{idx + 1}</span>
                        <span className={score > (opponentScores[idx] || 0) ? "text-green-600 font-semibold" : "text-gray-600"}>
                          {score}
                        </span>
                        <span className={(opponentScores[idx] || 0) > score ? "text-red-600 font-semibold" : "text-gray-600"}>
                          {opponentScores[idx] || 0}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Action Button */}
          <div className="relative z-10 pt-6">
            <Button
              onClick={onAdvanceStage}
              variant="primary-cta"
              size="lg"
              className="w-full min-h-[60px] text-lg font-bold px-8 shadow-lg"
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
