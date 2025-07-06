
/**
 * Enhanced utility to map language names to Web Speech API BCP-47 codes with comprehensive coverage.
 */
export function guessSpeechLang(language: string): string {
  const languageMap: Record<string, string> = {
    // Major world languages
    english: "en-US",
    spanish: "es-ES", 
    french: "fr-FR",
    german: "de-DE",
    italian: "it-IT",
    portuguese: "pt-PT",
    russian: "ru-RU",
    japanese: "ja-JP",
    chinese: "zh-CN",
    korean: "ko-KR",
    arabic: "ar-SA",
    
    // Indian subcontinent languages (Phase 2 additions)
    hindi: "hi-IN",
    bengali: "bn-IN",
    tamil: "ta-IN",
    telugu: "te-IN",
    marathi: "mr-IN",
    gujarati: "gu-IN",
    punjabi: "pa-IN",
    urdu: "ur-PK",
    
    // European languages (Phase 2 additions)
    dutch: "nl-NL",
    polish: "pl-PL",
    turkish: "tr-TR",
    czech: "cs-CZ",
    hungarian: "hu-HU",
    romanian: "ro-RO",
    bulgarian: "bg-BG",
    croatian: "hr-HR",
    serbian: "sr-RS",
    ukrainian: "uk-UA",
    greek: "el-GR",
    danish: "da-DK",
    finnish: "fi-FI",
    swedish: "sv-SE",
    norwegian: "no-NO",
    slovak: "sk-SK",
    
    // African languages (Phase 2 additions)
    swahili: "sw-KE",
    zulu: "zu-ZA",
    afrikaans: "af-ZA",
    
    // Middle Eastern & Asian languages
    hebrew: "he-IL",
    farsi: "fa-IR",
    persian: "fa-IR",
    vietnamese: "vi-VN",
    thai: "th-TH",
    indonesian: "id-ID",
    malay: "ms-MY",
    
    // Pacific Island languages (Phase 2 additions)
    tagalog: "tl-PH",
    samoan: "sm-WS",
    fijian: "fj-FJ",
    tongan: "to-TO",
    chamorro: "ch-GU",
    māori: "mi-NZ",
    maori: "mi-NZ",
    
    // Nordic/European Island languages
    icelandic: "is-IS",
    faroese: "fo-FO",
    maltese: "mt-MT",
    corsican: "co-FR",
    sicilian: "it-IT", // Fallback to Italian
    
    // Caribbean languages
    "jamaican patois": "en-JM",
    "haitian creole": "ht-HT",
    papiamento: "pap-AW",
    "spanish (cuba)": "es-CU",
    "spanish (dominican republic)": "es-DO",
    
    // Indian Ocean & Oceanic
    sinhala: "si-LK",
    dhivehi: "dv-MV",
    "mauritian creole": "fr-MU",
    "seychellois creole": "fr-SC",
    "tok pisin": "en-PG",
    
    // Celtic languages
    irish: "ga-IE",
    gaeilge: "ga-IE",
    scottish: "gd-GB",
    "scottish gaelic": "gd-GB",
    
    // Additional African languages
    mali: "bm-ML",
    bambara: "bm-ML",
    
    // Spanish variants
    "colombian spanish": "es-CO",
    "mexican spanish": "es-MX",
    "costa rican spanish": "es-CR",
    "english (south africa)": "en-ZA",
  };
  
  const normalizedLanguage = language.toLowerCase().trim();
  return languageMap[normalizedLanguage] || "en-US";
}
