
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
      // Enhanced mobile-friendly fallback
      if ("speechSynthesis" in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        // Small delay to ensure cancellation completes
        setTimeout(() => {
          const utterance = new window.SpeechSynthesisUtterance(text);
          utterance.lang = guessSpeechLang(language);
          utterance.rate = 0.9;
          utterance.pitch = 1.0;
          utterance.volume = 1.0; // Full volume for mobile
          
          // Enhanced voice selection for mobile
          const voices = window.speechSynthesis.getVoices();
          let selectedVoice = null;
          
          // Try to find a good voice for the language
          const preferredVoices = voices.filter(voice => {
            const voiceLang = voice.lang.toLowerCase();
            const targetLang = (language || "en").toLowerCase();
            return voiceLang.includes(targetLang) || voiceLang.includes(targetLang.split('-')[0]);
          });
          
          if (preferredVoices.length > 0) {
            // Prefer premium/enhanced voices if available
            selectedVoice = preferredVoices.find(voice => 
              voice.name.includes('Enhanced') || 
              voice.name.includes('Premium') ||
              voice.name.includes('Neural')
            ) || preferredVoices[0];
          }
          
          if (selectedVoice) {
            utterance.voice = selectedVoice;
          }
          
          // Handle mobile-specific events
          utterance.onstart = () => {
            console.log('Speech started on mobile');
          };
          
          utterance.onerror = (event) => {
            console.log('Speech error on mobile:', event.error);
            // Retry once with a simpler approach
            if (event.error === 'network' || event.error === 'synthesis-failed') {
              setTimeout(() => {
                const simpleUtterance = new window.SpeechSynthesisUtterance(text);
                simpleUtterance.lang = language || "en-US";
                window.speechSynthesis.speak(simpleUtterance);
              }, 100);
            }
          };
          
          window.speechSynthesis.speak(utterance);
        }, 100);
      }
    });
    // eslint-disable-next-line
  }, [...triggerKey, shouldPlay, text, voiceId, language]);

  useEffect(() => {
    // Reset trigger on new phrase/step
    audioPlayedRef.current = false;
  }, [...triggerKey]);
}
