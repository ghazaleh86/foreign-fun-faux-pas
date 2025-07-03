
/**
 * Maps language names to their most representative country flag emoji.
 * Extend this as needed for new languages.
 */
export function languageToFlag(language: string): string {
  console.log("🏳️ languageToFlag called with:", language);
  
  const mapping: Record<string, string> = {
    English: "🇬🇧",
    "English (South Africa)": "🇿🇦",
    "South Africa": "🇿🇦",
    Spanish: "🇪🇸",
    "Colombian Spanish": "🇨🇴",
    "Mexican Spanish": "🇲🇽",
    "Argentinian Spanish": "🇦🇷",
    "Spanish (Colombia)": "🇨🇴",
    "Spanish (Mexico)": "🇲🇽",
    "Spanish (Argentina)": "🇦🇷",
    French: "🇫🇷",
    "French (Canada)": "🇨🇦",
    "Canadian French": "🇨🇦",
    German: "🇩🇪",
    "German (Austria)": "🇦🇹",
    "German (Switzerland)": "🇨🇭",
    Italian: "🇮🇹",
    Dutch: "🇳🇱",
    "Dutch (Belgium)": "🇧🇪",
    Portuguese: "🇵🇹",
    "Portuguese (Brazil)": "🇧🇷",
    "Brazilian Portuguese": "🇧🇷",
    Russian: "🇷🇺",
    Japanese: "🇯🇵",
    Chinese: "🇨🇳",
    "Chinese (Simplified)": "🇨🇳",
    "Chinese (Traditional)": "🇹🇼",
    "Mandarin": "🇨🇳",
    Korean: "🇰🇷",
    Arabic: "🇪🇬",
    "Arabic (Saudi Arabia)": "🇸🇦",
    "Arabic (UAE)": "🇦🇪",
    Hindi: "🇮🇳",
    Polish: "🇵🇱",
    Turkish: "🇹🇷",
    Ukrainian: "🇺🇦",
    Swedish: "🇸🇪",
    Norwegian: "🇳🇴",
    Danish: "🇩🇰",
    Finnish: "🇫🇮",
    Czech: "🇨🇿",
    Greek: "🇬🇷",
  Hungarian: "🇭🇺",
  Romanian: "🇷🇴",
  Slovak: "🇸🇰",
    Bulgarian: "🇧🇬",
    Croatian: "🇭🇷",
    Serbian: "🇷🇸",
    Catalan: "🇪🇸",
    Indonesian: "🇮🇩",
    Malay: "🇲🇾",
    Thai: "🇹🇭",
  Vietnamese: "🇻🇳",
  Afrikaans: "🇿🇦",
  Farsi: "🇮🇷",
  Persian: "🇮🇷",
  Mali: "🇲🇱",
  Bambara: "🇲🇱",
  Irish: "🇮🇪",
  Gaeilge: "🇮🇪",
  Scottish: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  "Scottish Gaelic": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  Hebrew: "🇮🇱",
  // add more or tune as needed
  };
  
  // Handle case-insensitive lookup
  const normalizedLanguage = language.charAt(0).toUpperCase() + language.slice(1).toLowerCase();
  const flag = mapping[normalizedLanguage] || mapping[language] || "🌐";
  console.log("🏳️ languageToFlag result:", language, "→", normalizedLanguage, "→", flag);
  return flag;
}
