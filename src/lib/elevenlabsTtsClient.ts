
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

// Global audio context for mobile
let globalAudioContext: AudioContext | null = null;

// Initialize audio context for mobile
async function initializeAudioContext(): Promise<AudioContext | null> {
  if (globalAudioContext) return globalAudioContext;
  
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return null;
    
    globalAudioContext = new AudioContextClass();
    
    if (globalAudioContext.state === 'suspended') {
      await globalAudioContext.resume();
      console.log('✅ Audio context resumed');
    }
    
    return globalAudioContext;
  } catch (error) {
    console.log('❌ Could not initialize audio context:', error);
    return null;
  }
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

  // For mobile devices, ensure audio context is initialized
  if (isMobileDevice()) {
    await initializeAudioContext();
  }

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

    if (!res.ok) {
      console.error('❌ TTS API failed with status:', res.status);
      throw new Error("Failed to fetch TTS audio");
    }

    const audioBlob = await res.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    
    // Mobile-optimized audio settings
    audio.volume = 1.0;
    audio.preload = 'auto';
    
    // Enhanced mobile audio handling
    if (isMobileDevice()) {
      // Set additional mobile-friendly properties
      audio.setAttribute('playsinline', 'true');
      audio.setAttribute('webkit-playsinline', 'true');
    }
    
    // Handle audio events
    audio.addEventListener('canplaythrough', () => {
      console.log('✅ Audio ready to play');
    });
    
    audio.addEventListener('error', (e) => {
      console.error('❌ Audio playback error:', e);
      throw new Error('Audio playback failed');
    });
    
    audio.addEventListener('loadstart', () => {
      console.log('🔄 Audio loading started');
    });
    
    // Play with proper error handling
    try {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        await playPromise;
        console.log('✅ Audio playing successfully');
      }
    } catch (playError) {
      console.error('❌ Audio play failed:', playError);
      throw playError;
    }
    
    return audio;
  } catch (err) {
    console.error("[TTS] ElevenLabs Error:", err);
    throw err;
  }
}

// Enhanced fallback with better mobile support
export function playWithBrowserTTS(text: string, language: string = "en") {
  return new Promise<void>((resolve, reject) => {
    if (!("speechSynthesis" in window)) {
      reject(new Error('Speech synthesis not supported'));
      return;
    }

    // Ensure speech synthesis is ready
    const ensureVoicesLoaded = () => {
      return new Promise<void>((resolve) => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          resolve();
        } else {
          const handleVoicesChanged = () => {
            window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
            resolve();
          };
          window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
          
          // Fallback timeout
          setTimeout(resolve, 2000);
        }
      });
    };

    ensureVoicesLoaded().then(() => {
      try {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new window.SpeechSynthesisUtterance(preprocessTextForTTS(text));
        
        // Enhanced mobile-friendly settings
        utterance.lang = language;
        utterance.rate = 0.75; // Slower for mobile clarity
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        // Enhanced voice selection for mobile
        const voices = window.speechSynthesis.getVoices();
        const targetLang = language.toLowerCase();
        
        // Find the best voice for mobile
        const mobileOptimizedVoices = voices.filter(voice => {
          const voiceLang = voice.lang.toLowerCase();
          return (voiceLang.includes(targetLang) || voiceLang.includes(targetLang.split('-')[0])) &&
                 voice.localService; // Prefer local voices for mobile
        });
        
        let selectedVoice = null;
        if (mobileOptimizedVoices.length > 0) {
          selectedVoice = mobileOptimizedVoices[0];
        } else {
          // Fallback to any voice that matches the language
          selectedVoice = voices.find(voice => {
            const voiceLang = voice.lang.toLowerCase();
            return voiceLang.includes(targetLang) || voiceLang.includes(targetLang.split('-')[0]);
          });
        }
        
        if (selectedVoice) {
          utterance.voice = selectedVoice;
          console.log('🎵 Selected voice for TTS:', selectedVoice.name);
        }
        
        utterance.onstart = () => {
          console.log('✅ Browser TTS started');
        };
        
        utterance.onend = () => {
          console.log('✅ Browser TTS completed');
          resolve();
        };
        
        utterance.onerror = (event) => {
          console.error('❌ Browser TTS error:', event.error);
          reject(new Error(`Speech synthesis failed: ${event.error}`));
        };
        
        // Speak with a small delay to ensure readiness
        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, 100);
        
      } catch (error) {
        console.error('❌ Error setting up browser TTS:', error);
        reject(error);
      }
    }).catch(reject);
  });
}
