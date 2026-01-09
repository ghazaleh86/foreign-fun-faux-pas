import React, { useEffect, useMemo, useReducer, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MascotAvatar from "@/components/MascotAvatar";
import GameHud from "@/components/GameHud";
import { languageToFlag } from "@/utils/languageToFlag";
import { toast } from "@/components/ui/sonner";
import { fetchLanguageCounts, fetchPhrases } from "@/lib/phraseRepository";
import { buildDeck, indexPhrases } from "./deck";
import { buildOptions, createInitialState, reducer } from "./engine";
import { clearGameState, loadGameState, saveGameState } from "./storage";

export default function Game() {
  const [hydrated, setHydrated] = useState(false);
  const [state, dispatch] = useReducer(reducer, undefined, () => loadGameState() ?? createInitialState());
  const [languageCounts, setLanguageCounts] = useState<{ language: string; count: number }[]>([]);

  // Persist
  useEffect(() => {
    if (!hydrated) return;
    saveGameState(state);
  }, [state, hydrated]);

  // Hydration guard to avoid SSR/localStorage mismatch
  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    fetchLanguageCounts().then(setLanguageCounts).catch(() => setLanguageCounts([]));
  }, []);

  // Timer tick
  useEffect(() => {
    if (state.mode !== "playing") return;
    if (state.question.showAnswer) return;
    const id = window.setInterval(() => dispatch({ type: "TICK" }), 1000);
    return () => window.clearInterval(id);
  }, [state.mode, state.question.showAnswer, state.question.idx]);

  const phraseId = state.deck.phraseIds[state.question.idx];
  const phrase = phraseId ? state.phrasesById[phraseId] : undefined;
  const options = useMemo(() => (phrase ? buildOptions(phrase) : []), [phraseId]);

  const stageSize = state.settings.stageSize;
  const stage = state.progress.stage;
  const stagePos = (state.question.idx % stageSize) + 1;

  const handleStart = async (language: string | null) => {
    const phrases = await fetchPhrases(language);
    if (phrases.length === 0) {
      toast("No phrases available for that language.", { description: "Try All Languages or add phrases to src/data/phrases.ts" });
      return;
    }
    const deck = buildDeck(phrases, Math.min(50, Math.max(10, phrases.length)));
    dispatch({ type: "START", language, deck, phrasesById: indexPhrases(phrases) });
  };

  // LANDING
  if (state.mode === "landing") {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-10 min-h-screen">
        <div className="game-panel max-w-xl w-full p-6 text-center">
          <div className="mx-auto w-24 h-24 mb-4 bg-yellow-200/70 game-panel-inset flex items-center justify-center">
            <MascotAvatar size={72} className="ring-0" />
          </div>
          <div className="game-title text-2xl mb-2">GUESS THAT PHRASE</div>
          <div className="text-sm text-black/70 mb-6">
            Offline mode: no Supabase, no ElevenLabs. Just play.
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="btn-block btn-block-green" onClick={() => dispatch({ type: "GO_LANGUAGE" })}>
              Play
            </Button>
            <Button
              className="btn-block btn-block-gray"
              variant="outline"
              onClick={() => {
                clearGameState();
                toast("Cleared saved run.");
              }}
            >
              Clear saved run
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // LANGUAGE
  if (state.mode === "language") {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-10 min-h-screen">
        <div className="game-panel max-w-2xl w-full p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="game-title text-lg">Choose a language</div>
            <Button className="btn-block btn-block-gray" variant="outline" onClick={() => dispatch({ type: "BACK_TO_START" })}>
              Back
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              type="button"
              className="btn-block btn-block-blue w-full p-4 text-left"
              onClick={() => void handleStart(null)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-pixel text-xs uppercase tracking-wide">🌍 All Languages</div>
                  <div className="text-sm text-black/70">Mixed practice pack</div>
                </div>
                <div className="font-pixel text-xs">{languageCounts.reduce((s, x) => s + x.count, 0)} phrases</div>
              </div>
            </button>

            {languageCounts.map((l) => (
              <button
                key={l.language}
                type="button"
                className="btn-block btn-block-gray w-full p-4 text-left"
                onClick={() => void handleStart(l.language)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-pixel text-xs uppercase tracking-wide">
                      <span className="mr-2">{languageToFlag(l.language)}</span>
                      {l.language}
                    </div>
                    <div className="text-sm text-black/70">{l.count} phrases</div>
                  </div>
                  <div className="text-xl">{languageToFlag(l.language)}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 text-xs text-black/60">
            Add more phrases in <code className="font-mono">src/data/phrases.ts</code>.
          </div>
        </div>
      </div>
    );
  }

  // PLAYING / STAGE SUMMARY / GAME SUMMARY share HUD container
  const totalStages = state.settings.totalStages;
  const hearts = state.progress.hearts;
  const maxHearts = state.progress.maxHearts;
  const totalStars = state.progress.totalStars;

  if (state.mode === "playing") {
    return (
      <div className="flex flex-col items-center px-4 py-6 min-h-screen">
        <div className="max-w-xl w-full">
          <GameHud hearts={hearts} maxHearts={maxHearts} totalStars={totalStars} stage={stage} totalStages={totalStages} />
        </div>

        <div className="mt-5 max-w-xl w-full game-panel">
          <CardContent className="p-6">
            {!phrase ? (
              <div className="text-center">
                <div className="game-title text-lg mb-2">No phrase loaded</div>
                <Button className="btn-block btn-block-blue" onClick={() => dispatch({ type: "RESET_RUN" })}>
                  Restart
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="game-title text-sm mb-2">
                      STAGE {stage + 1}/{totalStages} · Q {stagePos}/{stageSize}
                    </div>
                    <div className="text-xl font-bold">{phrase.phrase_text}</div>
                    <div className="font-pixel text-[10px] uppercase tracking-wide text-black/60 mt-1">
                      {languageToFlag(phrase.language)} {phrase.language}
                    </div>
                  </div>
                  <Button
                    className="btn-block btn-block-blue"
                    onClick={async () => {
                      const { playWithBrowserTTS } = await import("@/lib/tts/browserTts");
                      const ttsText = phrase.pronunciation || phrase.phrase_text;
                      playWithBrowserTTS(ttsText, phrase.language).catch(() => {
                        toast("Audio failed (device TTS).");
                      });
                    }}
                  >
                    🔊
                  </Button>
                </div>

                <div className="mt-4">
                  <div className="font-pixel text-[10px] uppercase tracking-wide text-black/70 flex justify-between mb-1">
                    <span>Time</span>
                    <span>
                      {state.question.secondsElapsed}s / {state.settings.timeLimitSec}s
                    </span>
                  </div>
                  <div className="xp-bar w-full h-3 overflow-hidden">
                    <div
                      className="xp-bar__fill h-full"
                      style={{ width: `${Math.min(100, (state.question.secondsElapsed / state.settings.timeLimitSec) * 100)}%` }}
                    />
                  </div>
                </div>

                {state.question.feedback && (
                  <div className="mt-4 game-panel-inset p-3 bg-white/70 border-4 border-black">
                    <div className="font-pixel text-xs uppercase tracking-wide">{state.question.feedback}</div>
                  </div>
                )}

                <div className="mt-4 flex flex-col gap-3">
                  {options.map((opt, idx) => {
                    const locked = state.question.selectedOption !== null || state.question.showAnswer;
                    const selected = state.question.selectedOption === idx;
                    const flash =
                      state.question.showAnswer && opt.isCorrect
                        ? "bg-green-200 border-green-700"
                        : state.question.showAnswer && selected && !opt.isCorrect
                          ? "bg-pink-200 border-pink-700"
                          : "";

                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={locked}
                        className={`btn-block btn-block-gray w-full p-4 text-left ${flash} disabled:opacity-90`}
                        onClick={() => dispatch({ type: "ANSWER", selected: idx, isCorrect: opt.isCorrect })}
                      >
                        <div className="font-pixel text-xs uppercase tracking-wide">{opt.label}</div>
                      </button>
                    );
                  })}
                </div>

                {state.question.showAnswer && (
                  <div className="mt-5 flex justify-center">
                    <Button className="btn-block btn-block-green px-10" onClick={() => dispatch({ type: "NEXT" })}>
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </div>
      </div>
    );
  }

  if (state.mode === "stage_summary") {
    const passed = state.progress.stageCorrect >= 3 && state.progress.hearts > 0;
    return (
      <div className="flex flex-col items-center px-4 py-10 min-h-screen">
        <div className="max-w-xl w-full">
          <GameHud hearts={hearts} maxHearts={maxHearts} totalStars={totalStars} stage={stage} totalStages={totalStages} />
        </div>
        <Card className="max-w-xl w-full game-panel mt-6">
          <CardContent className="p-6 text-center space-y-4">
            <div className="game-title text-xl">{passed ? "STAGE CLEAR" : "STAGE FAILED"}</div>
            <div className="text-sm text-black/70">
              Correct this stage: <b>{state.progress.stageCorrect}</b> / {stageSize}
            </div>
            <div className="text-sm text-black/70">You need at least <b>3</b> correct to pass.</div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button className="btn-block btn-block-green" onClick={() => dispatch({ type: "STAGE_CONTINUE" })}>
                {passed ? "Continue" : "Retry stage"}
              </Button>
              <Button className="btn-block btn-block-gray" variant="outline" onClick={() => dispatch({ type: "RESET_RUN" })}>
                Change language / restart
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // GAME SUMMARY
  return (
    <div className="flex flex-col items-center px-4 py-10 min-h-screen">
      <Card className="max-w-xl w-full game-panel">
        <CardContent className="p-6 text-center space-y-4">
          <div className="game-title text-2xl">RUN COMPLETE</div>
          <div className="text-sm text-black/70">
            Total score: <b>{state.progress.scoreTotal}</b>
          </div>
          <div className="text-sm text-black/70">
            Total stars earned: <b>{state.progress.totalStars}</b>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button className="btn-block btn-block-green" onClick={() => dispatch({ type: "RESET_RUN" })}>
              Play again
            </Button>
            <Button
              className="btn-block btn-block-gray"
              variant="outline"
              onClick={() => {
                clearGameState();
                dispatch({ type: "BACK_TO_START" });
              }}
            >
              Back to start
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

