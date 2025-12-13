export type TtsProvider = "browser" | "elevenlabs";

const STORAGE_KEY = "ttsProvider_v1";

export function getTtsProvider(): TtsProvider {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "elevenlabs" || stored === "browser") return stored;
  } catch {
    // ignore
  }
  // Default to browser TTS so the game works with zero setup.
  return "browser";
}

export function setTtsProvider(provider: TtsProvider) {
  try {
    localStorage.setItem(STORAGE_KEY, provider);
  } catch {
    // ignore
  }
  window.dispatchEvent(new Event("tts-provider-updated"));
}

