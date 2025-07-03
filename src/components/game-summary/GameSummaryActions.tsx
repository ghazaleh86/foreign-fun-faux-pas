import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type GameSummaryActionsProps = {
  onPlayAgain: () => void;
};

const GameSummaryActions: React.FC<GameSummaryActionsProps> = ({ onPlayAgain }) => {
  return (
    <div className="relative z-10">
      <Button
        onClick={onPlayAgain}
        variant="primary-cta"
        size="lg"
        className="w-full min-h-[56px] text-lg font-bold px-8 shadow-lg"
      >
        <span>Play Again</span>
        <ArrowRight className="ml-3 w-5 h-5" />
      </Button>
    </div>
  );
};

export default GameSummaryActions;