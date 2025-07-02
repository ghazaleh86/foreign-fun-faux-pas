
import { useRef, useEffect, useState, useCallback } from "react";
import { playWithElevenLabsTTS } from "@/lib/tts";
import { guessSpeechLang } from "@/utils/guessSpeechLang";
import { getNativeVoiceForLanguage, getLanguageVoiceSettings } from "@/utils/quizHelpers";

// Check if we're on a mobile device
function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Global user interaction state
let globalUserHasInteracted = false;

if (typeof window !== 'undefined') {
  const markUserInteraction = () => {
    globalUserHasInteracted = true;
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
  const [userHasInteracted, setUserHasInteracted] = useState(globalUserHasInteracted);
  
  // Update local state when global state changes
  useEffect(() => {
    const checkInteraction = () => {
      if (globalUserHasInteracted && !userHasInteracted) {
        setUserHasInteracted(true);
      }
    };
    
    const interval = setInterval(checkInteraction, 1000);
    return () => clearInterval(interval);
  }, [userHasInteracted]);

  useEffect(() => {
    if (!shouldPlay || audioPlayedRef.current || !text.trim()) return;
    
    console.log('🎵 Audio playback attempt:', {
      shouldPlay,
      audioPlayed: audioPlayedRef.current,
      text: text.slice(0, 20),
      isMobile: isMobileDevice(),
      userHasInteracted,
      triggerKey: JSON.stringify(triggerKey)
    });
    
    // On mobile, don't auto-play audio unless user has interacted
    if (isMobileDevice() && !userHasInteracted) {
      console.log('⚠️ Mobile device detected - waiting for user interaction before playing audio');
      return;
    }
    
    audioPlayedRef.current = true;

    // Enhanced audio playback with better error handling and fallbacks
    const playAudio = async () => {
      try {
        // Normalize language to lowercase for consistent voice selection
        const normalizedLanguage = language.toLowerCase();
        const nativeVoiceId = getNativeVoiceForLanguage(normalizedLanguage);
        const languageSettings = getLanguageVoiceSettings(normalizedLanguage);

        console.log(`🎵 Attempting ElevenLabs TTS for ${normalizedLanguage} with voice:`, nativeVoiceId);

        await playWithElevenLabsTTS({ 
          text, 
          language: normalizedLanguage,
          voiceId: nativeVoiceId,
          ...languageSettings,
          useSpeakerBoost: true
        });
        
        console.log('✅ ElevenLabs TTS succeeded');
      } catch (elevenLabsError) {
        console.log('🔄 ElevenLabs failed, trying browser TTS fallback:', elevenLabsError);
        
        // Import the enhanced browser TTS fallback
        try {
          const { playWithBrowserTTS } = await import("@/lib/tts/browserTts");
          await playWithBrowserTTS(text, language.toLowerCase());
          console.log('✅ Browser TTS fallback succeeded');
        } catch (browserTtsError) {
          console.error('❌ All TTS methods failed:', {
            elevenLabs: elevenLabsError,
            browserTts: browserTtsError
          });
          
          // Last resort: Show a visual indicator that audio failed
          console.log('💡 Consider using the manual play button');
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
    // Reset trigger on new phrase/step - CRITICAL for ensuring audio plays on each new question
    console.log('🔄 Resetting audio state for new question:', triggerKey);
    audioPlayedRef.current = false;
  }, [...triggerKey]);

  // Return a function to manually trigger audio (useful for mobile)
  const playManually = useCallback(() => {
    console.log('🎵 Manual audio play triggered');
    if (!userHasInteracted) {
      globalUserHasInteracted = true;
      setUserHasInteracted(true);
    }
    audioPlayedRef.current = false; // Reset the guard
    // Force re-trigger by updating the audio played state
  }, [userHasInteracted]);

  return { playManually, userHasInteracted };
}
