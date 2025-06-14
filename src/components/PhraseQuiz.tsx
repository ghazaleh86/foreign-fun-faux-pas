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

const ELEVENLABS_VOICES = [
  { name: "Aria", id: "9BWtsMINqrJLrRacOk9x" },
  { name: "Roger", id: "CwhRBWXzGAHq8TQ4Fs17" },
  { name: "Sarah", id: "EXAVITQu4vr4xnSDxMaL" },
  { name: "Laura", id: "FGY2WhTYpPnrIDTdsKH5" },
  { name: "Charlie", id: "IKne3meq5aSn9XLyUdCD" },
  { name: "George", id: "JBFqnCBsd6RMkjVDRZzb" },
  { name: "Callum", id: "N2lVS1w4EtoT3dr4eOWO" },
  { name: "Liam", id: "TX3LPaxmHKxFdv7VOQHJ" }
];

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

// Helper to handle localStorage for played phrase IDs
const LOCAL_STORAGE_KEY = "playedPhraseIds_v2"; // Version bump to prevent auto-resets

// Safely get/set localStorage
function getPlayedPhraseIds(): string[] {
  try {
    return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}
function setPlayedPhraseIds(ids: string[]) {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ids));
}

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

  // Step 1: On mount, fetch phrases NOT previously played
  useEffect(() => {
    const fetchPhrases = async () => {
      setState("loading");
      let playedIds: string[] = [];
      try {
        playedIds = getPlayedPhraseIds();
      } catch { playedIds = []; }

      const { data, error } = await supabase
        .from("phrases")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50); // Increase limit

      if (!data || error) {
        setPhrases([]);
        setState("quiz");
        setFeedback("Error fetching phrases. Please try again.");
      } else {
        // Remove all previously played phrases
        const unseen = data.filter((p: Phrase) => !playedIds.includes(p.id));
        setPhrases(unseen as Phrase[]);
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

  // Used to track the current step for voice cycling
  const getCurrentVoice = (idx: number) => ELEVENLABS_VOICES[idx % ELEVENLABS_VOICES.length].id;

  // Play TTS when a new phrase is shown, using alternated voices
  useEffect(() => {
    if (!phrase || state !== "quiz") return;
    const ttsText = phrase.pronunciation || phrase.phrase_text;
    const voiceId = getCurrentVoice(current);

    playWithElevenLabsTTS({ text: ttsText, voiceId })
      .catch(() => {
        if ("speechSynthesis" in window) {
          const u = new window.SpeechSynthesisUtterance(ttsText);
          u.lang = guessSpeechLang(phrase.language);
          u.rate = 0.98;
          ttsRef.current = u;
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(u);
        }
      });
    // eslint-disable-next-line
  }, [phrase, state, current]);

  if (state === "loading") {
    return (
      <div className="flex flex-col items-center">
        <div className="animate-pulse h-8 w-40 bg-muted rounded mb-6" />
        <div className="animate-pulse h-16 w-80 bg-muted rounded" />
      </div>
    );
  }

  if (state === "quiz" && phrases.length === 0) {
    // Show "all used" message
    return (
      <Card className="max-w-xl w-full">
        <CardContent className="p-6">
          <div className="text-center my-10 text-pink-700 font-bold">
            <p className="mb-2">
              You have played all available phrases!
              <br />
              To repeat, please clear your browser data (localStorage).
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (state === "finished") {
    const total = phrases.length;
    const percent = Math.round((score / total) * 100);

    // At "finished", update localStorage with just-played IDs
    useEffect(() => {
      if (total > 0 && phrases[0]?.id) {
        const playedIds = getPlayedPhraseIds();
        const currentIds = phrases.map(p => p.id);
        const merged = Array.from(new Set([...playedIds, ...currentIds]));
        setPlayedPhraseIds(merged);
      }
      // Only run once at finish
      // eslint-disable-next-line
    }, []);

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
            <span className="text-2xl">{opponentEmoji}</span> {opponentName}: “Next time, I'll bring my A-game!”
          </div>
          <div className="mt-4 text-pink-700 font-semibold text-base">
            {total === 0
              ? "You've played every phrase available! Please come back when new content is added, or clear your browser history to replay."
              : null}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => window.location.reload()}>
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
    if (lang.startsWith("pl")) return "pl-PL";
    if (lang.startsWith("vi")) return "vi-VN";
    if (lang.startsWith("tr")) return "tr-TR";
    if (lang.startsWith("ar")) return "ar-EG";
    if (lang.startsWith("ko")) return "ko-KR";
    if (lang.startsWith("no")) return "no-NO";
    if (lang.startsWith("fi")) return "fi-FI";
    if (lang.startsWith("af")) return "af-ZA";
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
    // No need to update played here; will be set after finish
  }

  function handleNext() {
    setCurrent((c) => c + 1);
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
                const voiceId = getCurrentVoice(current);
                playWithElevenLabsTTS({ text: ttsText, voiceId }).catch(() => {
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
              🔈 Play Again (Voice: {ELEVENLABS_VOICES[current % ELEVENLABS_VOICES.length].name})
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
          <Button onClick={handleNext} variant="default" className="animate-bounce" disabled={current + 1 >= phrases.length}>
            {current + 1 < phrases.length ? "Next" : "Finish"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PhraseQuiz;
