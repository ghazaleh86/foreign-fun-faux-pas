import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
    <div className="w-full max-w-2xl mx-auto px-4">
      <Card className="w-full bg-gradient-to-br from-white via-white to-gray-50/30 shadow-2xl border-0 overflow-hidden">
        {/* Celebration Header */}
        <div className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 px-8 py-12 text-center">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-8 text-6xl">🎉</div>
            <div className="absolute top-8 right-12 text-4xl">✨</div>
            <div className="absolute bottom-6 left-12 text-5xl">🌟</div>
            <div className="absolute bottom-4 right-8 text-3xl">🎊</div>
          </div>
          
          {/* Main Content */}
          <div className="relative z-10">
            {/* Mascot */}
            <div className="mb-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-xl mx-auto w-20 h-20 flex items-center justify-center border-4 border-white/50">
                <MascotAvatar size={48} className="ring-0" />
              </div>
            </div>
            
            {/* Stage Info */}
            <div className="space-y-2 mb-6">
              <div className="text-6xl mb-2">{opponentEmoji}</div>
              <h1 className="text-4xl font-black text-white tracking-tight">
                STAGE {stage + 1}
              </h1>
              <div className="text-xl font-semibold text-white/90 flex items-center justify-center gap-2">
                <Trophy className="w-5 h-5" />
                Complete!
              </div>
            </div>

            {/* Result Badge */}
            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg shadow-lg ${
              playerWon 
                ? "bg-green-500 text-white" 
                : isTie 
                ? "bg-yellow-500 text-white"
                : "bg-blue-500 text-white"
            }`}>
              {playerWon ? "🏆 You Won!" : isTie ? "🤝 It's a Tie!" : "💪 Keep Going!"}
            </div>
          </div>
        </div>

        {/* Score Section */}
        <CardContent className="px-8 py-10 bg-white">
          {/* Score Battle */}
          <div className="mb-10">
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">Battle Results</h2>
            
            <div className="flex items-center justify-center gap-8">
              {/* Your Score */}
              <div className="text-center">
                <div className={`w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg border-4 ${
                  playerWon ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                }`}>
                  <div className="text-center">
                    <Zap className={`w-6 h-6 mx-auto mb-1 ${playerWon ? "text-green-500" : "text-amber-500"}`} />
                    <div className={`text-2xl font-black ${playerWon ? "text-green-600" : "text-amber-600"}`}>
                      {stageScore}
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-sm font-semibold text-gray-700">You</div>
              </div>
              
              {/* VS Divider */}
              <div className="flex flex-col items-center">
                <div className="text-3xl font-black text-gray-300 mb-2">VS</div>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              </div>
              
              {/* Opponent Score */}
              <div className="text-center">
                <div className={`w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg border-4 ${
                  !playerWon && !isTie ? "bg-pink-50 border-pink-200" : "bg-gray-50 border-gray-200"
                }`}>
                  <div className="text-center">
                    <Star className={`w-6 h-6 mx-auto mb-1 ${!playerWon && !isTie ? "text-pink-500" : "text-pink-400"}`} />
                    <div className={`text-2xl font-black ${!playerWon && !isTie ? "text-pink-600" : "text-pink-500"}`}>
                      {opponentScore}
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-sm font-semibold text-gray-700">{opponentName}</div>
              </div>
            </div>
          </div>

          {/* Performance Message */}
          <div className="text-center mb-10">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
              <p className="text-lg font-semibold text-gray-800 mb-2">
                {playerWon 
                  ? "🎉 Fantastic! You crushed this stage!" 
                  : isTie 
                  ? "😮 Wow, that was close! Great effort!"
                  : "💪 Nice try! You're getting stronger!"}
              </p>
              <p className="text-sm text-gray-600">
                {playerWon 
                  ? "Your skills are really paying off. Keep it up!" 
                  : "Every challenge makes you better. Ready for the next one?"}
              </p>
            </div>
          </div>
          
          {/* Action Button */}
          <div className="text-center">
            <Button
              onClick={onAdvanceStage}
              variant="primary-cta"
              size="lg"
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
