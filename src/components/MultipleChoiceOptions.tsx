
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";

export type Option = { label: string; isCorrect: boolean };

type MultipleChoiceOptionsProps = {
  options: Option[];
  selected: number | null;
  showAnswer: boolean;
  onSelect: (idx: number) => void;
};

const MultipleChoiceOptions: React.FC<MultipleChoiceOptionsProps> = ({
  options,
  selected,
  showAnswer,
  onSelect,
}) => {
  const optionStyle = (idx: number) => {
    if (!showAnswer) return "hover:scale-105 hover:shadow-lg border-headspace-neutral-200 bg-white hover:bg-headspace-neutral-50 hover:border-headspace-orange/30";
    if (options[idx].isCorrect) return "bg-gradient-to-r from-headspace-green/20 to-headspace-green/10 border-headspace-green text-headspace-green-dark scale-105 shadow-lg";
    if (idx === selected) return "bg-gradient-to-r from-red-50 to-red-25 border-red-300 text-red-700";
    return "opacity-60 border-headspace-neutral-200";
  };

  return (
    <div className="flex flex-col gap-4 mb-4">
      {options.map((option, idx) => (
        <Button
          key={idx}
          onClick={() => onSelect(idx)}
          disabled={showAnswer}
          variant="outline"
          className={cn(
            "justify-start w-full border-2 text-base font-medium py-6 px-6 rounded-3xl transition-all duration-300",
            optionStyle(idx)
          )}
        >
          <span className="flex-1 text-left">{option.label}</span>
          {showAnswer && options[idx].isCorrect && (
            <CheckCircle className="ml-3 w-6 h-6 text-headspace-green" />
          )}
          {showAnswer && idx === selected && !options[idx].isCorrect && (
            <XCircle className="ml-3 w-6 h-6 text-red-500" />
          )}
        </Button>
      ))}
    </div>
  );
};

export default MultipleChoiceOptions;
