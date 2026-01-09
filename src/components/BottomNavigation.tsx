
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gamepad2, BookOpen, Info } from "lucide-react";
import { usePlayerProfile } from "@/hooks/usePlayerProfile";
import { getLearnedPhrases } from "@/utils/learnedPhrases";
import { loadGameState as loadNewGameState } from "@/game/storage";

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = usePlayerProfile();
  const currentPath = location.pathname;
  const [activeGame, setActiveGame] = useState(false);
  
  // Get the actual count from localStorage
  const learnedPhrasesCount = getLearnedPhrases().length;

  // Check for active game on mount and when route changes
  useEffect(() => {
    const gameState = !!loadNewGameState();
    console.log("🔍 BottomNavigation: Checking active game state:", gameState);
    console.log("🔍 BottomNavigation: Current path:", currentPath);
    setActiveGame(gameState);
  }, [currentPath]);

  // Also check when the component mounts
  useEffect(() => {
    const gameState = !!loadNewGameState();
    console.log("🔍 BottomNavigation: Initial active game check:", gameState);
    setActiveGame(gameState);
  }, []);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    console.log("🎮 BottomNavigation: Play button clicked, activeGame:", activeGame);
    
    // Check if there's an active game
    if (activeGame) {
      console.log("🎮 BottomNavigation: Continuing active game");
      // If there's an active game, navigate with startGame parameter to continue
      navigate("/?startGame=true");
    } else {
      console.log("🎮 BottomNavigation: Starting new game");
      // If no active game, go to home page to start new game
      navigate("/");
    }
    
    // Update active game status after navigation
    setTimeout(() => {
      const newGameState = !!loadNewGameState();
      console.log("🔄 BottomNavigation: Updated game state after navigation:", newGameState);
      setActiveGame(newGameState);
    }, 100);
  };

  const navItems = [
    {
      path: "/",
      label: activeGame ? "Continue" : "Play",
      icon: Gamepad2,
      isActive: currentPath === "/",
      onClick: handlePlayClick,
    },
    {
      path: "/learned",
      label: "My Phrases",  
      icon: BookOpen,
      isActive: currentPath === "/learned",
      badge: learnedPhrasesCount,
    },
    {
      path: "/about",
      label: "About",
      icon: Info,
      isActive: currentPath === "/about",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 px-4 py-2 z-50">
      <div className="max-w-lg mx-auto hotbar game-panel-inset px-3 py-2 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          
          // Handle Play button specially
          if (item.onClick) {
            return (
              <div key={item.path} className="flex-1">
                <Button
                  variant="ghost"
                  onClick={item.onClick}
                  className={`w-full h-14 flex flex-col items-center justify-center gap-1 transition-all duration-200 font-pixel text-[10px] uppercase tracking-wide ${
                    item.isActive
                      ? "bg-yellow-200/70 text-black"
                      : "text-black/70 hover:text-black hover:bg-white/40"
                  }`}
                >
                  <div className="relative">
                    <Icon 
                      className={`w-6 h-6 ${
                        item.isActive ? "text-black" : "text-current"
                      }`} 
                    />
                    {item.badge && item.badge > 0 && (
                      <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {item.badge > 99 ? "99+" : item.badge}
                      </span>
                    )}
                  </div>
                  <span className={`${item.isActive ? "text-black" : "text-current"}`}>{item.label}</span>
                </Button>
              </div>
            );
          }
          
          // Handle other nav items with Link
          return (
            <Link key={item.path} to={item.path} className="flex-1">
              <Button
                variant="ghost"
                className={`w-full h-14 flex flex-col items-center justify-center gap-1 transition-all duration-200 font-pixel text-[10px] uppercase tracking-wide ${
                  item.isActive
                    ? "bg-yellow-200/70 text-black"
                    : "text-black/70 hover:text-black hover:bg-white/40"
                }`}
              >
                <div className="relative">
                  <Icon 
                    className={`w-6 h-6 ${
                      item.isActive ? "text-black" : "text-current"
                    }`} 
                  />
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {item.badge > 99 ? "99+" : item.badge}
                    </span>
                  )}
                </div>
                <span className={`${item.isActive ? "text-black" : "text-current"}`}>{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
