
const EDGE_URL =
  "https://ayfmkmnecfjyhdutxfjp.supabase.co/functions/v1/elevenlabs-tts";

import { validateTtsTextInput } from './validateTtsInput';

// Enhanced text preprocessing for more natural speech across languages
function preprocessTextForTTS(text: string, language: string = "english"): string {
  let processed = text
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

  // Language-specific preprocessing
  const normalizedLanguage = language.toLowerCase();
  
  switch (normalizedLanguage) {
    case 'german':
      // Handle German umlauts and special characters for better pronunciation
      processed = processed
        .replace(/ß/g, 'ss')
        .replace(/ü/g, 'ue')
        .replace(/ö/g, 'oe')
        .replace(/ä/g, 'ae');
      break;
    case 'spanish':
      // Add slight emphasis for Spanish pronunciation
      processed = processed.replace(/ñ/g, 'ny');
      break;
    case 'french':
      // Handle French accents for better pronunciation
      processed = processed
        .replace(/é/g, 'e')
        .replace(/è/g, 'e')
        .replace(/ê/g, 'e')
        .replace(/ç/g, 'c');
      break;
    case 'norwegian':
    case 'swedish':
      // Handle Nordic characters
      processed = processed
        .replace(/å/g, 'aa')
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ø/g, 'oe');
      break;
  }
  
  return processed;
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
  language = "english",
  voiceId, 
  stability,
  similarityBoost,
  style,
  useSpeakerBoost = true
}: { 
  text: string, 
  language?: string,
  voiceId?: string,
  stability?: number,
  similarityBoost?: number,
  style?: number,
  useSpeakerBoost?: boolean
}) {
  const error = validateTtsTextInput(text);
  if (error) throw new Error(error);

  const processedText = preprocessTextForTTS(text, language);

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
        language,
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
        
        const utterance = new window.SpeechSynthesisUtterance(preprocessTextForTTS(text, language));
        
        // Enhanced mobile-friendly settings
        utterance.lang = language;
        utterance.rate = 0.75; // Slower for mobile clarity
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        // Enhanced voice selection for mobile with better language mapping
        const voices = window.speechSynthesis.getVoices();
        let targetLang = language.toLowerCase();
        
        // Better language code mapping for browser TTS
        const langMappings: Record<string, string[]> = {
          'norwegian': ['nb', 'no', 'nn'],
          'swedish': ['sv'],
          'arabic': ['ar'],
          'chinese': ['zh', 'zh-cn', 'zh-tw'],
          'german': ['de'],
          'spanish': ['es'],
          'french': ['fr'],
          'italian': ['it'],
          'portuguese': ['pt'],
          'dutch': ['nl'],
          'japanese': ['ja'],
          'english': ['en']
        };
        
        const possibleLangCodes = langMappings[targetLang] || [targetLang];
        
        // Find the best voice for the language
        let selectedVoice = null;
        
        // First try to find local voices for the language
        for (const langCode of possibleLangCodes) {
          const localVoices = voices.filter(voice => {
            const voiceLang = voice.lang.toLowerCase();
            return voice.localService && (voiceLang.startsWith(langCode) || voiceLang.includes(langCode));
          });
          if (localVoices.length > 0) {
            selectedVoice = localVoices[0];
            break;
          }
        }
        
        // If no local voice found, try any voice for the language
        if (!selectedVoice) {
          for (const langCode of possibleLangCodes) {
            const anyVoice = voices.find(voice => {
              const voiceLang = voice.lang.toLowerCase();
              return voiceLang.startsWith(langCode) || voiceLang.includes(langCode);
            });
            if (anyVoice) {
              selectedVoice = anyVoice;
              break;
            }
          }
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
