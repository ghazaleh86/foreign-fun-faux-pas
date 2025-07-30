
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { calculateStars } from "@/utils/starSystem";
import { STAGE_SIZE } from "@/utils/quizHelpers";
import {
  GameSummaryMascot,
  GameSummaryPerformance,
  GameSummaryScore,
  GameSummaryBattleResults,
  GameSummaryStageTable,
  GameSummaryMessages,
  GameSummaryActions,
} from "./game-summary";

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
  
  // Calculate total stars earned based on stage performance
  const totalStarsEarned = stageScores.reduce((totalStars, stageScore) => {
    return totalStars + calculateStars(stageScore, STAGE_SIZE);
  }, 0);

  return (
    <div className={`w-full max-w-lg mx-auto ${isMobile ? 'h-screen pt-4 pb-40' : 'py-8 min-h-screen pb-8'} flex items-start justify-center`}>
      <Card className="w-full bg-white border-0 overflow-hidden shadow-xl">
        <CardContent className={`${isMobile ? 'px-4 py-6' : 'px-6 py-8'} text-center relative space-y-6`}>
          <GameSummaryMascot />
          <GameSummaryPerformance percent={percent} />
          <GameSummaryScore 
            score={score} 
            total={total} 
            percent={percent} 
            playerTotal={playerTotal}
            totalStarsEarned={totalStarsEarned}
          />
          <GameSummaryBattleResults
            playerTotal={playerTotal}
            opponentTotal={opponentTotal}
            opponentName={opponentName}
            playerWon={playerWon}
            isTie={isTie}
          />
          <GameSummaryStageTable
            totalStages={totalStages}
            stageScores={stageScores}
            opponentScores={opponentScores}
            opponentName={opponentName}
          />
          <GameSummaryMessages
            opponentEmoji={opponentEmoji}
            opponentName={opponentName}
            total={total}
          />
          <GameSummaryActions onPlayAgain={onPlayAgain} />
        </CardContent>
      </Card>
    </div>
  );
};

export default GameSummary;
