
export const islandLanguageCodes: Record<string, string[]> = {
  english: ['en', 'en-us', 'eng'],
  spanish: ['es', 'es-es', 'spa'],
  french: ['fr', 'fr-fr', 'fre', 'fra'],
  german: ['de', 'de-de', 'ger', 'deu'],
  italian: ['it', 'it-it', 'ita'],
  portuguese: ['pt', 'pt-pt', 'por'],
  dutch: ['nl', 'nl-nl', 'dut', 'nld'],
  russian: ['ru', 'ru-ru', 'rus'],
  chinese: ['zh', 'zh-cn', 'chi', 'zho'],
  japanese: ['ja', 'ja-jp', 'jpn'],
  korean: ['ko', 'ko-kr', 'kor'],
  arabic: ['ar', 'ar-ae', 'ara'],
  hindi: ['hi', 'hi-in', 'hin'],
  bengali: ['bn', 'bn-bd', 'ben'],
  tamil: ['ta', 'ta-in', 'tam'],
  telugu: ['te', 'te-in', 'tel'],
  marathi: ['mr', 'mr-in', 'mar'],
  gujarati: ['gu', 'gu-in', 'guj'],
  punjabi: ['pa', 'pa-in', 'pan'],
  urdu: ['ur', 'ur-pk', 'urd'],
  
  // Eastern European Languages - Phase 1 additions
  ukrainian: ['uk', 'uk-ua', 'ukr'],
  hungarian: ['hu', 'hu-hu', 'hun'],
  romanian: ['ro', 'ro-ro', 'rum', 'ron'],
  bulgarian: ['bg', 'bg-bg', 'bul'],
  croatian: ['hr', 'hr-hr', 'hrv'],
  
  // Asian Languages - Phase 2 additions
  indonesian: ['id', 'id-id', 'ind'],
  mongolian: ['mn', 'mn-mn', 'mon'],
  burmese: ['my', 'my-mm', 'bur', 'mya'],
  nepali: ['ne', 'ne-np', 'nep'],
  khmer: ['km', 'km-kh', 'khm'],
};

export function getLanguageFamily(language: string): string {
  const lang = language.toLowerCase();
  
  if (['english', 'german', 'dutch'].includes(lang)) return 'germanic';
  if (['spanish', 'french', 'italian', 'portuguese'].includes(lang)) return 'romance';
  if (['russian'].includes(lang)) return 'slavic';
  if (['chinese', 'japanese', 'korean'].includes(lang)) return 'east-asian';
  if (['arabic'].includes(lang)) return 'semitic';
  if (['hindi', 'bengali', 'tamil', 'telugu', 'marathi', 'gujarati', 'punjabi', 'urdu', 'nepali'].includes(lang)) return 'indic';
  
  // Eastern European families
  if (['ukrainian', 'bulgarian', 'croatian'].includes(lang)) return 'slavic';
  if (['hungarian'].includes(lang)) return 'finno-ugric';
  if (['romanian'].includes(lang)) return 'romance';
  
  // Asian families
  if (['indonesian'].includes(lang)) return 'austronesian';
  if (['mongolian'].includes(lang)) return 'mongolic';
  if (['burmese'].includes(lang)) return 'sino-tibetan';
  if (['nepali'].includes(lang)) return 'indic';
  if (['khmer'].includes(lang)) return 'austroasiatic';
  
  return 'other';
}

// Missing function implementations
export function normalizeLanguageVariant(language: string): string {
  const lang = language.toLowerCase();
  
  // Handle language variants and normalize them
  if (lang.includes('en-') || lang === 'eng') return 'english';
  if (lang.includes('es-') || lang === 'spa') return 'spanish';
  if (lang.includes('fr-') || lang === 'fre' || lang === 'fra') return 'french';
  if (lang.includes('de-') || lang === 'ger' || lang === 'deu') return 'german';
  if (lang.includes('it-') || lang === 'ita') return 'italian';
  if (lang.includes('pt-') || lang === 'por') return 'portuguese';
  if (lang.includes('zh-') || lang === 'chi' || lang === 'zho') return 'chinese';
  if (lang.includes('ja-') || lang === 'jpn') return 'japanese';
  if (lang.includes('ko-') || lang === 'kor') return 'korean';
  if (lang.includes('ar-') || lang === 'ara') return 'arabic';
  if (lang.includes('hi-') || lang === 'hin') return 'hindi';
  if (lang.includes('bn-') || lang === 'ben') return 'bengali';
  
  // Eastern European languages
  if (lang.includes('uk-') || lang === 'ukr') return 'ukrainian';
  if (lang.includes('hu-') || lang === 'hun') return 'hungarian';
  if (lang.includes('ro-') || lang === 'rum' || lang === 'ron') return 'romanian';
  if (lang.includes('bg-') || lang === 'bul') return 'bulgarian';
  if (lang.includes('hr-') || lang === 'hrv') return 'croatian';
  
  // Asian languages
  if (lang.includes('id-') || lang === 'ind') return 'indonesian';
  if (lang.includes('mn-') || lang === 'mon') return 'mongolian';
  if (lang.includes('my-') || lang === 'bur' || lang === 'mya') return 'burmese';
  if (lang.includes('ne-') || lang === 'nep') return 'nepali';
  if (lang.includes('km-') || lang === 'khm') return 'khmer';
  
  return lang;
}

// Language tier system
export const languageTiers = {
  tier1: { weight: 0.5, languages: ['english', 'spanish'] },
  tier2: { weight: 0.3, languages: ['french', 'german', 'mandarin', 'hindi', 'ukrainian', 'indonesian'] },
  tier3: { weight: 0.2, languages: ['italian', 'portuguese', 'japanese', 'korean', 'arabic', 'bengali', 'tamil', 'hungarian', 'romanian', 'burmese'] }
};

export function getLanguageTier(language: string): 'tier1' | 'tier2' | 'tier3' {
  const normalizedLang = normalizeLanguageVariant(language.toLowerCase());
  
  if (languageTiers.tier1.languages.includes(normalizedLang)) return 'tier1';
  if (languageTiers.tier2.languages.includes(normalizedLang)) return 'tier2';
  return 'tier3';
}
