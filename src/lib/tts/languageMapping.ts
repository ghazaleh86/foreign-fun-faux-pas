
// Enhanced language code mappings for comprehensive language support including island languages
export const islandLanguageCodes: Record<string, string[]> = {
  // INDIAN SUBCONTINENT LANGUAGES
  'hindi': ['hi-IN', 'hi', 'en-IN'],
  'bengali': ['bn-IN', 'bn-BD', 'bn', 'en-IN'],
  'tamil': ['ta-IN', 'ta-LK', 'ta', 'en-IN'],
  'telugu': ['te-IN', 'te', 'en-IN'],
  'marathi': ['mr-IN', 'mr', 'en-IN'],
  'gujarati': ['gu-IN', 'gu', 'en-IN'],
  'punjabi': ['pa-IN', 'pa-PK', 'pa', 'en-IN'],
  'urdu': ['ur-PK', 'ur-IN', 'ur', 'en-PK'],
  
  // PACIFIC ISLANDS
  'tagalog': ['tl-PH', 'fil-PH', 'tl', 'en-PH'],
  'samoan': ['sm-WS', 'sm', 'en-WS', 'en-US'],
  'fijian': ['fj-FJ', 'fj', 'en-FJ', 'en-US'],
  'tongan': ['to-TO', 'to', 'en-TO', 'en-US'],
  'chamorro': ['ch-GU', 'ch', 'en-GU', 'en-US'],
  'māori': ['mi-NZ', 'mi', 'en-NZ', 'en-US'],
  'maori': ['mi-NZ', 'mi', 'en-NZ', 'en-US'],
  
  // NORDIC/EUROPEAN ISLANDS
  'icelandic': ['is-IS', 'is'],
  'faroese': ['fo-FO', 'fo', 'da-DK', 'no-NO'],
  'maltese': ['mt-MT', 'mt', 'en-MT', 'it-IT'],
  'corsican': ['co-FR', 'co', 'fr-FR', 'it-IT'],
  'sicilian': ['scn-IT', 'it-IT', 'it'],
  
  // CARIBBEAN
  'jamaican patois': ['en-JM', 'en-GB', 'en-US'],
  'haitian creole': ['ht-HT', 'ht', 'fr-HT', 'fr-FR'],
  'papiamento': ['pap-AW', 'pap', 'es-ES', 'nl-NL'],
  'spanish (cuba)': ['es-CU', 'es-ES', 'es'],
  'spanish (dominican republic)': ['es-DO', 'es-ES', 'es'],
  
  // INDIAN OCEAN & OCEANIC
  'sinhala': ['si-LK', 'si', 'en-LK'],
  'dhivehi': ['dv-MV', 'dv', 'en-MV', 'ar-SA'],
  'mauritian creole': ['mfe-MU', 'fr-MU', 'fr-FR', 'en-MU'],
  'seychellois creole': ['crs-SC', 'fr-SC', 'fr-FR', 'en-SC'],
  'tok pisin': ['tpi-PG', 'en-PG', 'en-US'],
  
  // Standard language mappings
  'norwegian': ['nb-NO', 'nb', 'no-NO', 'no', 'nn-NO', 'nn'],
  'swedish': ['sv-SE', 'sv'],
  'arabic': ['ar-SA', 'ar'],
  'chinese': ['zh-CN', 'zh', 'zh-cn', 'zh-tw'],
  'german': ['de-DE', 'de'],
  'spanish': ['es-ES', 'es'],
  'french': ['fr-FR', 'fr'],
  'italian': ['it-IT', 'it'],
  'portuguese': ['pt-PT', 'pt-BR', 'pt'],
  'dutch': ['nl-NL', 'nl'],
  'japanese': ['ja-JP', 'ja'],
  'english': ['en-US', 'en-GB', 'en'],
  'korean': ['ko-KR', 'ko'],
  'polish': ['pl-PL', 'pl'],
  'russian': ['ru-RU', 'ru'],
  'turkish': ['tr-TR', 'tr'],
  'vietnamese': ['vi-VN', 'vi'],
  'thai': ['th-TH', 'th'],
  'czech': ['cs-CZ', 'cs'],
  'afrikaans': ['af-ZA', 'af'],
  'farsi': ['fa-IR', 'fa'],
  'persian': ['fa-IR', 'fa'],
  'mali': ['bm-ML', 'bm', 'en-US', 'en'],
  'bambara': ['bm-ML', 'bm', 'en-US', 'en'],
  'irish': ['ga-IE', 'ga', 'en-IE', 'en-US', 'en'],
  'gaeilge': ['ga-IE', 'ga', 'en-IE', 'en-US', 'en'],
  'scottish': ['gd-GB', 'gd', 'en-GB', 'en-US', 'en'],
  'scottish gaelic': ['gd-GB', 'gd', 'en-GB', 'en-US', 'en'],
  'hebrew': ['he-IL', 'he'],
  'colombian spanish': ['es-CO', 'es-ES', 'es'],
  'mexican spanish': ['es-MX', 'es-ES', 'es'],
  'costa rican spanish': ['es-CR', 'es-ES', 'es'],
  'english (south africa)': ['en-ZA', 'en-GB', 'en-US', 'en']
};

