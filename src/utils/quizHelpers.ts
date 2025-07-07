import { Phrase } from "@/types/quiz";

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

// Phase 3: Enhanced native voices with new language support
export const NATIVE_VOICES: Record<string, string> = {
  english: 'Ava',
  spanish: 'Lucia',
  french: 'Amelie',
  german: ' বস',
  italian: 'Bianca',
  portuguese: 'Ines',
  mandarin: 'Li',
  japanese: 'Aiko',
  korean: 'Hana',
  arabic: 'Salma',
  hindi: 'Aditi',
  bengali: 'Aisha',
  tamil: 'Akshaya',
  telugu: 'Lakshmi',
  marathi: 'Priya',
  gujarati: 'Bhakti',
  punjabi: 'Harleen',
  urdu: 'Aalia',

  // Eastern European Languages - optimized voice selection
  ukrainian: 'Liam', // Clear, articulate voice for Slavic languages
  hungarian: 'Josh', // Warm voice for unique Finno-Ugric phonetics
  romanian: 'Antoni', // Romance language optimized voice
  bulgarian: 'Liam', // Consistent Slavic voice selection
  croatian: 'Josh', // Balanced voice for Balkan languages
  
  // Asian Languages - culturally appropriate voice selection
  indonesian: 'Grace', // Friendly voice for Southeast Asian languages
  mongolian: 'Liam', // Strong, clear voice for Central Asian languages
  burmese: 'Grace', // Gentle voice suitable for tonal Southeast Asian languages
  nepali: 'Freya', // Clear voice for South Asian mountain languages
  khmer: 'Grace', // Soft voice appropriate for Austroasiatic languages
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
