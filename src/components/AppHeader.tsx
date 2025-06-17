
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Gamepad, LogIn, LogOut, User } from "lucide-react";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { supabase } from "@/integrations/supabase/client";
import MascotAvatar from "./MascotAvatar";

const AppHeader = () => {
  const location = useLocation();
  const user = useSupabaseUser();
  const isHomePage = location.pathname === "/";
  const isLearnedPage = location.pathname === "/learned";
  const isAuthPage = location.pathname === "/auth";

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-pink-200 px-4 py-3 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <MascotAvatar size={40} />
          <h1 className="text-xl font-bold text-pink-600">
            Guess That Phrase!
          </h1>
        </Link>
        
        <nav className="flex items-center gap-2">
          <Link to="/">
            <Button
              variant={isHomePage ? "default" : "outline"}
              size="sm"
              className={isHomePage ? "bg-pink-500 hover:bg-pink-600" : "border-pink-300 hover:bg-pink-50"}
            >
              <Gamepad className="w-4 h-4 mr-2" />
              Play Game
            </Button>
          </Link>
          
          {user && (
            <Link to="/learned">
              <Button
                variant={isLearnedPage ? "default" : "outline"}
                size="sm"
                className={isLearnedPage ? "bg-pink-500 hover:bg-pink-600" : "border-pink-300 hover:bg-pink-50"}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                My Phrases
              </Button>
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-2 ml-2">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <User className="w-4 h-4" />
                {user.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="border-pink-300 hover:bg-pink-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button
                variant={isAuthPage ? "default" : "outline"}
                size="sm"
                className={isAuthPage ? "bg-pink-500 hover:bg-pink-600" : "border-pink-300 hover:bg-pink-50"}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
