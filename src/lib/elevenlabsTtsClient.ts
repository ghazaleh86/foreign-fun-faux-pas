const EDGE_URL =
  "https://ayfmkmnecfjyhdutxfjp.supabase.co/functions/v1/elevenlabs-tts";

import { validateTtsTextInput } from './validateTtsInput';

export async function playWithElevenLabsTTS({ text, voiceId = "9BWtsMINqrJLrRacOk9x" }: { text: string, voiceId?: string }) {
  const error = validateTtsTextInput(text);
  if (error) throw new Error(error);

  try {
    const res = await fetch(EDGE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, voiceId }),
    });

    if (!res.ok) throw new Error("Failed to fetch TTS audio");

    const audioBlob = await res.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
    return audio;
  } catch (err) {
    console.error("[TTS] ElevenLabs Error:", err);
    throw err;
  }
}
