
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import BottomNavigation from "./components/BottomNavigation";
import GameActionButton from "./components/GameActionButton";
import Index from "./pages/Index";
import LearnedPhrases from "./pages/LearnedPhrases";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { audioManager } from "@/lib/tts/audioManager";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  // Check for any game-related view: active game or game states like stage summary
  const isGameView = location.search.includes("startGame=true") || 
                     location.pathname === "/" || 
                     (location.pathname === "/" && typeof window !== 'undefined' && localStorage.getItem('currentGameState_v1'));

  // Stop all audio when navigating between routes
  useEffect(() => {
    console.log('🔄 Route changed, stopping all audio');
    audioManager.stopAllAudio();
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200/60 to-fuchsia-100/90 overflow-hidden">
      <div className={`${isGameView ? '' : 'pb-20'} min-h-screen max-h-screen overflow-auto`}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/learned" element={<LearnedPhrases />} />
          <Route path="/about" element={<About />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      
      <BottomNavigation />
      <GameActionButton />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
