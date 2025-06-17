
import React from "react";

const FakeOpponentBadge: React.FC<{ name: string; emoji: string }> = ({ name, emoji }) => {
  // Special styling for Chippy
  const isChippy = name === "Chippy";
  const colorClass = isChippy 
    ? "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 border-amber-300 shadow-amber-200/50" 
    : "bg-orange-200 text-orange-900 border-orange-300 shadow-orange-200/40";

  return (
    <div
      className={`inline-flex items-center gap-3 px-6 py-3 rounded-full font-bold shadow-lg border-2 ${colorClass} mb-6 scale-105 transition-all duration-300 hover:scale-110`}
      style={{ fontSize: "1.2rem" }}
      aria-label={`Your opponent is ${name}`}
    >
      <span className="text-3xl animate-bounce" style={{ animationDuration: "2s" }}>{emoji}</span>
      <div className="flex flex-col items-center">
        <span className="text-sm font-medium opacity-75">Challenge</span>
        <span className="font-black">{name}</span>
      </div>
    </div>
  );
};

export default FakeOpponentBadge;
