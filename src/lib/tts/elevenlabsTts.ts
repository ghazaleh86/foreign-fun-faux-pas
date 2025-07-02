import { validateTtsTextInput } from '../validateTtsInput';
import { preprocessTextForTTS } from './textPreprocessing';
import { isMobileDevice, initializeAudioContext } from './audioUtils';

const EDGE_URL = "https://ayfmkmnecfjyhdutxfjp.supabase.co/functions/v1/elevenlabs-tts";

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
      const errorText = await res.text();
      console.error('❌ TTS API failed with status:', res.status, 'Error:', errorText);
      
      if (res.status === 429) {
        throw new Error("ElevenLabs quota exceeded. Using browser fallback for better audio quality.");
      }
      
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