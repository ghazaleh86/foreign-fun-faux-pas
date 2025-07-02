
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";
import { usePlayerProfile } from "@/hooks/usePlayerProfile";
import { hasActiveGame } from "@/utils/gameStateManager";

type GameActionButtonProps = {
  showOnHomePage?: boolean;
};

const GameActionButton: React.FC<GameActionButtonProps> = ({ showOnHomePage = false }) => {
  const { profile } = usePlayerProfile();
  const navigate = useNavigate();
  const [activeGame, setActiveGame] = useState(false);
  
  // Check for active game on mount and when location changes
  useEffect(() => {
    const gameState = hasActiveGame();
    console.log("🔍 GameActionButton: Checking active game state:", gameState);
    setActiveGame(gameState);
  }, []);

  // Don't show on home page by default
  if (showOnHomePage === false && window.location.pathname === "/") {
    return null;
  }

  const hasProgress = profile && (profile.xp > 0 || profile.current_streak > 0);
  
  const handleGameAction = () => {
    console.log("🎮 GameActionButton: Button clicked, activeGame:", activeGame);
    
    if (activeGame) {
      console.log("🎮 GameActionButton: Continuing active game");
      // Navigate with a query parameter to force game start
      navigate("/?startGame=true");
    } else {
      console.log("🎮 GameActionButton: Starting new game");
      // Regular navigation to home page
      navigate("/");
    }
  };
  
  return (
    <div className="fixed bottom-20 right-4 z-40">
      <Button
        variant="default"
        size="lg"
        className="h-14 px-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        onClick={handleGameAction}
      >
        {activeGame ? (
          <>
            <RotateCcw className="w-5 h-5 mr-2" />
            Continue
          </>
        ) : hasProgress ? (
          <>
            <RotateCcw className="w-5 h-5 mr-2" />
            Resume Game
          </>
        ) : (
          <>
            <Play className="w-5 h-5 mr-2" />
            Start Playing
          </>
        )}
      </Button>
    </div>
  );
};

export default GameActionButton;
