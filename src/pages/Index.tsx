
import React, { useState } from "react";
import PhraseQuiz from "../components/PhraseQuiz";
import { Button } from "@/components/ui/button";
import FakeOpponentBadge from "@/components/FakeOpponentBadge";
import MascotAvatar from "../components/MascotAvatar";
import { Gem } from "lucide-react"; // playful icon allowed
const OPPONENTS = [
  { name: "Pretentious Pete", emoji: "🎩" },
  { name: "GrandmaGPT", emoji: "👵" },
  { name: "Quizbot 3000", emoji: "🤖" },
  { name: "Shady Sheila", emoji: "🕶️" },
];

const Index = () => {
  const [started, setStarted] = useState(false);
  const [opponent, setOpponent] = useState(OPPONENTS[Math.floor(Math.random() * OPPONENTS.length)]);

  if (!started) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative">
        {/* Decorative glowing orbs */}
        <div className="hidden md:block absolute top-0 left-0 w-44 h-44 bg-gradient-to-br from-fuchsia-400 via-pink-400 to-yellow-300 opacity-30 blur-2xl rounded-full pointer-events-none -z-10" />
        <div className="hidden md:block absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-400 via-fuchsia-300 to-lime-200 opacity-20 blur-3xl rounded-full pointer-events-none -z-10" />

        {/* Mascot avatar in shining effect */}
        <div className="bg-card p-3 rounded-full shadow-playful mb-8 animate-pop">
          <MascotAvatar size={96} className="drop-shadow-lg" />
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-3 text-primary drop-shadow-lg font-rounded tracking-tight animate-pop"
            style={{ letterSpacing: "-0.02em" }}>
          Guess That Phrase!
        </h1>
        <div className="text-lg text-muted-foreground text-center mb-7 font-semibold max-w-xl">
          Listen, guess the **real** meaning, outsmart your AI opponent.<br/><span className="text-primary">Earn gems and streak rewards!</span>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-center w-full max-w-lg mb-6">
          {/* XP/Gem daily quest card */}
          <div className="flex-1 bg-card mt-4 rounded-3xl p-6 shadow-playful flex flex-col items-center gap-2 relative border border-fuchsia-400/40 animate-scale-in">
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center justify-center bg-fuchsia-100 rounded-full w-16 h-16 shadow animate-pop">
              <Gem className="text-gem" size={40} />
            </span>
            <div className="text-xs uppercase text-pink-400/90 font-bold tracking-wide">
              Daily Quest
            </div>
            <div className="text-2xl font-extrabold text-playpurple mb-2 font-rounded">
              Play 1 Game
            </div>
            <div className="flex gap-2 items-center text-xl font-bold text-gem mb-2">
              +10 <Gem size={20} className="inline text-gem" />
            </div>
            <div className="text-xs text-muted-foreground">First win each day = bonus XP</div>
          </div>
        </div>
        <FakeOpponentBadge name={opponent.name} emoji={opponent.emoji} />
        <Button
          className="mt-10 px-16 py-5 text-2xl rounded-full font-black bg-gradient-to-r from-fuchsia-500 via-pink-400 to-yellow-300 hover:scale-105 shadow-playful transition-all animate-bounce font-rounded tracking-wide"
          onClick={() => setStarted(true)}
          size="lg"
        >
          Start!
        </Button>
        <div className="mt-10 animate-fade-in text-muted-foreground text-xs">v1.0 — Lovable Demo</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <PhraseQuiz opponentName={opponent.name} opponentEmoji={opponent.emoji} />
    </div>
  );
};

export default Index;
