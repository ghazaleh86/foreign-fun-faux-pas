
import { useCallback } from "react";
import { 
  getNativeVoiceForLanguage,
  getLanguageVoiceSettings
} from "@/utils/quizHelpers";
import { Phrase } from "@/types/quiz";
import { getTtsProvider, setTtsProvider } from "@/utils/ttsPreferences";

// Check if we're on a mobile device
function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

interface UseAudioPlaybackControlsProps {
  phrase: Phrase | undefined;
}

export function useAudioPlaybackControls({ phrase }: UseAudioPlaybackControlsProps) {
  const handlePlayAudio = useCallback(async () => {
    if (!phrase) return;
    
    // Prefer pronunciation field for better audio accuracy, fallback to phrase_text
    const ttsText = phrase.pronunciation || phrase.phrase_text;
    const language = (phrase.language || "english").toLowerCase();
    const nativeVoiceId = getNativeVoiceForLanguage(language);
    const languageSettings = getLanguageVoiceSettings(language);
    
    console.log(`🎵 Manual play audio triggered for ${language}:`, {
      text: ttsText.slice(0, 30),
      voiceId: nativeVoiceId,
      isMobile: isMobileDevice()
    });
    
    // For mobile devices, try to resume audio context first
    if (isMobileDevice()) {
      try {
        const resumeAudioContext = async () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          if (audioContext.state === 'suspended') {
            await audioContext.resume();
            console.log('✅ Audio context resumed for manual play');
          }
        };
        await resumeAudioContext();
      } catch (error) {
        console.log('⚠️ AudioContext not available or failed to resume:', error);
      }
    }
    
    try {
      const provider = getTtsProvider();

      if (provider === "browser") {
        const { playWithBrowserTTS } = await import("@/lib/tts/browserTts");
        await playWithBrowserTTS(ttsText, language);
        console.log("✅ Manual browser TTS succeeded");
        return;
      }

      // Try ElevenLabs (only if user selected it)
      const { playWithElevenLabsTTS } = await import("@/lib/elevenlabsTtsClient");
      await playWithElevenLabsTTS({
        text: phrase.phrase_text,
        pronunciation: phrase.pronunciation,
        language,
        voiceId: nativeVoiceId,
        ...languageSettings,
        useSpeakerBoost: true,
      });
      console.log("✅ Manual ElevenLabs TTS succeeded");
    } catch (elevenLabsError) {
      console.log('🔄 Manual ElevenLabs failed, switching to browser TTS:', elevenLabsError);
      setTtsProvider("browser");
      
      try {
        // Import enhanced browser TTS with retry logic
        const { playWithBrowserTTS } = await import("@/lib/tts/browserTts");
        await playWithBrowserTTS(ttsText, language);
        console.log('✅ Manual browser TTS succeeded');
      } catch (browserError) {
        console.error('❌ Manual audio playback failed completely:', {
          elevenLabs: elevenLabsError,
          browser: browserError
        });
        
        // Show user feedback that audio failed
        alert('Audio playback failed. Please check your device audio settings.');
      }
    }
  }, [phrase]);

  return { handlePlayAudio };
}
