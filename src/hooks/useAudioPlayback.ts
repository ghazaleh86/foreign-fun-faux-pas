
import { useRef, useEffect } from "react";
import { playWithElevenLabsTTS } from "@/lib/elevenlabsTtsClient";
import { guessSpeechLang } from "@/utils/guessSpeechLang";
import { getVoiceSettings } from "@/utils/quizHelpers";

export function useAudioPlayback(triggerKey: any[], text: string, language: string, voiceId: string, shouldPlay: boolean) {
  // guarding against duplicate play in one step
  const audioPlayedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!shouldPlay || audioPlayedRef.current) return;
    audioPlayedRef.current = true;

    // Get optimized voice settings
    const voiceSettings = getVoiceSettings(voiceId);

    playWithElevenLabsTTS({ 
      text, 
      voiceId,
      ...voiceSettings,
      useSpeakerBoost: true
    }).catch(() => {
      // Enhanced fallback with better browser TTS
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new window.SpeechSynthesisUtterance(text);
        utterance.lang = guessSpeechLang(language);
        utterance.rate = 0.9; // Slightly slower for clarity
        utterance.pitch = 1.0; // Natural pitch
        utterance.volume = 0.9;
        
        // Try to use a more natural voice
        const voices = window.speechSynthesis.getVoices();
        const naturalVoices = voices.filter(voice => 
          voice.lang.startsWith(language) && 
          (voice.name.includes('Neural') || voice.name.includes('Premium'))
        );
        
        if (naturalVoices.length > 0) {
          utterance.voice = naturalVoices[0];
        }
        
        window.speechSynthesis.speak(utterance);
      }
    });
    // eslint-disable-next-line
  }, [...triggerKey, shouldPlay, text, voiceId, language]);

  useEffect(() => {
    // Reset trigger on new phrase/step
    audioPlayedRef.current = false;
  }, [...triggerKey]);
}
