
import React from "react";
import PhraseQuiz from "@/components/PhraseQuiz";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";

const Index = () => {
  const user = useSupabaseUser();
  
  // Show authentication prompt for non-logged in users
  if (!user) {
    return (
      <div className="flex items-center justify-center px-4 py-12">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">Welcome to Guess That Phrase!</h2>
            <p className="text-muted-foreground mb-6">
              Please sign in to start playing and track your learned phrases.
            </p>
            <Link to="/auth">
              <Button className="bg-pink-500 hover:bg-pink-600">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In to Play
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PhraseQuiz opponentName="Sophia" opponentEmoji="👩‍🎓" />
    </div>
  );
};

export default Index;
