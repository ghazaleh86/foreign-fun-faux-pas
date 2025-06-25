
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
    
    // Optimize audio playback
    audio.volume = 0.9;
    audio.playbackRate = 0.95; // Slightly slower for better clarity
    
    audio.play();
    return audio;
  } catch (err) {
    console.error("[TTS] ElevenLabs Error:", err);
    throw err;
  }
}

// Enhanced fallback with better browser TTS settings
export function playWithBrowserTTS(text: string, language: string = "en") {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new window.SpeechSynthesisUtterance(preprocessTextForTTS(text));
    
    // Enhanced browser TTS settings
    utterance.lang = language;
    utterance.rate = 0.9; // Slightly slower
    utterance.pitch = 1.0; // Natural pitch
    utterance.volume = 0.9;
    
    // Try to use a more natural voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoices = voices.filter(voice => 
      voice.lang.startsWith(language) && 
      (voice.name.includes('Neural') || voice.name.includes('Premium') || voice.voiceURI.includes('premium'))
    );
    
    if (preferredVoices.length > 0) {
      utterance.voice = preferredVoices[0];
    }
    
    window.speechSynthesis.speak(utterance);
    return utterance;
  }
}
