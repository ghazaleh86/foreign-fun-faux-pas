import React from "react";

type GameSummaryBattleResultsProps = {
  playerTotal: number;
  opponentTotal: number;
  opponentName: string;
  playerWon: boolean;
  isTie: boolean;
};

const GameSummaryBattleResults: React.FC<GameSummaryBattleResultsProps> = ({
  playerTotal,
  opponentTotal,
  opponentName,
  playerWon,
  isTie,
}) => {
  return (
    <div className="relative z-10 space-y-4">
      <h2 className="text-lg font-bold text-gray-800">Final Battle Results</h2>
      
      <div className="flex items-center justify-center gap-6">
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
        
        <div className="text-xl font-black text-gray-300 px-2">VS</div>
        
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
  );
};

export default GameSummaryBattleResults;