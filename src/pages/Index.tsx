
import React, { useState, useEffect } from "react";
import PhraseQuiz from "../components/PhraseQuiz";
import { Button } from "@/components/ui/button";
import FakeOpponentBadge from "@/components/FakeOpponentBadge";
import MascotAvatar from "../components/MascotAvatar";

const Index = () => {
  const [started, setStarted] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  // Chippy is now the consistent opponent
  const opponent = { name: "Chippy", emoji: "🐿️" };

  useEffect(() => {
    if (!started) {
      const timer1 = setTimeout(() => setAnimationStep(1), 200);
      const timer2 = setTimeout(() => setAnimationStep(2), 600);
      const timer3 = setTimeout(() => setAnimationStep(3), 1000);
      const timer4 = setTimeout(() => setAnimationStep(4), 1400);
      const timer5 = setTimeout(() => setAnimationStep(5), 1800);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
        clearTimeout(timer5);
      };
    }
  }, [started]);

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-12 min-h-screen relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-3 h-3 bg-pink-300 rounded-full opacity-60 animate-bounce" style={{ animationDelay: "0s", animationDuration: "3s" }}></div>
          <div className="absolute top-32 right-16 w-2 h-2 bg-yellow-400 rounded-full opacity-50 animate-bounce" style={{ animationDelay: "1s", animationDuration: "2.5s" }}></div>
          <div className="absolute bottom-40 left-20 w-4 h-4 bg-purple-300 rounded-full opacity-40 animate-bounce" style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}></div>
          <div className="absolute bottom-20 right-10 w-3 h-3 bg-blue-300 rounded-full opacity-50 animate-bounce" style={{ animationDelay: "2s", animationDuration: "2s" }}></div>
        </div>

        {/* Enhanced Mascot with spotlight effect */}
        <div className={`relative transition-all duration-1000 ease-out ${
          animationStep >= 1 
            ? "opacity-100 transform translate-y-0 scale-100" 
            : "opacity-0 transform translate-y-8 scale-90"
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200 rounded-full blur-xl opacity-60 scale-150 animate-pulse"></div>
          <div className="relative">
            <MascotAvatar size={140} className="mb-8 ring-8 ring-yellow-300/30 shadow-2xl hover:scale-105 transition-transform duration-300" />
            {/* Sparkle effects around mascot */}
            <div className="absolute -top-2 -right-2 text-2xl animate-bounce" style={{ animationDelay: "0.5s" }}>✨</div>
            <div className="absolute -bottom-2 -left-2 text-xl animate-bounce" style={{ animationDelay: "1.5s" }}>🌟</div>
            <div className="absolute top-1/2 -right-6 text-lg animate-bounce" style={{ animationDelay: "1s" }}>💫</div>
          </div>
        </div>

        {/* Clean, readable title */}
        <div className={`text-center mb-6 transition-all duration-1000 ease-out ${
          animationStep >= 2 
            ? "opacity-100 transform translate-y-0" 
            : "opacity-0 transform translate-y-4"
        }`}>
          <h1 className="text-6xl font-black mb-4 text-gray-800 drop-shadow-lg">
            Guess that Phrase
          </h1>
          <div className="w-32 h-1 bg-pink-400 mx-auto rounded-full"></div>
        </div>

        {/* Updated subtitle to reference Chippy */}
        <div className={`text-center mb-10 transition-all duration-1000 ease-out ${
          animationStep >= 3 
            ? "opacity-100 transform translate-y-0" 
            : "opacity-0 transform translate-y-6"
        }`}>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl">
            Listen to a phrase, pick the right (or hilarious) meaning,<br />
            <span className="text-pink-600 font-semibold">and challenge Chippy the chipmunk! 🐿️</span>
          </p>
        </div>

        {/* Opponent badge with bounce entrance - now always showing Chippy */}
        <div className={`transition-all duration-1000 ease-out ${
          animationStep >= 4 
            ? "opacity-100 transform translate-y-0 scale-100" 
            : "opacity-0 transform translate-y-8 scale-75"
        }`}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-amber-200 rounded-full blur-lg opacity-50 scale-110"></div>
            <div className="relative">
              <FakeOpponentBadge name={opponent.name} emoji={opponent.emoji} />
            </div>
          </div>
        </div>

        {/* Start button with exciting entrance */}
        <div className={`mt-12 transition-all duration-1000 ease-out ${
          animationStep >= 5 
            ? "opacity-100 transform translate-y-0 scale-100" 
            : "opacity-0 transform translate-y-8 scale-90"
        }`}>
          <Button
            variant="primary-cta"
            onClick={() => setStarted(true)}
            size="xl"
          >
            <span className="flex items-center gap-3">
              🎮 Challenge Chippy
              <span className="text-3xl animate-bounce">🚀</span>
            </span>
          </Button>
        </div>

        {/* Bottom decorative wave */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-pink-100/30 to-transparent pointer-events-none"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start justify-center px-4 py-8">
      <PhraseQuiz opponentName={opponent.name} opponentEmoji={opponent.emoji} />
    </div>
  );
};

export default Index;
