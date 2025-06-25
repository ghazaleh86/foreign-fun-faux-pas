
import { Phrase } from "@/types/quiz";
import { Option } from "@/components/MultipleChoiceOptions";

export const STAGE_SIZE = 10;
export const ROUND_SIZE = 5;

// Updated with more natural-sounding voices
export const ELEVENLABS_VOICES = [
  { name: "Rachel", id: "pNInz6obpgDQGcFmaJgB" }, // Very natural female voice
  { name: "Drew", id: "29vD33N1CtxCmqQRPOHJ" }, // Natural male voice
  { name: "Clyde", id: "2EiwWnXFnvU5JabPnv8n" }, // Warm male voice
  { name: "Domi", id: "AZnzlk1XvdvUeBnXmlld" }, // Confident female voice
  { name: "Dave", id: "CYw3kZ02Hs0563khs1Fj" }, // Conversational male voice
  { name: "Fin", id: "D38z5RcWu1voky8WS1ja" }, // Friendly male voice
  { name: "Sarah", id: "EXAVITQu4vr4xnSDxMaL" }, // Clear female voice
  { name: "Antoni", id: "ErXwobaYiN019PkySvjV" }, // Warm male voice
];

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

export const getCurrentVoice = (idx: number) => ELEVENLABS_VOICES[idx % ELEVENLABS_VOICES.length].id;

// Voice-specific settings for optimal naturalness
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
