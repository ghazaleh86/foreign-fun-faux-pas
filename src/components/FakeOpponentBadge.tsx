
import React from "react";

const palette = [
  "bg-orange-200 text-orange-900",
  "bg-lime-200 text-lime-900",
  "bg-blue-100 text-blue-700",
  "bg-pink-200 text-pink-900",
];

const FakeOpponentBadge: React.FC<{ name: string; emoji: string }> = ({ name, emoji }) => {
  // Pick color based on name hash for variation
  const colorClass = palette[name.length % palette.length];
  return (
    <div
      className={`inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold shadow-md border border-white/70 ${colorClass} mb-6 scale-105`}
      style={{ fontSize: "1.15rem" }}
      aria-label={`Your opponent is ${name}`}
    >
      <span className="text-2xl">{emoji}</span>
      <span>{name}</span>
    </div>
  );
};

export default FakeOpponentBadge;
