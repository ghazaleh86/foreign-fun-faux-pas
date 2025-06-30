
const EDGE_URL =
  "https://ayfmkmnecfjyhdutxfjp.supabase.co/functions/v1/elevenlabs-tts";

import { validateTtsTextInput } from './validateTtsInput';

// Preprocess text for more natural speech
function preprocessTextForTTS(text: string): string {
  return text
    // Add natural pauses
    .replace(/([.!?])\s*/g, '$1 ')
    // Add slight pause after commas
    .replace(/,\s*/g, ', ')
    // Handle contractions more naturally
    .replace(/n't/g, " n't")
    .replace(/'ll/g, " 'll")
    .replace(/'re/g, " 're")
    .replace(/'ve/g, " 've")
    // Trim extra spaces
    .replace(/\s+/g, ' ')
    .trim();
}

// Check if we're on a mobile device
function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export async function playWithElevenLabsTTS({ 
  text, 
  voiceId = "pNInz6obpgDQGcFmaJgB", // Rachel - more natural default
  stability = 0.5,
  similarityBoost = 0.8,
  style = 0.2,
  useSpeakerBoost = true
}: { 
  text: string, 
  voiceId?: string,
  stability?: number,
  similarityBoost?: number,
  style?: number,
  useSpeakerBoost?: boolean
}) {
  const error = validateTtsTextInput(text);
  if (error) throw new Error(error);

  const processedText = preprocessTextForTTS(text);

  try {
    const res = await fetch(EDGE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        text: processedText, 
        voiceId,
        stability,
        similarityBoost,
        style,
        useSpeakerBoost
      }),
    });

    if (!res.ok) throw new Error("Failed to fetch TTS audio");

    const audioBlob = await res.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    
    // Mobile-optimized audio settings
    audio.volume = 1.0; // Full volume for mobile
    audio.preload = 'auto';
    
    // Handle mobile-specific audio events
    audio.addEventListener('canplaythrough', () => {
      console.log('Audio ready to play');
    });
    
    audio.addEventListener('error', (e) => {
      console.error('Audio playback error:', e);
      throw new Error('Audio playback failed');
    });
    
    // For mobile devices, we need to handle audio context properly
    if (isMobileDevice()) {
      // Create audio context if it doesn't exist (helps with mobile audio)
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        if (audioContext.state === 'suspended') {
          await audioContext.resume();
        }
      } catch (audioContextError) {
        console.log('AudioContext not available, using basic audio');
      }
    }
    
    // Play with proper error handling for mobile
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error('Audio play failed:', error);
        throw error;
      });
    }
    
    return audio;
  } catch (err) {
    console.error("[TTS] ElevenLabs Error:", err);
    throw err;
  }
}

// Enhanced fallback with better mobile support
export function playWithBrowserTTS(text: string, language: string = "en") {
  if ("speechSynthesis" in window) {
    // Ensure speech synthesis is ready
    const ensureVoicesLoaded = () => {
      return new Promise<void>((resolve) => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          resolve();
        } else {
          window.speechSynthesis.addEventListener('voiceschanged', () => {
            resolve();
          }, { once: true });
        }
      });
    };

    ensureVoicesLoaded().then(() => {
      window.speechSynthesis.cancel();
      const utterance = new window.SpeechSynthesisUtterance(preprocessTextForTTS(text));
      
      // Enhanced mobile-friendly settings
      utterance.lang = language;
      utterance.rate = 0.85; // Slightly slower for mobile clarity
      utterance.pitch = 1.0;
      utterance.volume = 1.0; // Full volume for mobile
      
      // Enhanced voice selection for mobile
      const voices = window.speechSynthesis.getVoices();
      const mobileOptimizedVoices = voices.filter(voice => {
        const voiceLang = voice.lang.toLowerCase();
        const targetLang = language.toLowerCase();
        return (voiceLang.includes(targetLang) || voiceLang.includes(targetLang.split('-')[0])) &&
               (voice.localService || voice.name.includes('Google') || voice.name.includes('Microsoft'));
      });
      
      if (mobileOptimizedVoices.length > 0) {
        utterance.voice = mobileOptimizedVoices[0];
      }
      
      // Mobile-specific event handlers
      utterance.onstart = () => console.log('Mobile TTS started');
      utterance.onend = () => console.log('Mobile TTS ended');
      utterance.onerror = (event) => {
        console.error('Mobile TTS error:', event.error);
      };
      
      window.speechSynthesis.speak(utterance);
    });
  }
}
