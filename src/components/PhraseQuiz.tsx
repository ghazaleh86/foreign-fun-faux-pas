import React, { useEffect, useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { CircleCheck, CircleX } from "lucide-react";
import { playWithElevenLabsTTS } from "@/lib/elevenlabsTtsClient";

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

type PhraseQuizProps = {
  opponentName: string;
  opponentEmoji: string;
};

const PhraseQuiz: React.FC<PhraseQuizProps> = ({ opponentName, opponentEmoji }) => {
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [state, setState] = useState<State>("loading");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [optionOrder, setOptionOrder] = useState<{ label: string; isCorrect: boolean }[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [animateResult, setAnimateResult] = useState<"right" | "wrong" | null>(null);

  const phrase = phrases[current];

  // Refs to avoid replaying sound when option is clicked
  const ttsRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const fetchPhrases = async () => {
      setState("loading");
      const { data, error } = await supabase
        .from("phrases")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);
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
      setAnimateResult(null);
    }
  }, [phrases, current, state]);

  // Play TTS when a new phrase is shown (replace browser TTS with ElevenLabs)
  useEffect(() => {
    if (!phrase || state !== "quiz") return;
    const ttsText = phrase.pronunciation || phrase.phrase_text;

    // Try ElevenLabs; fallback to browser TTS
    playWithElevenLabsTTS({ text: ttsText })
      .catch(() => {
        if ("speechSynthesis" in window) {
          const u = new window.SpeechSynthesisUtterance(ttsText);
          u.lang = guessSpeechLang(phrase.language);
          u.rate = 0.98;
          ttsRef.current = u;
          window.speechSynthesis.cancel(); // Stop any previous
          window.speechSynthesis.speak(u);
        }
      });
    // eslint-disable-next-line
  }, [phrase, state]);

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
      <Card className="max-w-xl w-full bg-gradient-to-tr from-pink-200/60 to-yellow-100/70 border-pink-300/60 shadow-fuchsia-200/40 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            🎉 Game Finished!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-5xl font-extrabold mb-1 text-gradient bg-gradient-to-r from-fuchsia-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent animate-fade-pop">
            {score} / {total}
          </div>
          <div className="mb-1">Your Score: {percent}%</div>
          <div className="mt-4 text-lg font-bold text-teal-700 flex items-center justify-center gap-2">
            <span className="text-2xl">{opponentEmoji}</span> {opponentName}: “Next time, I''ll bring my A-game!”
          </div>
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

  function guessSpeechLang(lang: string) {
    lang = lang.toLowerCase();
    if (lang.startsWith("fr")) return "fr-FR";
    if (lang.startsWith("de")) return "de-DE";
    if (lang.startsWith("es")) return "es-ES";
    if (lang.startsWith("ja") || lang.startsWith("jp")) return "ja-JP";
    if (lang.startsWith("ru")) return "ru-RU";
    if (lang.startsWith("th")) return "th-TH";
    if (lang.startsWith("it")) return "it-IT";
    if (lang.startsWith("sw")) return "sv-SE";
    return "en-US";
  }

  function handleSelect(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    setShowAnswer(true);

    if (optionOrder[idx].isCorrect) {
      setScore((s) => s + 1);
      setFeedback("🎉 Correct! You earned a point!");
      setAnimateResult("right");
    } else {
      setFeedback("❌ Wrong! " + randomWrongTaunt(opponentName));
      setAnimateResult("wrong");
    }
    // Play celebration sound/animation? (Optional)
  }

  function handleNext() {
    if (current + 1 < phrases.length) {
      setCurrent((c) => c + 1);
    } else {
      setState("finished");
    }
  }

  // Animations for correct/wrong
  const optionFlash = (idx: number) => {
    if (!showAnswer) return "";
    if (optionOrder[idx].isCorrect) return "bg-green-200 border-green-500 text-green-800 scale-105";
    if (idx === selected) return "bg-pink-200 border-pink-500 text-pink-800 animate-wiggle";
    return "opacity-70";
  };

  // For score bar
  const percent = phrases.length ? Math.round((score / phrases.length) * 100) : 0;

  // Playful wrong answer taunts
  function randomWrongTaunt(name: string) {
    const taunts = [
      `Better luck next time!`,
      `Oof! ${name} is still in the game!`,
      `Still one step behind ${name}!`,
      `Maybe try a random guess?`,
      `You can do it! Just not on this question.`,
    ];
    return taunts[Math.floor(Math.random() * taunts.length)];
  }

  return (
    <Card className="max-w-xl w-full shadow-2xl bg-white/90 border-2 border-pink-200/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gradient bg-gradient-to-r from-pink-500 via-fuchsia-500 to-yellow-400 bg-clip-text text-transparent text-2xl font-bold">
          <span className="text-2xl">{opponentEmoji}</span>
          Guess That Phrase! <span className="ml-2 text-base font-normal text-muted-foreground">(Phrase {current + 1} of {phrases.length})</span>
        </CardTitle>
        {/* Audio area */}
        {phrase &&
          <div className="flex flex-col items-center justify-center mt-1">
            {/* Animated sound waves */}
            <div className="flex gap-1 mb-2 scale-90">
              <div className="h-2 w-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:0.1s]" />
              <div className="h-3 w-2 rounded-full bg-pink-400 animate-bounce [animation-delay:0.2s]" />
              <div className="h-4 w-2 rounded-full bg-fuchsia-400 animate-bounce [animation-delay:0.3s]" />
            </div>
            <div className="text-lg font-semibold tracking-wide mb-0">{phrase.pronunciation ? <span className="italic">{phrase.pronunciation}</span> : phrase.phrase_text}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Language: <span className="font-bold">{phrase.language}</span>
            </div>
            <Button
              className="mt-2 px-5"
              variant="secondary"
              size="sm"
              onClick={() => {
                const ttsText = phrase.pronunciation || phrase.phrase_text;
                playWithElevenLabsTTS({ text: ttsText }).catch(() => {
                  if ("speechSynthesis" in window) {
                    window.speechSynthesis.cancel();
                    const u = new window.SpeechSynthesisUtterance(ttsText);
                    u.lang = guessSpeechLang(phrase.language);
                    u.rate = 0.98;
                    window.speechSynthesis.speak(u);
                  }
                });
              }}
            >
              🔈 Play Again
            </Button>
          </div>
        }
      </CardHeader>
      <CardContent>
        {/* Score bar */}
        <div className="mb-6 w-full h-3 bg-pink-100 rounded-lg overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-pink-300 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="flex flex-col gap-3 mb-2">
          {optionOrder.map((option, idx) => (
            <Button
              key={idx}
              onClick={() => handleSelect(idx)}
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
        {feedback && (
          <div
            className={cn(
              "text-center mt-5 text-lg font-semibold transition-all",
              animateResult === "right" ? "text-green-700 animate-pop" : "text-pink-700 animate-shake-fast"
            )}
          >
            {feedback}
          </div>
        )}
        {showAnswer && phrase.notes && (
          <div className="text-xs text-muted-foreground mt-2 text-center">
            <span className="inline-block rounded-full px-3 py-1 bg-yellow-100/60 font-mono">{phrase.notes}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div>
          Score: <span className="font-bold">{score}</span>
        </div>
        {showAnswer && (
          <Button onClick={handleNext} variant="default" className="animate-bounce">
            {current + 1 < phrases.length ? "Next" : "Finish"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PhraseQuiz;
