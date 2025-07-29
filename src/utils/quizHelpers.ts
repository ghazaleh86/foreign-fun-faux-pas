
import { Phrase } from "@/types/quiz";
import { Option } from "@/components/MultipleChoiceOptions";

// Constants for game configuration
export const STAGE_SIZE = 10;
export const MAX_STAGES = 10;
export const XP_PER_CORRECT = 10;
export const XP_PER_HEART = 50;
export const CORRECT_SCORE = 30;
export const INCORRECT_SCORE = -20;
export const STREAK_BONUS = 10;
export const HEART_PENALTY = 1;
export const MAX_HEARTS = 3;

// Function to calculate the maximum possible score for a stage
export const calculateMaxStageScore = (stageSize: number) => {
  return stageSize * CORRECT_SCORE;
};

// Function to shuffle an array (used for shuffling options)
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Function to calculate the weighted score for a phrase
export function calculatePhraseWeight(phrase: Phrase): number {
  // Example weights - adjust as needed
  const difficultyWeight = 1 + phrase.difficulty * 0.5; // Higher difficulty = higher weight
  return difficultyWeight;
}

// Function to select phrases based on weighted probability
export function selectWeightedPhrases(phrases: Phrase[], count: number): Phrase[] {
  if (phrases.length <= count) {
    return phrases; // Return all phrases if count is larger than the array
  }

  const weights = phrases.map(phrase => calculatePhraseWeight(phrase));
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

  const selectedPhrases: Phrase[] = [];
  const remainingPhrases = [...phrases];
  const remainingWeights = [...weights];

  for (let i = 0; i < count; i++) {
    let random = Math.random() * totalWeight;
    let index = 0;
    while (random > remainingWeights[index]) {
      random -= remainingWeights[index];
      index++;
    }

    selectedPhrases.push(remainingPhrases[index]);
    remainingPhrases.splice(index, 1);
    remainingWeights.splice(index, 1);
  }

  return selectedPhrases;
}

// Function to determine if the current question is the last in the stage
export const isLastQuestionInStage = (current: number, currentStageStart: number, phrasesLength: number, stageSize: number): boolean => {
  const questionIndexInStage = current - currentStageStart;
  return questionIndexInStage === Math.min(stageSize, phrasesLength - currentStageStart) - 1;
};

// Enhanced native voice mapping for better pronunciation quality
export const NATIVE_VOICES: Record<string, string> = {
  // Major world languages with ElevenLabs voice IDs for optimal pronunciation
  english: 'pNInz6obpgDQGcFmaJgB', // Rachel - clear, neutral English
  spanish: 'iP95p4xoKVk53GoZ742B', // Chris - native Spanish
  french: 'cgSgspJ2msm6clMCkdW9', // Jessica - native French  
  german: 'nPczCjzI2devNBz1zQrb', // Brian - native German
  italian: 'AZnzlk1XvdvUeBnXmlld', // Domi - native Italian
  portuguese: 'cjVigY5qzO86Huf0OWal', // Eric - native Portuguese
  chinese: 'TX3LPaxmHKxFdv7VOQHJ', // Liam - optimized for tonal languages like Chinese
  japanese: 'XrExE9yKIg1WjnnlVkGX', // Matilda - good for Japanese pronunciation
  korean: 'Bill',
  arabic: 'Daniel',
  hindi: 'Lily',
  bengali: 'Alice',
  tamil: 'Liam',
  telugu: 'Jessica',
  marathi: 'Lily',
  gujarati: 'Alice',
  punjabi: 'Liam',
  urdu: 'Daniel',

  // European languages with improved voice assignments
  ukrainian: 'George',
  hungarian: 'George', 
  romanian: 'Domi',
  bulgarian: 'Will',
  croatian: 'Charlie',
  dutch: 'Callum',
  polish: 'Will',
  czech: 'Charlie',
  slovak: 'Charlie',
  serbian: 'Will',
  greek: 'Charlotte',
  danish: 'River',
  finnish: 'Callum',
  swedish: 'River',
  norwegian: 'Callum',
  
  // Asian languages with tonal optimization
  vietnamese: 'Charlotte',
  thai: 'Lily',
  turkish: 'Eric',
  
  // African languages
  swahili: 'Rachel',
  zulu: 'Rachel',
  afrikaans: 'Callum'
};

// Phase 3: Enhanced language tier system with new additions
export const LANGUAGE_TIERS: Record<string, number> = {
  english: 1,
  spanish: 1,
  french: 2,
  german: 2,
  italian: 3,
  portuguese: 3,
  mandarin: 2,
  japanese: 3,
  korean: 3,
  arabic: 3,
  hindi: 2,
  bengali: 3,
  tamil: 3,
  telugu: 4,
  marathi: 4,
  gujarati: 4,
  punjabi: 4,
  urdu: 4,

  // Eastern European Languages - strategic tier placement
  ukrainian: 2, // High priority given current global relevance
  hungarian: 3, // Important EU language
  romanian: 3, // Major Eastern European language
  bulgarian: 4, // Regional importance
  croatian: 4, // Balkan regional language
  
  // Asian Languages - balanced tier distribution
  indonesian: 2, // 4th most populous country, high priority
  mongolian: 4, // Unique cultural significance, specialized interest
  burmese: 3, // Major Southeast Asian language
  nepali: 4, // Regional South Asian importance
  khmer: 4, // Cultural heritage significance
};

// Missing function implementations
export function getCurrentVoice(current: number): string {
  // Simple implementation that cycles through available voices
  const voices = Object.values(NATIVE_VOICES);
  return voices[current % voices.length] || 'Ava';
}

export function computeSpeedBonus(timeTaken: number): number {
  // Calculate speed bonus based on time taken
  if (timeTaken <= 3) return 50;
  if (timeTaken <= 5) return 30;
  if (timeTaken <= 8) return 20;
  if (timeTaken <= 12) return 10;
  return 0;
}

export function getSpeedBonusXP(timeTaken: number): number {
  // XP bonus for quick answers
  if (timeTaken <= 3) return 15;
  if (timeTaken <= 5) return 10;
  if (timeTaken <= 8) return 5;
  return 0;
}

export function randomWrongTaunt(opponentName: string): string {
  const taunts = [
    `${opponentName} got that one right! 🎯`,
    `${opponentName} is pulling ahead! 🏃‍♂️`,
    `${opponentName} knows their stuff! 🧠`,
    `${opponentName} scored on that one! ⚽`,
    `${opponentName} is on fire! 🔥`,
  ];
  return taunts[Math.floor(Math.random() * taunts.length)];
}

export function getNativeVoiceForLanguage(language: string): string {
  return NATIVE_VOICES[language.toLowerCase()] || 'Ava';
}

export function getLanguageVoiceSettings(language: string): Record<string, any> {
  // Return voice settings based on language
  const normalizedLang = language.toLowerCase();
  return {
    stability: 0.75,
    similarity_boost: 0.8,
    style: 0.2,
    use_speaker_boost: true
  };
}

export function getShuffledOptions(phrase: Phrase): Option[] {
  const options: Option[] = [
    { label: phrase.correct_meaning, isCorrect: true },
    { label: phrase.incorrect1, isCorrect: false },
    { label: phrase.incorrect2, isCorrect: false },
  ];
  return shuffleArray(options);
}
