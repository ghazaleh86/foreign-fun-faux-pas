
import { useRef, useEffect } from "react";
import { playWithElevenLabsTTS } from "@/lib/elevenlabsTtsClient";
import { guessSpeechLang } from "@/utils/guessSpeechLang";
import { getNativeVoiceForLanguage, getLanguageVoiceSettings } from "@/utils/quizHelpers";

// Check if we're on a mobile device
function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Check if user has interacted with the page (required for mobile audio)
let userHasInteracted = false;

if (typeof window !== 'undefined') {
  const markUserInteraction = () => {
    userHasInteracted = true;
    console.log('✅ User interaction detected - audio enabled');
  };
  
  // Listen for any user interaction
  ['click', 'touchstart', 'keydown'].forEach(event => {
    document.addEventListener(event, markUserInteraction, { once: true, passive: true });
  });
}

export function useAudioPlayback(triggerKey: any[], text: string, language: string, voiceId: string, shouldPlay: boolean) {
  // guarding against duplicate play in one step
  const audioPlayedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!shouldPlay || audioPlayedRef.current || !text.trim()) return;
    
    // On mobile, don't auto-play audio unless user has interacted
    if (isMobileDevice() && !userHasInteracted) {
      console.log('⚠️ Mobile device detected - waiting for user interaction before playing audio');
      return;
    }
    
    audioPlayedRef.current = true;

    // Add a small delay for mobile devices to ensure audio context is ready
    const playAudio = async () => {
      try {
        // Get native voice and optimized settings for the language
        const nativeVoiceId = getNativeVoiceForLanguage(language);
        const languageSettings = getLanguageVoiceSettings(language);

        console.log(`🎵 Playing audio for ${language} with native voice:`, nativeVoiceId);

        await playWithElevenLabsTTS({ 
          text, 
          language,
          voiceId: nativeVoiceId,
          ...languageSettings,
          useSpeakerBoost: true
        });
      } catch (error) {
        console.log('🔄 ElevenLabs failed, trying browser TTS fallback');
        
        // Enhanced mobile-friendly fallback
        if ("speechSynthesis" in window) {
          try {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();
            
            // Wait for voices to be loaded
            const waitForVoices = () => {
              return new Promise<void>((resolve) => {
                const voices = window.speechSynthesis.getVoices();
                if (voices.length > 0) {
                  resolve();
                } else {
                  window.speechSynthesis.addEventListener('voiceschanged', () => {
                    resolve();
                  }, { once: true });
                  
                  // Fallback timeout
                  setTimeout(resolve, 1000);
                }
              });
            };

            await waitForVoices();
            
            const utterance = new window.SpeechSynthesisUtterance(text);
            utterance.lang = guessSpeechLang(language);
            utterance.rate = 0.8; // Slower for better mobile clarity
            utterance.pitch = 1.0;
            utterance.volume = 1.0;
            
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
              // Prefer local voices for mobile reliability
              selectedVoice = preferredVoices.find(voice => voice.localService) || preferredVoices[0];
            }
            
            if (selectedVoice) {
              utterance.voice = selectedVoice;
              console.log('🎵 Using voice:', selectedVoice.name);
            }
            
            // Handle mobile-specific events
            utterance.onstart = () => {
              console.log('✅ Speech started successfully');
            };
            
            utterance.onend = () => {
              console.log('✅ Speech completed');
            };
            
            utterance.onerror = (event) => {
              console.error('❌ Speech synthesis error:', event.error);
            };
            
            // Use a small timeout to ensure the speech synthesis is ready
            setTimeout(() => {
              window.speechSynthesis.speak(utterance);
            }, 100);
            
          } catch (speechError) {
            console.error('❌ Browser TTS also failed:', speechError);
          }
        }
      }
    };

    // Add a small delay for mobile devices
    if (isMobileDevice()) {
      setTimeout(playAudio, 200);
    } else {
      playAudio();
    }
    
    // eslint-disable-next-line
  }, [...triggerKey, shouldPlay, text, language]);

  useEffect(() => {
    // Reset trigger on new phrase/step
    audioPlayedRef.current = false;
  }, [...triggerKey]);

  // Return a function to manually trigger audio (useful for mobile)
  const playManually = () => {
    if (!userHasInteracted) {
      userHasInteracted = true;
    }
    audioPlayedRef.current = false; // Reset the guard
    // Trigger the effect by updating a dependency
  };

  return { playManually, userHasInteracted };
}
