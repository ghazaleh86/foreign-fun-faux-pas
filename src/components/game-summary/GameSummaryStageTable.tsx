import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type GameSummaryStageTableProps = {
  totalStages: number;
  stageScores: number[];
  opponentScores: number[];
  opponentName: string;
};

const GameSummaryStageTable: React.FC<GameSummaryStageTableProps> = ({
  totalStages,
  stageScores,
  opponentScores,
  opponentName,
}) => {
  return (
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
  );
};

export default GameSummaryStageTable;