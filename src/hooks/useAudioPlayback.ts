
import { useRef, useEffect } from "react";
import { playWithElevenLabsTTS } from "@/lib/elevenlabsTtsClient";
import { guessSpeechLang } from "@/utils/guessSpeechLang";

export function useAudioPlayback(triggerKey: any[], text: string, language: string, voiceId: string, shouldPlay: boolean) {
  // guarding against duplicate play in one step
  const audioPlayedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!shouldPlay || audioPlayedRef.current) return;
    audioPlayedRef.current = true;

    playWithElevenLabsTTS({ text, voiceId }).catch(() => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const u = new window.SpeechSynthesisUtterance(text);
        u.lang = guessSpeechLang(language);
        u.rate = 0.98;
        window.speechSynthesis.speak(u);
      }
    });
    // eslint-disable-next-line
  }, [...triggerKey, shouldPlay, text, voiceId, language]);

  useEffect(() => {
    // Reset trigger on new phrase/step
    audioPlayedRef.current = false;
  }, [...triggerKey]);
}
