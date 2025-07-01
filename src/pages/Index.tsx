
import React, { useState, useEffect } from "react";
import PhraseQuiz from "../components/PhraseQuiz";
import { Button } from "@/components/ui/button";
import MascotAvatar from "../components/MascotAvatar";

const Index = () => {
  const [started, setStarted] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  // Buddy is now our mindful companion
  const companion = { name: "Buddy", emoji: "🧘‍♂️" };

  useEffect(() => {
    if (!started) {
      const timer1 = setTimeout(() => setAnimationStep(1), 300);
      const timer2 = setTimeout(() => setAnimationStep(2), 800);
      const timer3 = setTimeout(() => setAnimationStep(3), 1200);
      const timer4 = setTimeout(() => setAnimationStep(4), 1600);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [started]);

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 min-h-screen relative overflow-hidden">
        {/* Gentle floating background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-12 w-4 h-4 bg-headspace-orange/20 rounded-full animate-float-gentle" style={{ animationDelay: "0s" }}></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-headspace-blue/20 rounded-full animate-float-gentle" style={{ animationDelay: "2s" }}></div>
          <div className="absolute bottom-40 left-16 w-5 h-5 bg-headspace-green/20 rounded-full animate-float-gentle" style={{ animationDelay: "1s" }}></div>
          <div className="absolute bottom-32 right-16 w-3 h-3 bg-headspace-purple/20 rounded-full animate-float-gentle" style={{ animationDelay: "3s" }}></div>
        </div>

        {/* Mindful mascot with soft glow */}
        <div className={`relative transition-all duration-1000 ease-out ${
          animationStep >= 1 
            ? "opacity-100 transform translate-y-0 scale-100" 
            : "opacity-0 transform translate-y-6 scale-95"
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-headspace-orange/10 via-headspace-blue/10 to-headspace-orange/10 rounded-full blur-2xl scale-150 animate-pulse-soft"></div>
          <div className="relative">
            <MascotAvatar size={120} className="mb-8 ring-4 ring-headspace-orange/20 shadow-2xl hover:scale-105 transition-transform duration-500" />
            {/* Gentle sparkles */}
            <div className="absolute -top-1 -right-1 text-lg animate-breathe" style={{ animationDelay: "0.5s" }}>✨</div>
            <div className="absolute -bottom-1 -left-1 text-sm animate-breathe" style={{ animationDelay: "2s" }}>🌟</div>
          </div>
        </div>

        {/* Calm, centered title */}
        <div className={`text-center mb-8 transition-all duration-1000 ease-out ${
          animationStep >= 2 
            ? "opacity-100 transform translate-y-0" 
            : "opacity-0 transform translate-y-4"
        }`}>
          <h1 className="text-5xl font-light mb-4 text-headspace-neutral-800 tracking-wide">
            Mindful Language
          </h1>
          <div className="w-24 h-0.5 bg-headspace-orange mx-auto rounded-full"></div>
        </div>

        {/* Gentle, encouraging subtitle */}
        <div className={`text-center mb-12 transition-all duration-1000 ease-out ${
          animationStep >= 3 
            ? "opacity-100 transform translate-y-0" 
            : "opacity-0 transform translate-y-6"
        }`}>
          <p className="text-lg text-headspace-neutral-600 font-light leading-relaxed max-w-lg">
            Take a moment to listen, breathe, and discover the meaning behind each phrase.<br />
            <span className="text-headspace-orange font-medium">Let's learn together with Buddy 🧘‍♂️</span>
          </p>
        </div>

        {/* Calming start button */}
        <div className={`mt-8 transition-all duration-1000 ease-out ${
          animationStep >= 4 
            ? "opacity-100 transform translate-y-0 scale-100" 
            : "opacity-0 transform translate-y-8 scale-95"
        }`}>
          <Button
            variant="primary-cta"
            onClick={() => setStarted(true)}
            size="xl"
            className="group"
          >
            <span className="flex items-center gap-3">
              🌱 Begin Your Journey
              <span className="text-2xl group-hover:animate-gentle-bounce">→</span>
            </span>
          </Button>
        </div>

        {/* Soft bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-headspace-blue/5 to-transparent pointer-events-none"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start justify-center px-4 py-8">
      <PhraseQuiz opponentName={companion.name} opponentEmoji={companion.emoji} />
    </div>
  );
};

export default Index;
