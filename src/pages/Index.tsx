
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PhraseQuiz from "../components/PhraseQuiz";
import { Button } from "@/components/ui/button";
import MascotAvatar from "../components/MascotAvatar";
import { hasActiveGame, clearGameState } from "@/utils/gameStateManager";
import { Home } from "lucide-react";

const Index = () => {
  const [started, setStarted] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [searchParams] = useSearchParams();

  // Chippy is now the consistent opponent
  const opponent = { name: "Chippy", emoji: "🐿️" };

  // Check for active game on mount and handle forced start
  useEffect(() => {
    console.log("🏠 Index: Checking for active game on mount");
    const shouldStartGame = searchParams.get("startGame") === "true";
    
    if (hasActiveGame() || shouldStartGame) {
      console.log("🎮 Index: Active game found or forced start, starting directly");
      setStarted(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!started && !hasActiveGame()) {
      const timer1 = setTimeout(() => setAnimationStep(1), 200);
      const timer2 = setTimeout(() => setAnimationStep(2), 600);
      const timer3 = setTimeout(() => setAnimationStep(3), 1000);
      const timer4 = setTimeout(() => setAnimationStep(4), 1400);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [started]);

  console.log("🔍 Index render: started =", started, "hasActiveGame =", hasActiveGame());
  
  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-4 min-h-screen relative overflow-hidden">
        {/* Floating background elements - reduced size */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-8 w-2 h-2 bg-pink-300 rounded-full opacity-60 animate-bounce" style={{ animationDelay: "0s", animationDuration: "3s" }}></div>
          <div className="absolute top-24 right-12 w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-50 animate-bounce" style={{ animationDelay: "1s", animationDuration: "2.5s" }}></div>
          <div className="absolute bottom-32 left-16 w-3 h-3 bg-purple-300 rounded-full opacity-40 animate-bounce" style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}></div>
          <div className="absolute bottom-16 right-8 w-2 h-2 bg-blue-300 rounded-full opacity-50 animate-bounce" style={{ animationDelay: "2s", animationDuration: "2s" }}></div>
        </div>

        {/* Enhanced Chippy Hero Image with spotlight effect */}
        <div className={`relative transition-all duration-1000 ease-out ${
          animationStep >= 1 
            ? "opacity-100 transform translate-y-0 scale-100" 
            : "opacity-0 transform translate-y-8 scale-90"
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200 rounded-full blur-xl opacity-60 scale-150 animate-pulse"></div>
          <div className="relative">
            <div className="w-28 h-28 md:w-52 md:h-52 rounded-full overflow-hidden mb-4 md:mb-6 hover:scale-105 transition-transform duration-300">
              <img 
                src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXk3bzJmeXU4eGM5OThzZThvaGk3cTN2bTl5OG50M3ptMGVld2lqZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/T4xp0C3qwSLw9KoeEZ/giphy.gif" 
                alt="Chippy the Chipmunk - Animated Learning Companion" 
                className="w-full h-full object-cover animate-fade-in"
              />
            </div>
            {/* Sparkle effects around Chippy */}
            <div className="absolute -top-1 -right-1 text-lg md:text-2xl animate-bounce" style={{ animationDelay: "0.5s" }}>✨</div>
            <div className="absolute -bottom-1 -left-1 text-base md:text-xl animate-bounce" style={{ animationDelay: "1.5s" }}>🌟</div>
            <div className="absolute top-1/2 -right-4 md:-right-8 text-sm md:text-lg animate-bounce" style={{ animationDelay: "1s" }}>💫</div>
          </div>
        </div>

        {/* Clean, readable title - reduced size */}
        <div className={`text-center mb-4 transition-all duration-1000 ease-out ${
          animationStep >= 2 
            ? "opacity-100 transform translate-y-0" 
            : "opacity-0 transform translate-y-4"
        }`}>
          <h1 className="text-4xl md:text-6xl font-game text-gray-800 drop-shadow-lg">
            Guess that Phrase
          </h1>
          <div className="w-24 h-1 bg-pink-400 mx-auto rounded-full"></div>
        </div>

        {/* Updated subtitle to reference Chippy - reduced size */}
        <div className={`text-center mb-6 transition-all duration-1000 ease-out ${
          animationStep >= 3 
            ? "opacity-100 transform translate-y-0" 
            : "opacity-0 transform translate-y-6"
        }`}>
          <p className="text-base md:text-xl text-slate-600 font-medium leading-loose max-w-xl px-4">
            Listen to a phrase, pick the right (or hilarious) meaning,<br />
            <span className="text-pink-600 font-semibold">and challenge Chippy the chipmunk! 🐿️</span>
          </p>
        </div>

        {/* Start button with exciting entrance - reduced spacing */}
        <div className={`mt-6 transition-all duration-1000 ease-out ${
          animationStep >= 4 
            ? "opacity-100 transform translate-y-0 scale-100" 
            : "opacity-0 transform translate-y-8 scale-90"
        }`}>
          <Button
            variant="primary-cta"
            onClick={() => {
              console.log("Challenge Chippy button clicked! Setting started to true");
              setStarted(true);
            }}
            size="lg"
          >
            <span className="flex items-center gap-3">
              🎮 Challenge Chippy
              <span className="text-2xl animate-bounce">🚀</span>
            </span>
          </Button>
        </div>

        {/* Bottom decorative wave - reduced height */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-pink-100/30 to-transparent pointer-events-none"></div>
      </div>
    );
  }

  const handleBackToLanding = () => {
    clearGameState();
    setStarted(false);
    setAnimationStep(0);
  };

  console.log("🎮 Rendering game view with PhraseQuiz");
  
  return (
    <div className="flex flex-col items-start justify-center px-4 py-4">
      {/* Back to Landing Button */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={handleBackToLanding}
          className="bg-white/90 backdrop-blur-sm border-pink-300 hover:bg-pink-50 shadow-lg"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Start
        </Button>
      </div>
      
      <PhraseQuiz opponentName={opponent.name} opponentEmoji={opponent.emoji} />
    </div>
  );
};

export default Index;
