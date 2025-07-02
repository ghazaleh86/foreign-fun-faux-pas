
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gamepad2, BookOpen, Home } from "lucide-react";
import { usePlayerProfile } from "@/hooks/usePlayerProfile";
import { getLearnedPhrases } from "@/utils/learnedPhrases";
import { hasActiveGame } from "@/utils/gameStateManager";

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
    setActiveGame(hasActiveGame());
  }, [currentPath]);

  // Also check when the component mounts
  useEffect(() => {
    setActiveGame(hasActiveGame());
  }, []);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Check if there's an active game
    if (activeGame) {
      // If there's an active game, navigate with startGame parameter to continue
      navigate("/?startGame=true");
    } else {
      // If no active game, go to home page to start new game
      navigate("/");
    }
    
    // Update active game status after navigation
    setTimeout(() => {
      setActiveGame(hasActiveGame());
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
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-2 z-50">
      <div className="max-w-lg mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          
          // Handle Play button specially
          if (item.onClick) {
            return (
              <div key={item.path} className="flex-1">
                <Button
                  variant="ghost"
                  onClick={item.onClick}
                  className={`w-full h-14 flex flex-col items-center justify-center gap-1 rounded-xl transition-all duration-200 ${
                    item.isActive
                      ? "bg-pink-100 text-pink-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="relative">
                    <Icon 
                      className={`w-6 h-6 ${
                        item.isActive ? "text-pink-600" : "text-current"
                      }`} 
                    />
                    {item.badge && item.badge > 0 && (
                      <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {item.badge > 99 ? "99+" : item.badge}
                      </span>
                    )}
                  </div>
                  <span className={`text-xs font-medium ${
                    item.isActive ? "text-pink-600" : "text-current"
                  }`}>
                    {item.label}
                  </span>
                </Button>
              </div>
            );
          }
          
          // Handle other nav items with Link
          return (
            <Link key={item.path} to={item.path} className="flex-1">
              <Button
                variant="ghost"
                className={`w-full h-14 flex flex-col items-center justify-center gap-1 rounded-xl transition-all duration-200 ${
                  item.isActive
                    ? "bg-pink-100 text-pink-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="relative">
                  <Icon 
                    className={`w-6 h-6 ${
                      item.isActive ? "text-pink-600" : "text-current"
                    }`} 
                  />
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {item.badge > 99 ? "99+" : item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-xs font-medium ${
                  item.isActive ? "text-pink-600" : "text-current"
                }`}>
                  {item.label}
                </span>
              </Button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
