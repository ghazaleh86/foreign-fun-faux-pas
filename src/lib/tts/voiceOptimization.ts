// Enhanced voice optimization for native pronunciation
import { NATIVE_VOICES } from '@/utils/quizHelpers';

// ElevenLabs voice ID to name mapping for validation
export const ELEVENLABS_VOICE_IDS = {
  'pNInz6obpgDQGcFmaJgB': 'Rachel',
  'iP95p4xoKVk53GoZ742B': 'Chris', 
  'cgSgspJ2msm6clMCkdW9': 'Jessica',
  'nPczCjzI2devNBz1zQrb': 'Brian',
  'AZnzlk1XvdvUeBnXmlld': 'Domi',
  'cjVigY5qzO86Huf0OWal': 'Eric',
  'bIHbv24MWmeRgasZH58o': 'Will',
  'XrExE9yKIg1WjnnlVkGX': 'Matilda',
  'onwK4e9ZLuTAKqWW03F9': 'Daniel',
  'pFZP5JQG7iQjIQuC4Bku': 'Lily',
  'Xb7hH8MSUJpSbSDYk0k2': 'Alice',
  'TX3LPaxmHKxFdv7VOQHJ': 'Liam',
  'JBFqnCBsd6RMkjVDRZzb': 'George',
  'XB0fDUnXU5powFXDhCwa': 'Charlotte',
  'IKne3meq5aSn9XLyUdCD': 'Charlie',
  'N2lVS1w4EtoT3dr4eOWO': 'Callum',
  'SAz9YHcvj6GT2YYXdXww': 'River',
  'pqHfZKP75CvOlQylNhV4': 'Bill',
};

// Language family groupings for voice fallbacks
export const LANGUAGE_FAMILIES = {
  germanic: ['english', 'german', 'dutch', 'swedish', 'norwegian', 'danish', 'afrikaans'],
  romance: ['spanish', 'french', 'italian', 'portuguese', 'romanian'],
  slavic: ['russian', 'polish', 'czech', 'slovak', 'bulgarian', 'croatian', 'serbian', 'ukrainian'],
  indic: ['hindi', 'bengali', 'tamil', 'telugu', 'marathi', 'gujarati', 'punjabi', 'urdu'],
  tonal: ['chinese', 'japanese', 'korean', 'vietnamese', 'thai'],
  semitic: ['arabic', 'hebrew'],
  turkic: ['turkish'],
  african: ['swahili', 'zulu'],
  other: ['finnish', 'hungarian', 'greek']
};

// Get optimal voice for a language with family-based fallback
export function getOptimalVoice(language: string): string {
  const normalizedLang = language.toLowerCase();
  
  // Primary: Use direct mapping
  if (NATIVE_VOICES[normalizedLang]) {
    return NATIVE_VOICES[normalizedLang];
  }
  
  // Secondary: Find language family and use family-optimized voice
  for (const [family, languages] of Object.entries(LANGUAGE_FAMILIES)) {
    if (languages.includes(normalizedLang)) {
      return getFamilyOptimizedVoice(family);
    }
  }
  
  // Fallback: Use default high-quality voice
  return 'Rachel';
}

function getFamilyOptimizedVoice(family: string): string {
  const familyVoices = {
    germanic: 'pNInz6obpgDQGcFmaJgB',     // Rachel - Clear, neutral English
    romance: 'cgSgspJ2msm6clMCkdW9',      // Jessica - Expressive French
    slavic: 'bIHbv24MWmeRgasZH58o',       // Will - Deep, authoritative
    indic: 'pFZP5JQG7iQjIQuC4Bku',       // Lily - Clear articulation
    tonal: 'TX3LPaxmHKxFdv7VOQHJ',        // Liam - Optimized for tonal languages like Chinese
    semitic: 'onwK4e9ZLuTAKqWW03F9',     // Daniel - Strong articulation
    turkic: 'cjVigY5qzO86Huf0OWal',      // Eric - Versatile
    african: 'pNInz6obpgDQGcFmaJgB',      // Rachel - Clear pronunciation
    other: 'XB0fDUnXU5powFXDhCwa'        // Charlotte - Expressive
  };
  
  return familyVoices[family] || 'pNInz6obpgDQGcFmaJgB';
}

// Enhanced language detection with normalization
export function normalizeLanguageForVoice(language: string): string {
  const normalizations = {
    'mandarin': 'chinese',
    'cantonese': 'chinese',
    'simplified chinese': 'chinese',
    'traditional chinese': 'chinese',
    'brazilian portuguese': 'portuguese',
    'european portuguese': 'portuguese',
    'castilian spanish': 'spanish',
    'latin american spanish': 'spanish',
    'american english': 'english',
    'british english': 'english',
    'australian english': 'english',
  };
  
  const normalized = language.toLowerCase().trim();
  return normalizations[normalized] || normalized;
}

// Quality scoring for voice-language pairing (for future A/B testing)
export function getVoiceQualityScore(voiceName: string, language: string): number {
  const normalizedLang = normalizeLanguageForVoice(language);
  
  // Perfect match bonus
  if (NATIVE_VOICES[normalizedLang] === voiceName) {
    return 100;
  }
  
  // Family match bonus
  for (const [family, languages] of Object.entries(LANGUAGE_FAMILIES)) {
    if (languages.includes(normalizedLang)) {
      const familyVoice = getFamilyOptimizedVoice(family);
      if (familyVoice === voiceName) {
        return 80;
      }
    }
  }
  
  // Default score
  return 60;
}