// Enhanced normalize language variants for island countries
export const normalizeLanguageVariant = (lang: string): string => {
  const normalized = lang.toLowerCase();
  const variantMappings: Record<string, string> = {
    "colombian spanish": "spanish",
    "mexican spanish": "spanish", 
    "costa rican spanish": "spanish",
    "english (south africa)": "english",
    "spanish (cuba)": "spanish",
    "spanish (dominican republic)": "spanish",
    "filipino": "tagalog",
  };
  return variantMappings[normalized] || normalized;
};

// Language tier definitions for weighted selection with global diversity
export const languageTiers = {
  tier1: {
    weight: 0.50, // 50% of phrases - Major world languages by speaker count
    languages: [
      'chinese', 'hindi', 'english', 'spanish', 'arabic', 'bengali', 
      'portuguese', 'russian', 'japanese', 'french'
    ]
  },
  tier2: {
    weight: 0.35, // 35% of phrases - Diverse regional languages from all continents
    languages: [
      // European languages
      'german', 'italian', 'polish', 'dutch', 'swedish', 'norwegian', 'czech',
      // Asian languages (non-Indian)
      'korean', 'vietnamese', 'thai', 'turkish',
      // Middle Eastern & African
      'hebrew', 'farsi', 'persian', 'afrikaans',
      // Only 2 major Indian languages in Tier 2 to balance
      'tamil', 'urdu'
    ]
  },
  tier3: {
    weight: 0.15, // 15% of phrases - Island/minority/remaining Indian languages
    languages: [
      // Pacific Islands
      'tagalog', 'samoan', 'fijian', 'tongan', 'chamorro', 'māori', 'maori',
      // Nordic/European Islands
      'icelandic', 'faroese', 'maltese', 'corsican', 'sicilian',
      // Caribbean
      'jamaican patois', 'haitian creole', 'papiamento', 'spanish (cuba)', 
      'spanish (dominican republic)',
      // Indian Ocean & Oceanic
      'sinhala', 'dhivehi', 'mauritian creole', 'seychellois creole', 'tok pisin',
      // African minority
      'mali', 'bambara',
      // Celtic
      'irish', 'gaeilge', 'scottish', 'scottish gaelic',
      // Remaining Indian languages moved to Tier 3
      'telugu', 'marathi', 'gujarati', 'punjabi'
    ]
  }
};

// Get language tier for a given language
export const getLanguageTier = (language: string): 'tier1' | 'tier2' | 'tier3' => {
  const normalizedLang = normalizeLanguageVariant(language.toLowerCase());
  
  if (languageTiers.tier1.languages.includes(normalizedLang)) {
    return 'tier1';
  }
  if (languageTiers.tier2.languages.includes(normalizedLang)) {
    return 'tier2';
  }
  return 'tier3';
};
