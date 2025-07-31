
import { useRef, useEffect, useState, useCallback } from "react";
import { playWithElevenLabsTTS, getOptimalVoice, normalizeLanguageForVoice } from "@/lib/tts";
import { guessSpeechLang } from "@/utils/guessSpeechLang";
import { getNativeVoiceForLanguage, getLanguageVoiceSettings } from "@/utils/quizHelpers";
import { audioManager } from "@/lib/tts/audioManager";

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
      language: language,
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

    // Enhanced audio playback with improved native voice selection
    const playAudio = async () => {
      // Use the enhanced voice optimization system
      const normalizedLanguage = normalizeLanguageForVoice(language);
      const optimalVoice = getOptimalVoice(normalizedLanguage);
      const languageSettings = getLanguageVoiceSettings(normalizedLanguage);

      console.log(`🎵 Enhanced Audio Debug - Using Optimized Voice Selection:`, {
        originalLanguage: language,
        normalizedLanguage,
        optimalVoice,
        languageSettings,
        text: text.slice(0, 30)
      });

      try {
        console.log(`🎵 Attempting ElevenLabs TTS for ${normalizedLanguage} with optimized voice:`, optimalVoice);

        // Use the enhanced ElevenLabs TTS with native voice optimization
        await playWithElevenLabsTTS({ 
          text, 
          pronunciation: text, // Same as text since we don't have separate pronunciation here
          language: normalizedLanguage,
          voiceId: optimalVoice,
          ...languageSettings,
          useSpeakerBoost: true
        });
        
        console.log('✅ ElevenLabs TTS succeeded - NATIVE VOICE SHOULD BE PLAYING');
      } catch (elevenLabsError: any) {
        console.error('🔄 ElevenLabs failed, falling back to browser TTS:', {
          error: elevenLabsError.message,
          language: normalizedLanguage,
          voiceId: optimalVoice,
          stack: elevenLabsError.stack
        });
        
        console.log('🔄 Falling back to browser TTS (ROBOTIC VOICE)');
        
        // Import the enhanced browser TTS fallback
        try {
          const { playWithBrowserTTS } = await import("@/lib/tts/browserTts");
          await playWithBrowserTTS(text, normalizedLanguage);
          console.log('✅ Browser TTS fallback succeeded (ROBOTIC VOICE)');
        } catch (browserTtsError: any) {
          console.error('❌ All TTS methods failed:', {
            elevenLabs: elevenLabsError.message,
            browserTts: browserTtsError.message
          });
          
          // Show user-friendly error
          console.log('💡 Audio failed - try clicking the speaker button manually');
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

  // Cleanup audio on component unmount
  useEffect(() => {
    return () => {
      console.log('🧹 Cleaning up audio on component unmount');
      audioManager.stopAllAudio();
    };
  }, []);

  // Return a function to manually trigger audio (useful for mobile)
  const playManually = useCallback(() => {
    console.log('🎵 Manual audio play triggered');
    audioManager.stopAllAudio(); // Stop any existing audio first
    if (!userHasInteracted) {
      globalUserHasInteracted = true;
      setUserHasInteracted(true);
    }
    audioPlayedRef.current = false; // Reset the guard
    // Force re-trigger by updating the audio played state
  }, [userHasInteracted]);

  return { playManually, userHasInteracted };
}
