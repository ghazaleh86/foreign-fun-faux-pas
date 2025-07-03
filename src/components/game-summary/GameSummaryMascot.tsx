import React from "react";
import MascotAvatar from "../MascotAvatar";

const GameSummaryMascot: React.FC = () => {
  return (
    <div className="relative z-10">
      <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full p-6 shadow-lg mx-auto w-28 h-28 flex items-center justify-center border-2 border-yellow-200 animate-scale-in">
        <MascotAvatar size={72} className="ring-0 hover:scale-110 transition-transform duration-300" />
      </div>
    </div>
  );
};

export default GameSummaryMascot;