
import React from "react";

const FakeOpponentBadge: React.FC<{ name: string; emoji: string }> = ({ name, emoji }) => {
  // Special styling for Buddy (mindful companion)
  const isBuddy = name === "Buddy";
  const colorClass = isBuddy 
    ? "bg-gradient-to-r from-headspace-green/20 to-headspace-blue/20 text-headspace-neutral-700 border-headspace-green/30 shadow-lg" 
    : "bg-gradient-to-r from-headspace-orange/20 to-headspace-yellow/20 text-headspace-neutral-700 border-headspace-orange/30 shadow-lg";

  return (
    <div
      className={`inline-flex items-center gap-4 px-8 py-4 rounded-3xl font-medium border-2 ${colorClass} mb-8 scale-105 transition-all duration-300 hover:scale-110 backdrop-blur-sm`}
      style={{ fontSize: "1.1rem" }}
      aria-label={`Your learning companion is ${name}`}
    >
      <span className="text-3xl animate-breathe" style={{ animationDuration: "4s" }}>{emoji}</span>
      <div className="flex flex-col items-center">
        <span className="text-xs font-light opacity-75 uppercase tracking-wide">Learning with</span>
        <span className="font-semibold">{name}</span>
      </div>
    </div>
  );
};

export default FakeOpponentBadge;
