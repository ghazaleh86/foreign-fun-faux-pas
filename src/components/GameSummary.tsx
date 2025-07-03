
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MascotAvatar from "./MascotAvatar";
import { Trophy, Star, Medal, Crown, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type GameSummaryProps = {
  score: number;
  total: number;
  percent: number;
  totalStages: number;
  stageScores: number[];
  opponentScores: number[];
  opponentName: string;
  opponentEmoji: string;
  onPlayAgain: () => void;
};

const GameSummary: React.FC<GameSummaryProps> = ({
  score, total, percent, totalStages, stageScores, opponentScores, opponentName, opponentEmoji, onPlayAgain
}) => {
  const isMobile = useIsMobile();
  
  // Calculate totals
  const playerTotal = stageScores.reduce((sum, score) => sum + score, 0);
  const opponentTotal = opponentScores.reduce((sum, score) => sum + score, 0);
  const playerWon = playerTotal > opponentTotal;
  const isTie = playerTotal === opponentTotal;
  
  // Performance-based celebration
  const getPerformanceData = () => {
    if (percent >= 90) return { icon: Crown, message: "Outstanding Performance!", color: "text-yellow-600", bgColor: "bg-yellow-50", borderColor: "border-yellow-200" };
    if (percent >= 80) return { icon: Trophy, message: "Excellent Work!", color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" };
    if (percent >= 70) return { icon: Medal, message: "Great Job!", color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" };
    if (percent >= 60) return { icon: Star, message: "Good Effort!", color: "text-purple-600", bgColor: "bg-purple-50", borderColor: "border-purple-200" };
    return { icon: Star, message: "Keep Practicing!", color: "text-gray-600", bgColor: "bg-gray-50", borderColor: "border-gray-200" };
  };
  
  const performance = getPerformanceData();
  const PerformanceIcon = performance.icon;

  return (
    <div className={`w-full max-w-lg mx-auto ${isMobile ? 'h-screen pt-4 pb-24' : 'py-8 min-h-screen pb-8'} flex items-start justify-center`}>
      <Card className="w-full bg-white border-0 overflow-hidden shadow-xl">
        <CardContent className={`${isMobile ? 'px-4 py-6' : 'px-6 py-8'} text-center relative space-y-6`}>
          {/* Mascot - Celebratory */}
          <div className="relative z-10">
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full p-6 shadow-lg mx-auto w-28 h-28 flex items-center justify-center border-2 border-yellow-200 animate-scale-in">
              <MascotAvatar size={72} className="ring-0 hover:scale-110 transition-transform duration-300" />
            </div>
          </div>

          {/* Game Complete Header */}
          <div className="relative z-10 space-y-4">
            <h1 className="text-3xl font-black tracking-tight text-gray-900">
              🎉 GAME COMPLETE!
            </h1>
            
            {/* Performance Badge */}
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full font-bold text-lg shadow-lg border-2 ${performance.bgColor} ${performance.color} ${performance.borderColor}`}>
              <PerformanceIcon className="w-6 h-6" />
              {performance.message}
            </div>
          </div>

          {/* Score Display */}
          <div className="relative z-10 space-y-4">
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6 border-2 border-pink-200">
              <div className="text-6xl font-black mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 bg-clip-text text-transparent animate-pop">
                {score} / {total}
              </div>
              <div className="text-xl font-bold text-gray-700">Questions Correct: {percent}%</div>
              <div className="text-lg font-semibold text-gray-600 mt-2">Battle Points: {playerTotal}</div>
            </div>
          </div>

          {/* Battle Results */}
          <div className="relative z-10 space-y-4">
            <h2 className="text-lg font-bold text-gray-800">Final Battle Results</h2>
            
            <div className="flex items-center justify-center gap-6">
              {/* Your Total */}
              <div className="text-center">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg border-2 mx-auto mb-2 ${
                  playerWon ? "bg-green-50 border-green-300" : isTie ? "bg-yellow-50 border-yellow-300" : "bg-gray-50 border-gray-200"
                }`}>
                  <div className="text-center">
                    <div className={`text-2xl font-black ${
                      playerWon ? "text-green-700" : isTie ? "text-yellow-700" : "text-gray-700"
                    }`}>
                      {playerTotal}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-700">You</div>
              </div>
              
              {/* VS Divider */}
              <div className="text-xl font-black text-gray-300 px-2">VS</div>
              
              {/* Opponent Total */}
              <div className="text-center">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg border-2 mx-auto mb-2 ${
                  !playerWon && !isTie ? "bg-red-50 border-red-300" : "bg-gray-50 border-gray-200"
                }`}>
                  <div className="text-center">
                    <div className={`text-2xl font-black ${
                      !playerWon && !isTie ? "text-red-700" : "text-gray-700"
                    }`}>
                      {opponentTotal}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-700">{opponentName}</div>
              </div>
            </div>

            {/* Overall Result */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-base shadow-lg border-2 ${
              playerWon 
                ? "bg-green-50 text-green-700 border-green-200" 
                : isTie 
                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                : "bg-blue-50 text-blue-700 border-blue-200"
            }`}>
              {playerWon ? "🏆 You Won Overall!" : isTie ? "🤝 Overall Tie!" : "💪 Valiant Effort!"}
            </div>
          </div>

          {/* Stage Breakdown Table */}
          <div className="relative z-10 space-y-3">
            <h3 className="text-base font-bold text-gray-800">Stage Breakdown</h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center font-bold">Stage</TableHead>
                    <TableHead className="text-center font-bold">You</TableHead>
                    <TableHead className="text-center font-bold">{opponentName}</TableHead>
                    <TableHead className="text-center font-bold">Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: totalStages }).map((_, i) => {
                    const playerScore = stageScores[i] || 0;
                    const opponentScore = opponentScores[i] || 0;
                    const stageWon = playerScore > opponentScore;
                    const stageTied = playerScore === opponentScore;
                    
                    return (
                      <TableRow key={i}>
                        <TableCell className="text-center font-semibold">{i + 1}</TableCell>
                        <TableCell className={`text-center font-bold ${stageWon ? 'text-green-600' : 'text-gray-600'}`}>
                          {playerScore}
                        </TableCell>
                        <TableCell className={`text-center font-bold ${!stageWon && !stageTied ? 'text-red-600' : 'text-gray-600'}`}>
                          {opponentScore}
                        </TableCell>
                        <TableCell className="text-center">
                          {stageWon ? "🏆" : stageTied ? "🤝" : "💔"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Opponent Message */}
          <div className="relative z-10 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200">
            <div className="text-lg font-bold text-blue-700 flex items-center justify-center gap-3">
              <span className="text-3xl">{opponentEmoji}</span> 
              <div className="text-center">
                <div className="font-black">{opponentName}</div>
                <div className="text-sm font-medium">"Amazing game! You're getting stronger!"</div>
              </div>
            </div>
          </div>

          {/* Empty State Message */}
          {total === 0 && (
            <div className="relative z-10 bg-orange-50 rounded-xl p-4 border-2 border-orange-200">
              <div className="text-orange-700 font-semibold text-base">
                🎯 You've mastered all available phrases! Check back for new content or clear your browser history to replay.
              </div>
            </div>
          )}
          
          {/* Action Button */}
          <div className="relative z-10">
            <Button
              onClick={onPlayAgain}
              variant="primary-cta"
              size="lg"
              className="w-full min-h-[56px] text-lg font-bold px-8 shadow-lg"
            >
              <span>Play Again</span>
              <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameSummary;
