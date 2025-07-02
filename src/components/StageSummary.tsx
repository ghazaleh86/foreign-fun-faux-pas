
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MascotAvatar from "./MascotAvatar";
import { Trophy, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  return (
    <div className="w-full max-w-sm mx-auto px-3 py-2 safe-area-inset-bottom">
      <Card className="w-full bg-white border-0 overflow-hidden shadow-xl">
        {/* Main Content */}
        <CardContent className={`${isMobile ? 'px-3 py-3' : 'px-4 py-4'} text-center relative`}>
          {/* Mascot - Much smaller */}
          <div className="relative z-10 mb-2">
            <div className="bg-gray-50 rounded-full p-2 shadow-sm mx-auto w-20 h-20 flex items-center justify-center border border-gray-100">
              <MascotAvatar size={64} className="ring-0" />
            </div>
          </div>

          {/* Stage Info - More compact */}
          <div className="relative z-10 mb-3">
            <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-black tracking-tight mb-1 text-gray-900`}>
              STAGE {stage + 1}
            </h1>
            <div className="text-sm font-semibold text-gray-600 flex items-center justify-center gap-1 mb-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              Complete!
            </div>

            {/* Result Badge - More compact */}
            <div className={`inline-flex items-center gap-1 px-4 py-1 rounded-full font-bold text-sm shadow-sm mb-3 border-2 ${
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
          <div className="relative z-10 mb-3">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Battle Results</h2>
            
            <div className={`flex items-center justify-center ${isMobile ? 'gap-3' : 'gap-4'}`}>
              {/* Your Score */}
              <div className="text-center flex-1 max-w-[80px]">
                <div className={`${isMobile ? 'w-14 h-14' : 'w-16 h-16'} rounded-xl flex items-center justify-center shadow-sm border-2 mx-auto ${
                  playerWon ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                }`}>
                  <div className="text-center">
                    <div className={`${isMobile ? 'text-lg' : 'text-xl'} font-black ${playerWon ? "text-green-600" : "text-gray-700"}`}>
                      {stageScore}
                    </div>
                  </div>
                </div>
                <div className={`mt-1 ${isMobile ? 'text-xs' : 'text-xs'} font-semibold text-gray-600 truncate`}>You</div>
              </div>
              
              {/* VS Divider */}
              <div className={`${isMobile ? 'text-base' : 'text-lg'} font-black text-gray-300 flex-shrink-0`}>VS</div>
              
              {/* Opponent Score */}
              <div className="text-center flex-1 max-w-[80px]">
                <div className={`${isMobile ? 'w-14 h-14' : 'w-16 h-16'} rounded-xl flex items-center justify-center shadow-sm border-2 mx-auto ${
                  !playerWon && !isTie ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-200"
                }`}>
                  <div className="text-center">
                    <div className={`${isMobile ? 'text-lg' : 'text-xl'} font-black ${!playerWon && !isTie ? "text-red-600" : "text-gray-700"}`}>
                      {opponentScore}
                    </div>
                  </div>
                </div>
                <div className={`mt-1 ${isMobile ? 'text-xs' : 'text-xs'} font-semibold text-gray-600 truncate`}>{opponentName}</div>
              </div>
            </div>
          </div>
          
          {/* Action Button */}
          <div className="relative z-10">
            <Button
              onClick={onAdvanceStage}
              variant="primary-cta"
              size={isMobile ? "lg" : "lg"}
              className={`${isMobile ? 'min-h-[48px] text-base px-6' : ''} w-full max-w-[280px]`}
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
