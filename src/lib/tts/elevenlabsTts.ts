
import { validateTtsTextInput } from '../validateTtsInput';
import { preprocessTextForTTS } from './textPreprocessing';
import { isMobileDevice, initializeAudioContext } from './audioUtils';
import { audioManager } from './audioManager';

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

  // Normalize language to lowercase for consistent voice selection
  const normalizedLanguage = language.toLowerCase();
  const processedText = preprocessTextForTTS(text, normalizedLanguage);

  // Stop any existing audio before starting new one
  audioManager.prepareForNewAudio();

  // For mobile devices, ensure audio context is initialized
  if (isMobileDevice()) {
    await initializeAudioContext();
  }

  try {
    console.log('🎵 ElevenLabs API Call:', {
      text: processedText.slice(0, 30),
      language: normalizedLanguage,
      voiceId,
      stability,
      similarityBoost,
      style,
      useSpeakerBoost,
      edgeUrl: EDGE_URL
    });

    const res = await fetch(EDGE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        text: processedText, 
        language: normalizedLanguage,
        voiceId,
        stability,
        similarityBoost,
        style,
        useSpeakerBoost
      }),
    });

    console.log('🎵 ElevenLabs API Response Status:', res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error('❌ TTS API failed:', {
        status: res.status,
        statusText: res.statusText,
        error: errorText,
        url: EDGE_URL
      });
      
      if (res.status === 429) {
        throw new Error("ElevenLabs quota exceeded. Check your API key and usage limits.");
      }
      
      if (res.status === 401) {
        throw new Error("ElevenLabs API key invalid or missing. Check your Supabase edge function secrets.");
      }
      
      throw new Error(`ElevenLabs API error (${res.status}): ${errorText}`);
    }

    const audioBlob = await res.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    
    // Register with audio manager for cleanup
    audioManager.registerAudio(audio);
    
    // Mobile-optimized audio settings
    audio.volume = 1.0;
    audio.preload = 'auto';
    
    // Enhanced mobile audio handling
    if (isMobileDevice()) {
      // Set additional mobile-friendly properties
      audio.setAttribute('playsinline', 'true');
      audio.setAttribute('webkit-playsinline', 'true');
    }
    
    // Improved error handling for audio events
    return new Promise<HTMLAudioElement>((resolve, reject) => {
      const cleanup = () => {
        audio.removeEventListener('canplaythrough', onCanPlay);
        audio.removeEventListener('error', onError);
        audio.removeEventListener('loadstart', onLoadStart);
        audio.removeEventListener('ended', onEnded);
      };

      const onCanPlay = () => {
        console.log('✅ Audio ready to play');
      };
      
      const onError = (e: Event) => {
        console.error('❌ Audio playback error:', e);
        cleanup();
        reject(new Error('Audio playback failed - media format may not be supported'));
      };
      
      const onLoadStart = () => {
        console.log('🔄 Audio loading started');
      };

      const onEnded = () => {
        console.log('✅ Audio playback completed');
        cleanup();
        URL.revokeObjectURL(audioUrl); // Clean up blob URL
      };
      
      // Add event listeners
      audio.addEventListener('canplaythrough', onCanPlay);
      audio.addEventListener('error', onError);
      audio.addEventListener('loadstart', onLoadStart);
      audio.addEventListener('ended', onEnded);
      
      // Play with proper error handling
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('✅ Audio playing successfully');
            resolve(audio);
          })
          .catch((playError) => {
            console.error('❌ Audio play failed:', playError);
            cleanup();
            reject(new Error(`Audio play failed: ${playError.message}`));
          });
      } else {
        // For older browsers that don't return a promise
        resolve(audio);
      }
    });
  } catch (err) {
    console.error("[TTS] ElevenLabs Error:", err);
    throw err;
  }
}
