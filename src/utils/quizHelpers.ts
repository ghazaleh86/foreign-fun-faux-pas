
import { Phrase } from "@/types/quiz";
import { Option } from "@/components/MultipleChoiceOptions";

export const STAGE_SIZE = 10;
export const ROUND_SIZE = 5;

// Native voice mappings for better language support
export const NATIVE_VOICES = {
  "german": "2EiwWnXFnvU5JabPnv8n", // Clyde - warm German-friendly voice
  "spanish": "ErXwobaYiN019PkySvjV", // Antoni - warm Spanish-friendly voice
  "french": "pNInz6obpgDQGcFmaJgB", // Rachel - clear French pronunciation
  "japanese": "EXAVITQu4vr4xnSDxMaL", // Sarah - clear Japanese pronunciation
  "italian": "AZnzlk1XvdvUeBnXmlld", // Domi - confident Italian voice
  "portuguese": "29vD33N1CtxCmqQRPOHJ", // Drew - natural Portuguese voice
  "dutch": "D38z5RcWu1voky8WS1ja", // Fin - friendly Dutch voice
  "swedish": "CYw3kZ02Hs0563khs1Fj", // Dave - conversational Swedish voice
  "norwegian": "29vD33N1CtxCmqQRPOHJ", // Drew - natural pronunciation for Norwegian
  "arabic": "ErXwobaYiN019PkySvjV", // Antoni - works well for Arabic
  "chinese": "EXAVITQu4vr4xnSDxMaL", // Sarah - clear pronunciation for Chinese
  "english": "pNInz6obpgDQGcFmaJgB", // Rachel - default English
};

// Language-optimized voice settings for natural speech
export const LANGUAGE_VOICE_SETTINGS = {
  "german": { stability: 0.6, similarityBoost: 0.9, style: 0.1 },
  "spanish": { stability: 0.4, similarityBoost: 0.9, style: 0.3 },
  "french": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  "japanese": { stability: 0.7, similarityBoost: 0.7, style: 0.1 },
  "italian": { stability: 0.5, similarityBoost: 0.9, style: 0.4 },
  "portuguese": { stability: 0.6, similarityBoost: 0.8, style: 0.3 },
  "dutch": { stability: 0.6, similarityBoost: 0.8, style: 0.2 },
  "swedish": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  "norwegian": { stability: 0.7, similarityBoost: 0.9, style: 0.05 },
  "arabic": { stability: 0.6, similarityBoost: 0.9, style: 0.3 },
  "chinese": { stability: 0.7, similarityBoost: 0.7, style: 0.1 },
  "english": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
};

export const getShuffledOptions = (phrase: Phrase): Option[] => {
  const options: Option[] = [
    { label: phrase.correct_meaning, isCorrect: true },
    { label: phrase.incorrect1, isCorrect: false },
    { label: phrase.incorrect2, isCorrect: false },
  ];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
};

export function computeSpeedBonus(timeTaken: number): number {
  if (timeTaken <= 4) return 3;
  if (timeTaken <= 8) return 2;
  return 1;
}

export function getSpeedBonusXP(timeTaken: number) {
  if (timeTaken <= 4) return 5;
  if (timeTaken <= 8) return 2;
  return 0;
}

// Get native voice for a specific language
export const getNativeVoiceForLanguage = (language: string) => {
  const normalizedLanguage = language.toLowerCase();
  return NATIVE_VOICES[normalizedLanguage] || NATIVE_VOICES["english"];
};

// Get optimized voice settings for a specific language
export const getLanguageVoiceSettings = (language: string) => {
  const normalizedLanguage = language.toLowerCase();
  return LANGUAGE_VOICE_SETTINGS[normalizedLanguage] || LANGUAGE_VOICE_SETTINGS["english"];
};

// Deprecated - kept for backward compatibility but now uses language-based selection
export const getCurrentVoice = (idx: number) => NATIVE_VOICES["english"];

// Voice-specific settings for optimal naturalness (deprecated in favor of language-based settings)
export const getVoiceSettings = (voiceId: string) => {
  const voiceConfigs = {
    "pNInz6obpgDQGcFmaJgB": { stability: 0.5, similarityBoost: 0.8, style: 0.2 }, // Rachel
    "29vD33N1CtxCmqQRPOHJ": { stability: 0.6, similarityBoost: 0.7, style: 0.3 }, // Drew
    "2EiwWnXFnvU5JabPnv8n": { stability: 0.4, similarityBoost: 0.9, style: 0.1 }, // Clyde
    "AZnzlk1XvdvUeBnXmlld": { stability: 0.7, similarityBoost: 0.6, style: 0.4 }, // Domi
    "CYw3kZ02Hs0563khs1Fj": { stability: 0.5, similarityBoost: 0.8, style: 0.2 }, // Dave
    "D38z5RcWu1voky8WS1ja": { stability: 0.6, similarityBoost: 0.7, style: 0.3 }, // Fin
    "EXAVITQu4vr4xnSDxMaL": { stability: 0.5, similarityBoost: 0.8, style: 0.1 }, // Sarah
    "ErXwobaYiN019PkySvjV": { stability: 0.4, similarityBoost: 0.9, style: 0.2 }, // Antoni
  };
  
  return voiceConfigs[voiceId] || { stability: 0.5, similarityBoost: 0.8, style: 0.2 };
};

// Updated taunts to be from Chippy specifically
export function randomWrongTaunt(name: string) {
  const taunts = [
    `Incorrect answer - Chippy got this one! 🐿️`,
    `That's not right - Chippy is ahead now!`,
    `Not quite correct - Chippy squeaks with joy!`,
    `Incorrect - Chippy scurries ahead with a point!`,
    `That's not the right answer - Chippy's tail twitches with excitement!`,
    `Chippy got this one right, but you didn't! 🌰`,
    `Incorrect choice - Chippy gathers another acorn!`,
    `Not the right answer - Chippy takes the point!`,
    `That's incorrect - Chippy chittering happily!`,
    `Chippy knows this one better than you! 🐿️`,
    `Wrong answer - Chippy's cheeks are full of success!`,
    `Incorrect - Chippy says "Better luck next time!" 🌰`,
  ];
  return taunts[Math.floor(Math.random() * taunts.length)];
}
