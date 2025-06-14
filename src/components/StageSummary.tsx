
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type StageSummaryProps = {
  stage: number;
  stageScore: number;
  opponentName: string;
  opponentEmoji: string;
  opponentScore: number;
  onAdvanceStage: () => void;
};

const StageSummary: React.FC<StageSummaryProps> = ({
  stage,
  stageScore,
  opponentName,
  opponentEmoji,
  opponentScore,
  onAdvanceStage,
}) => (
  <Card className="max-w-xl w-full bg-gradient-to-tr from-fuchsia-100/80 to-yellow-100 border-pink-300/70 shadow-lg">
    <CardHeader>
      <CardTitle className="text-xl font-bold text-gradient bg-gradient-to-r from-fuchsia-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
        Stage {stage + 1} Complete!
      </CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col items-center">
      <div className="mb-4 text-3xl font-extrabold text-green-600">{stageScore} Points</div>
      <div className="mb-1 text-lg">Your Score this Stage</div>
      <div className="mb-2">
        <span className="text-base font-bold text-teal-600">
          {opponentName}
        </span>: {opponentScore} Points
      </div>
      <div className="mb-1">Advance to the next stage!</div>
      <Button onClick={onAdvanceStage}>Next Stage</Button>
    </CardContent>
  </Card>
);

export default StageSummary;
