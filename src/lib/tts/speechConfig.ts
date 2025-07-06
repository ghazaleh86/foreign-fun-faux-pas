import { getLanguageFamily, normalizeLanguageVariant } from './languageMapping';

// Phase 4: Enhanced speech rate settings optimized for language families
export const islandLanguageRates: Record<string, number> = {
  // INDIAN LANGUAGES - Slower rates for complex phonetics
  'hindi': 0.8,
  'bengali': 0.8,
  'tamil': 0.7,  // Tamil has complex sounds
  'telugu': 0.8,
  'marathi': 0.8,
  'gujarati': 0.8,
  'punjabi': 0.9,
  'urdu': 0.8,
  'sinhala': 0.8,
  
  // TONAL LANGUAGES - Slower for proper tone pronunciation
  'chinese': 0.7,
  'vietnamese': 0.7,
  'thai': 0.7,
  
  // GERMANIC LANGUAGES - Natural pace
  'german': 0.9,
  'dutch': 0.9,
  'english': 1.0,
  'swedish': 0.9,
  'norwegian': 0.9,
  'danish': 0.9,
  'icelandic': 0.8,
  'faroese': 0.8,
  
  // ROMANCE LANGUAGES - Slightly faster, natural flow
  'spanish': 1.0,
  'french': 0.9,
  'italian': 1.0,
  'portuguese': 1.0,
  'romanian': 0.9,
  'corsican': 0.9,
  'sicilian': 1.0,
  
  // SLAVIC LANGUAGES - Moderate pace
  'russian': 0.9,
  'polish': 0.9,
  'czech': 0.9,
  'slovak': 0.9,
  'bulgarian': 0.9,
  'croatian': 0.9,
  'serbian': 0.9,
  'ukrainian': 0.9,
  
  // PACIFIC ISLAND LANGUAGES - Relaxed pace
  'tagalog': 0.9,
  'samoan': 0.8,
  'fijian': 0.8,
  'tongan': 0.8,
  'chamorro': 0.8,
  'māori': 0.8,
  'maori': 0.8,
  'tok pisin': 0.9,
  
  // SEMITIC LANGUAGES - Careful pronunciation
  'arabic': 0.8,
  'hebrew': 0.8,
  
  // OTHERS
  'japanese': 0.8,
  'korean': 0.8,
  'turkish': 0.9,
  'finnish': 0.9,
  'hungarian': 0.9,
  'greek': 0.9,
  'maltese': 0.9,
  'afrikaans': 0.9,
  'swahili': 0.9,
  'zulu': 0.9,
  
  // CREOLE LANGUAGES - Natural conversational pace
  'jamaican patois': 1.0,
  'haitian creole': 0.9,
  'papiamento': 0.9,
  'mauritian creole': 0.9,
  'seychellois creole': 0.9,
  
  // CELTIC LANGUAGES - Careful pronunciation
  'irish': 0.8,
  'gaeilge': 0.8,
  'scottish': 0.8,
  'scottish gaelic': 0.8,
  
  // PERSIAN/IRANIAN
  'farsi': 0.8,
  'persian': 0.8,
  
  // AFRICAN LANGUAGES
  'mali': 0.9,
  'bambara': 0.9,
  
  // SPANISH VARIANTS
  'colombian spanish': 1.0,
  'mexican spanish': 1.0,
  'costa rican spanish': 1.0,
  'spanish (cuba)': 1.0,
  'spanish (dominican republic)': 1.0,
  
  // ENGLISH VARIANTS
  'english (south africa)': 1.0,
  
  // OCEANIC
  'dhivehi': 0.8,
};

// Phase 4: Create optimized speech utterance with family-based settings
export function createSpeechUtterance(text: string, language: string): SpeechSynthesisUtterance {
  const utterance = new SpeechSynthesisUtterance(text);
  const normalizedLanguage = normalizeLanguageVariant(language.toLowerCase());
  const languageFamily = getLanguageFamily(normalizedLanguage);
  
  // Set language-specific rate
  utterance.rate = islandLanguageRates[normalizedLanguage] || 0.9;
  
  // Family-based voice settings optimization
  switch (languageFamily) {
    case 'indic':
      utterance.pitch = 1.1; // Slightly higher pitch for clarity
      utterance.volume = 0.9;
      break;
    case 'germanic':
      utterance.pitch = 0.9; // Slightly lower, authoritative
      utterance.volume = 1.0;
      break;
    case 'romance':
      utterance.pitch = 1.0;
      utterance.volume = 0.95;
      break;
    case 'sinitic':
    case 'japonic':
      utterance.pitch = 1.0;
      utterance.volume = 0.9;
      utterance.rate = Math.min(utterance.rate, 0.8); // Ensure slower for tones
      break;
    case 'pacific':
      utterance.pitch = 1.05; // Warm, friendly
      utterance.volume = 0.95;
      break;
    case 'semitic':
      utterance.pitch = 0.95;
      utterance.volume = 0.9;
      break;
    case 'celtic':
      utterance.pitch = 1.0;
      utterance.volume = 0.9;
      utterance.rate = Math.min(utterance.rate, 0.8); // Careful pronunciation
      break;
    case 'creole':
      utterance.pitch = 1.05; // Natural, conversational
      utterance.volume = 1.0;
      break;
    default:
      utterance.pitch = 1.0;
      utterance.volume = 0.95;
  }
  
  console.log(`🎵 Speech config for ${normalizedLanguage} (${languageFamily}):`, {
    rate: utterance.rate,
    pitch: utterance.pitch,
    volume: utterance.volume
  });
  
  return utterance;
}
