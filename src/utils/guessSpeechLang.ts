
/**
 * Utility to map language names to Web Speech API BCP-47 codes.
 */
export function guessSpeechLang(language: string): string {
  const languageMap: Record<string, string> = {
    English: "en-US",
    Spanish: "es-ES",
    French: "fr-FR",
    German: "de-DE",
    Italian: "it-IT",
    Dutch: "nl-NL",
    Portuguese: "pt-PT",
    Russian: "ru-RU",
    Japanese: "ja-JP",
    Chinese: "zh-CN",
    Korean: "ko-KR",
    Arabic: "ar-SA",
    Hindi: "hi-IN",
    Polish: "pl-PL",
    Turkish: "tr-TR",
    Ukrainian: "uk-UA",
    Swedish: "sv-SE",
    Norwegian: "no-NO",
    Danish: "da-DK",
    Finnish: "fi-FI",
    Czech: "cs-CZ",
    Greek: "el-GR",
    Hungarian: "hu-HU",
  Romanian: "ro-RO",
  Slovak: "sk-SK",
    Bulgarian: "bg-BG",
    Croatian: "hr-HR",
    Serbian: "sr-RS",
    Catalan: "ca-ES",
    Indonesian: "id-ID",
    Malay: "ms-MY",
  Thai: "th-TH",
  Vietnamese: "vi-VN",
  Farsi: "fa-IR",
  Persian: "fa-IR", 
  Mali: "bm-ML",
  Bambara: "bm-ML",
  Irish: "ga-IE",
  Gaeilge: "ga-IE",
  Scottish: "gd-GB",
  "Scottish Gaelic": "gd-GB",
  Hebrew: "he-IL"
  // Extend as needed.
  };
  return languageMap[language] || "en-US";
}
