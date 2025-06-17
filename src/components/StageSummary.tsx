
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MascotAvatar from "./MascotAvatar";
import { Star, Zap, Trophy, ArrowRight } from "lucide-react";

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
      <Card className="w-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 border-0 overflow-hidden shadow-2xl">
        {/* Top Section - Player Stats */}
        <div className="bg-white/10 backdrop-blur-sm px-6 py-3">
          <div className="flex items-center justify-center gap-4 text-white/90">
            <div className="flex items-center gap-1">
              <span className="text-pink-200">💖💖💖</span>
              <span className="text-sm font-medium">3</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-yellow-200">💎</span>
              <span className="text-sm font-medium">0 XP</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-orange-200">🔥</span>
              <span className="text-sm font-medium">x0 streak</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <CardContent className="px-8 py-8 text-center text-white relative">
          {/* Background decorations */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-8 text-4xl">🎉</div>
            <div className="absolute top-8 right-12 text-3xl">✨</div>
            <div className="absolute bottom-6 left-12 text-4xl">🌟</div>
            <div className="absolute bottom-4 right-8 text-2xl">🎊</div>
          </div>
          
          {/* Mascot */}
          <div className="relative z-10 mb-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl mx-auto w-16 h-16 flex items-center justify-center border-4 border-white/50">
              <MascotAvatar size={40} className="ring-0" />
            </div>
          </div>

          {/* Stage Info */}
          <div className="relative z-10 mb-6">
            <div className="text-4xl mb-2">{opponentEmoji}</div>
            <h1 className="text-4xl font-black tracking-tight mb-2">
              STAGE {stage + 1}
            </h1>
            <div className="text-lg font-semibold text-white/90 flex items-center justify-center gap-2 mb-4">
              <Trophy className="w-5 h-5" />
              Complete!
            </div>

            {/* Result Badge */}
            <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full font-bold text-base shadow-lg mb-6 ${
              playerWon 
                ? "bg-green-500 text-white" 
                : isTie 
                ? "bg-yellow-500 text-white"
                : "bg-blue-500 text-white"
            }`}>
              {playerWon ? "🏆 You Won!" : isTie ? "🤝 It's a Tie!" : "💪 Keep Going!"}
            </div>
          </div>

          {/* Battle Results - Compact */}
          <div className="relative z-10 mb-6">
            <h2 className="text-xl font-bold text-white/90 mb-4">Battle Results</h2>
            
            <div className="flex items-center justify-center gap-6">
              {/* Your Score */}
              <div className="text-center">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg border-4 ${
                  playerWon ? "bg-green-400/20 border-green-300/50" : "bg-white/10 border-white/20"
                }`}>
                  <div className="text-center">
                    <Zap className={`w-5 h-5 mx-auto mb-1 ${playerWon ? "text-green-200" : "text-yellow-200"}`} />
                    <div className={`text-xl font-black ${playerWon ? "text-green-100" : "text-yellow-100"}`}>
                      {stageScore}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-xs font-semibold text-white/80">You</div>
              </div>
              
              {/* VS Divider */}
              <div className="text-2xl font-black text-white/50">VS</div>
              
              {/* Opponent Score */}
              <div className="text-center">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg border-4 ${
                  !playerWon && !isTie ? "bg-pink-400/20 border-pink-300/50" : "bg-white/10 border-white/20"
                }`}>
                  <div className="text-center">
                    <Star className={`w-5 h-5 mx-auto mb-1 ${!playerWon && !isTie ? "text-pink-200" : "text-pink-300"}`} />
                    <div className={`text-xl font-black ${!playerWon && !isTie ? "text-pink-100" : "text-pink-200"}`}>
                      {opponentScore}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-xs font-semibold text-white/80">{opponentName}</div>
              </div>
            </div>
          </div>
          
          {/* Action Button */}
          <div className="relative z-10">
            <Button
              onClick={onAdvanceStage}
              variant="primary-cta"
              size="lg"
              className="bg-white text-purple-600 hover:bg-white/90 font-black"
            >
              <span>Continue Journey</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StageSummary;
