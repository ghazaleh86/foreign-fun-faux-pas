
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
}) => (
  <Card className="max-w-xl w-full bg-gradient-to-tr from-pink-200/60 to-yellow-100/70 border-pink-300/60 shadow-fuchsia-200/40 shadow-2xl">
    <CardHeader>
      <CardTitle className="text-2xl flex items-center gap-2">
        🎉 Game Finished!
      </CardTitle>
    </CardHeader>
    <CardContent className="text-center">
      <div className="text-5xl font-extrabold mb-1 text-gradient bg-gradient-to-r from-fuchsia-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent animate-fade-pop">
        {score} / {total}
      </div>
      <div className="mb-1">Your Score: {percent}%</div>
      <div className="flex flex-col items-center mt-6">
        <div className="font-bold text-base text-teal-700 mb-2">Stage Results</div>
        <table className="w-full text-sm mb-2 border rounded">
          <thead>
            <tr>
              <th className="border px-2 py-1">Stage</th>
              <th className="border px-2 py-1">You</th>
              <th className="border px-2 py-1">{opponentName}</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: totalStages }).map((_, i) => (
              <tr key={i}>
                <td className="border text-center font-semibold">{i + 1}</td>
                <td className="border text-center">{stageScores[i] || 0}</td>
                <td className="border text-center">{opponentScores[i] || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-lg font-bold text-teal-700 flex items-center justify-center gap-2">
        <span className="text-2xl">{opponentEmoji}</span> {opponentName}: “Great game!”
      </div>
      <div className="mt-4 text-pink-700 font-semibold text-base">
        {total === 0
          ? "You've played every phrase available! Please come back when new content is added, or clear your browser history to replay."
          : null}
      </div>
    </CardContent>
    <CardFooter>
      <Button className="w-full" onClick={onPlayAgain}>
        Play Again
      </Button>
    </CardFooter>
  </Card>
);

export default GameSummary;
