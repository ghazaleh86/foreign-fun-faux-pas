
import React, { useState } from "react";
import PhraseQuiz from "../components/PhraseQuiz";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import FakeOpponentBadge from "@/components/FakeOpponentBadge";
import MascotAvatar from "../components/MascotAvatar";

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
      <div className="min-h-screen bg-gradient-to-br from-yellow-200/60 to-fuchsia-100/90 flex flex-col items-center justify-center px-4">
        <MascotAvatar size={124} className="mb-6" />
        <h1 className="text-5xl font-extrabold mb-4 text-pink-600 drop-shadow-[0_2px_8px_rgba(255,0,120,0.18)] animate-[pop_0.6s] text-center">
          Guess That Phrase!
        </h1>
        <div className="text-lg text-muted-foreground text-center mb-10">
          Listen to a phrase, pick the right (or hilarious) meaning, and beat your AI opponent!
        </div>
        <FakeOpponentBadge name={opponent.name} emoji={opponent.emoji} />
        <div className="flex flex-col gap-4 mt-12">
          <Button
            className="px-16 py-6 text-xl rounded-xl bg-gradient-to-r from-pink-400 to-yellow-300 hover:scale-105 hover:from-pink-500 hover:to-yellow-400 shadow-lg transition-all animate-bounce"
            onClick={() => setStarted(true)}
            size="lg"
          >
            Play
          </Button>
          <Link to="/learned">
            <Button
              variant="outline"
              className="px-12 py-4 text-lg rounded-xl border-2 border-pink-300 hover:bg-pink-50 shadow-md transition-all"
              size="lg"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              My Learned Phrases
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200/60 to-fuchsia-100/90 flex flex-col items-start justify-center px-4">
      {/* Main quiz area is now always centered, and header won't overlap */}
      <PhraseQuiz opponentName={opponent.name} opponentEmoji={opponent.emoji} />
    </div>
  );
};

export default Index;
