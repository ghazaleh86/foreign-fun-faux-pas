import React from "react";

type GameSummaryMessagesProps = {
  opponentEmoji: string;
  opponentName: string;
  total: number;
};

const GameSummaryMessages: React.FC<GameSummaryMessagesProps> = ({
  opponentEmoji,
  opponentName,
  total,
}) => {
  return (
    <div className="relative z-10 space-y-4">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200">
        <div className="text-lg font-bold text-blue-700 flex items-center justify-center gap-3">
          <span className="text-3xl">{opponentEmoji}</span> 
          <div className="text-center">
            <div className="font-black">{opponentName}</div>
            <div className="text-sm font-medium">"Amazing game! You're getting stronger!"</div>
          </div>
        </div>
      </div>

      {total === 0 && (
        <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200">
          <div className="text-orange-700 font-semibold text-base">
            🎯 You've mastered all available phrases! Check back for new content or clear your browser history to replay.
          </div>
        </div>
      )}
    </div>
  );
};

export default GameSummaryMessages;