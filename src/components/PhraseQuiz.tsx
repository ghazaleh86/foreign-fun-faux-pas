
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

type Phrase = {
  id: string;
  phrase_text: string;
  language: string;
  pronunciation: string | null;
  correct_meaning: string;
  incorrect1: string;
  incorrect2: string;
  notes: string | null;
};

type State = "loading" | "quiz" | "finished";

const getShuffledOptions = (phrase: Phrase) => {
  // Shuffle correct and incorrect meanings
  const options = [
    { label: phrase.correct_meaning, isCorrect: true },
    { label: phrase.incorrect1, isCorrect: false },
    { label: phrase.incorrect2, isCorrect: false },
  ];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
};

const PhraseQuiz: React.FC = () => {
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [state, setState] = useState<State>("loading");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [optionOrder, setOptionOrder] = useState<{ label: string; isCorrect: boolean }[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhrases = async () => {
      setState("loading");
      const { data, error } = await supabase
        .from("phrases")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);
      if (error) {
        setPhrases([]);
        setState("quiz");
        setFeedback("Error fetching phrases. Please try again.");
      } else {
        setPhrases(data as Phrase[]);
        setState("quiz");
      }
    };
    fetchPhrases();
  }, []);

  useEffect(() => {
    if (phrases.length > 0 && state === "quiz") {
      setOptionOrder(getShuffledOptions(phrases[current]));
      setSelected(null);
      setShowAnswer(false);
      setFeedback(null);
    }
  }, [phrases, current, state]);

  if (state === "loading") {
    return (
      <div className="flex flex-col items-center">
        <div className="animate-pulse h-8 w-40 bg-muted rounded mb-6" />
        <div className="animate-pulse h-16 w-80 bg-muted rounded" />
      </div>
    );
  }

  if (state === "quiz" && phrases.length === 0) {
    return (
      <Card className="max-w-xl w-full">
        <CardContent className="p-6">
          <div className="text-center my-10">
            <p className="mb-2">No phrases found.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (state === "finished") {
    const total = phrases.length;
    const percent = Math.round((score / total) * 100);
    return (
      <Card className="max-w-xl w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Quiz Finished!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-6xl font-bold mb-4">{score} / {total}</div>
          <div className="mb-1">Your Score: {percent}%</div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => {
            setCurrent(0);
            setScore(0);
            setState("quiz");
          }}>
            Play Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const phrase = phrases[current];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowAnswer(true);
    if (optionOrder[idx].isCorrect) {
      setScore((s) => s + 1);
      setFeedback("🎉 Correct!");
    } else {
      setFeedback("❌ Wrong!");
    }
  };

  const handleNext = () => {
    if (current + 1 < phrases.length) {
      setCurrent((c) => c + 1);
    } else {
      setState("finished");
    }
  };

  return (
    <Card className="max-w-xl w-full shadow-md">
      <CardHeader>
        <CardTitle>
          Phrase {current + 1} of {phrases.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex flex-col items-center">
          <div className="text-lg font-semibold">{phrase.phrase_text}</div>
          {phrase.pronunciation && (
            <div className="text-sm italic text-muted-foreground mb-2">
              {phrase.pronunciation}
            </div>
          )}
          <div className="text-xs text-muted-foreground mb-4">
            Language: {phrase.language}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {optionOrder.map((option, idx) => (
            <Button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={showAnswer}
              variant={
                showAnswer
                  ? option.isCorrect
                    ? "secondary"
                    : idx === selected
                    ? "destructive"
                    : "outline"
                  : "outline"
              }
              className={cn(
                "justify-start w-full",
                showAnswer && idx === selected && !option.isCorrect && "animate-shake"
              )}
            >
              {option.label}
            </Button>
          ))}
        </div>
        {feedback && (
          <div
            className={cn(
              "text-center mt-6 text-lg font-medium",
              feedback.startsWith("🎉") ? "text-green-600" : "text-red-600"
            )}
          >
            {feedback}
          </div>
        )}
        {showAnswer && phrase.notes && (
          <div className="text-xs text-muted-foreground mt-2 text-center">
            {phrase.notes}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div>
          Score: <span className="font-bold">{score}</span>
        </div>
        {showAnswer && (
          <Button onClick={handleNext} variant="default">
            {current + 1 < phrases.length ? "Next" : "Finish"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PhraseQuiz;
