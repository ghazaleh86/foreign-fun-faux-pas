import React, { useEffect, useState, useRef } from "react";
import {
  Card, CardHeader, CardTitle, CardContent, CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { CircleCheck, CircleX } from "lucide-react";
import { playWithElevenLabsTTS } from "@/lib/elevenlabsTtsClient";
import { guessSpeechLang } from "@/utils/guessSpeechLang";
import StageSummary from "./StageSummary";
import GameSummary from "./GameSummary";
import StagePreview from "./StagePreview";

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

const STAGE_SIZE = 10;

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

  // For new: stage logic!
  const [stage, setStage] = useState(0); // Index (0-based)
  const [stageScores, setStageScores] = useState<number[]>([]);
  const [stageTimes, setStageTimes] = useState<number[]>([]);
  const [stageCompleted, setStageCompleted] = useState(false);
  const [opponentScores, setOpponentScores] = useState<number[]>([]);
  const [stageBonus, setStageBonus] = useState<number>(0);

  // Timer for fast/slow bonus logic
  const [timer, setTimer] = useState<number>(0); // seconds timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const questionTimeStarted = useRef<number>(Date.now());

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

  // Staging logic
  const totalStages = Math.ceil(phrases.length / STAGE_SIZE);
  const currentStageStart = stage * STAGE_SIZE;
  const currentStageEnd = Math.min(currentStageStart + STAGE_SIZE, phrases.length);
  const currentStageIndexes = Array.from({ length: currentStageEnd - currentStageStart }, (_, i) => currentStageStart + i);

  // Map current "current" to stage
  useEffect(() => {
    const nextStageIdx = Math.floor(current / STAGE_SIZE);
    if (nextStageIdx !== stage) setStage(nextStageIdx);
    // If we finished a stage
    if ((current % STAGE_SIZE === 0 && current !== 0) && state === "quiz") {
      setStageCompleted(true);
    }
    // eslint-disable-next-line
  }, [current]);

  // Reset/prepare for each stage
  useEffect(() => {
    setStageCompleted(false);
    setStageBonus(0);
  }, [stage]);

  // Setup timer for speed-bonus every question
  useEffect(() => {
    if (!phrase || state !== "quiz" || showAnswer) return;
    setTimer(0);
    questionTimeStarted.current = Date.now();
    if (timerRef.current) clearInterval(timerRef.current as any);
    timerRef.current = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current as any);
    };
    // eslint-disable-next-line
  }, [current, phrase, state, showAnswer]);

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

  // ===============================
  // *** AUDIO PLAYBACK CONTROL LOGIC ***
  // ===============================

  // Ref to block duplicate playback for a given question
  const audioPlayedForStep = useRef<number | null>(null);

  // Play TTS when a new phrase is shown, using alternated voices
  useEffect(() => {
    // Only play if: quiz is running, not in stage preview, not completed, not revealing answer
    if (!phrase || state !== "quiz" || showAnswer || showStagePreview || stageCompleted) return;
    // Prevent duplicate playback for current
    if (audioPlayedForStep.current === current) return;
    audioPlayedForStep.current = current;

    const ttsText = phrase.pronunciation || phrase.phrase_text;
    const voiceId = getCurrentVoice(current);

    console.log("Playing TTS for step", current, "phrase:", ttsText, "voice:", voiceId);

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
  }, [phrase, state, current, showStagePreview, showAnswer, stageCompleted]);

  // When advancing to the next step, allow playback again
  useEffect(() => {
    audioPlayedForStep.current = null;
  }, [current, state, showStagePreview, stageCompleted]);

  // Remove the OLD (duplicate) effect that played TTS immediately after question changed!
  // (the original effect was this, but it's now replaced above:)
  /*
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
  */

  // Add: stage preview state
  const [showStagePreview, setShowStagePreview] = useState(true);

  // ADD THIS FUNCTION TO FIX THE ERROR
  function handleStartStage() {
    setShowStagePreview(false);
  }

  // Fix: only play audio when we're NOT in preview, and NOT in stage-completed UI
  useEffect(() => {
    if (!phrase || state !== "quiz" || showAnswer || showStagePreview || stageCompleted) return;
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
  }, [phrase, state, current, showStagePreview, showAnswer, stageCompleted]);

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

  // Calculating per stage score
  const currentStageScore = stageScores[stage] || 0;
  const currentOpponentScore = opponentScores[stage] || 0;
  const percent = phrases.length ? Math.round((score / phrases.length) * 100) : 0;

  // Award points based on the response time (faster = more)
  function computeSpeedBonus(secondsElapsed: number): number {
    // <3s = 3pts, <7s=2pts, else 1pt for correct
    if (secondsElapsed < 3) return 3;
    if (secondsElapsed < 7) return 2;
    return 1;
  }

  function handleSelect(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    setShowAnswer(true);

    let timeTaken = Math.floor((Date.now() - questionTimeStarted.current) / 1000);

    // Award points based on speed
    if (optionOrder[idx].isCorrect) {
      const bonus = computeSpeedBonus(timeTaken);
      setScore((s) => s + bonus);

      setStageBonus((prev) => prev + bonus);
      updateStageScores(stage, bonus);
      setFeedback(`🎉 Correct! (+${bonus}pt${bonus > 1 ? "s" : ""}) Time: ${timeTaken}s`);
      setAnimateResult("right");
    } else {
      // For opponent: assume they get 1pt randomly 70% of time on user misses
      const opponentGotIt = Math.random() < 0.7 ? 1 : 0;
      updateOpponentScores(stage, opponentGotIt);
      setFeedback("❌ Wrong! " + randomWrongTaunt(opponentName));
      setAnimateResult("wrong");
    }
    // No need to update played IDs here, handled at quiz end.
    if (timerRef.current) clearInterval(timerRef.current as any);
  }

  // Update stage score arrays
  function updateStageScores(idx: number, pts: number) {
    setStageScores((arr) => {
      const next = [...arr];
      next[idx] = (next[idx] || 0) + pts;
      return next;
    });
  }
  function updateOpponentScores(idx: number, pts: number) {
    setOpponentScores((arr) => {
      const next = [...arr];
      next[idx] = (next[idx] || 0) + pts;
      return next;
    });
  }

  function handleNext() {
    // If at the end of a stage, trigger stageComplete UI
    const nextIdx = current + 1;
    if ((nextIdx % STAGE_SIZE === 0) || (nextIdx >= currentStageEnd)) {
      setStageCompleted(true);
      setCurrent(nextIdx);
    } else {
      setCurrent(nextIdx);
    }
  }

  // Prevent going to next stage until all in stage answered
  function handleAdvanceStage() {
    setStage((s) => s + 1);
    setCurrent(currentStageEnd); // Move to first question in next stage
    setStageCompleted(false);
    setStageBonus(0);
    setShowStagePreview(true); // Show preview on next render
  }

  // Animations for correct/wrong
  const optionFlash = (idx: number) => {
    if (!showAnswer) return "";
    if (optionOrder[idx].isCorrect) return "bg-green-200 border-green-500 text-green-800 scale-105";
    if (idx === selected) return "bg-pink-200 border-pink-500 text-pink-800 animate-wiggle";
    return "opacity-70";
  };

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
      <GameSummary
        score={score}
        total={total}
        percent={percent}
        totalStages={totalStages}
        stageScores={stageScores}
        opponentScores={opponentScores}
        opponentName={opponentName}
        opponentEmoji={opponentEmoji}
        onPlayAgain={() => window.location.reload()}
      />
    );
  }

  // === Stage completion screen ===
  if (stageCompleted && state === "quiz" && current < phrases.length) {
    return (
      <StageSummary
        stage={stage}
        stageScore={stageScores[stage] || 0}
        opponentName={opponentName}
        opponentEmoji={opponentEmoji}
        opponentScore={opponentScores[stage] || 0}
        onAdvanceStage={handleAdvanceStage}
      />
    );
  }

  // Show Stage Preview at START of every stage (when current == start)
  if (showStagePreview && state === "quiz" && current < phrases.length) {
    // Show prior scores (except for first stage, where scores will be 0 or undefined)
    const prevStageIdx = stage - 1;
    return (
      <StagePreview
        stage={stage}
        stageScore={stageScores[prevStageIdx] ?? 0}
        opponentName={opponentName}
        opponentEmoji={opponentEmoji}
        opponentScore={opponentScores[prevStageIdx] ?? 0}
        onStartStage={handleStartStage}
      />
    );
  }

  // Main quiz screen (in stage)
  return (
    <Card className="max-w-xl w-full shadow-2xl bg-white/90 border-2 border-pink-200/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gradient bg-gradient-to-r from-pink-500 via-fuchsia-500 to-yellow-400 bg-clip-text text-transparent text-2xl font-bold">
          <span className="text-2xl">{opponentEmoji}</span>
          Stage {stage + 1} of {totalStages} – Phrase {current - currentStageStart + 1} of {currentStageEnd - currentStageStart}
          <span className="ml-2 text-base font-normal text-muted-foreground"></span>
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
        {/* Stage score bar */}
        <div className="mb-3 w-full h-3 bg-pink-100 rounded-lg overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-pink-300 transition-all"
            style={{
              width:
                (
                  ((stageScores[stage] || 0) /
                    ((currentStageEnd - currentStageStart) * 3)) *
                  100
                ).toFixed(1) + "%"
            }}
          />
        </div>
        <div className="mb-2 text-sm font-bold text-fuchsia-700">
          Time: {timer}s
        </div>

        {/* Multiple choice */}
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
              animateResult === "right"
                ? "text-green-700 animate-pop"
                : "text-pink-700 animate-shake-fast"
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
          Stage {stage + 1} Score:{" "}
          <span className="font-bold">{stageScores[stage] || 0}</span>
        </div>
        {showAnswer && (
          <Button
            onClick={handleNext}
            variant="default"
            className="animate-bounce"
            disabled={
              (current + 1) >= phrases.length // Only disable if we're at end of quiz
            }
          >
            {current + 1 < currentStageEnd ? "Next" : "Finish Stage"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PhraseQuiz;
