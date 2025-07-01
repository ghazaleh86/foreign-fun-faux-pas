
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleCheck, CircleX } from "lucide-react";

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
  const optionFlash = (idx: number) => {
    if (!showAnswer) return "";
    if (options[idx].isCorrect) return "bg-green-200 border-green-500 text-green-800 scale-105";
    if (idx === selected) return "bg-pink-200 border-pink-500 text-pink-800 animate-wiggle";
    return "opacity-70";
  };

  return (
    <div className="flex flex-col gap-3 mb-2">
      {options.map((option, idx) => (
        <Button
          key={idx}
          onClick={() => onSelect(idx)}
          disabled={showAnswer}
          variant="outline"
          className={cn(
            "justify-start w-full border-2 text-lg font-bold py-6 transition-all duration-200",
            showAnswer
              ? option.isCorrect
                ? "animate-bounce-in"
                : idx === selected
                ? "animate-shake"
                : ""
              : "hover:scale-105 hover:shadow-lg",
            optionFlash(idx)
          )}
        >
          {option.label}
          {showAnswer && option.isCorrect ? (
            <CircleCheck className="ml-3 text-green-500" />
          ) : showAnswer && idx === selected ? (
            <CircleX className="ml-3 text-red-400" />
          ) : null}
        </Button>
      ))}
    </div>
  );
};

export default MultipleChoiceOptions;
