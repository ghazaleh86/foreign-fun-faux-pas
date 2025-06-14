
/**
 * Maps language names to their most representative country flag emoji.
 * Extend this as needed for new languages.
 */
export function languageToFlag(language: string): string {
  const mapping: Record<string, string> = {
    English: "🇬🇧",
    "English (South Africa)": "🇿🇦",
    Spanish: "🇪🇸",
    French: "🇫🇷",
    German: "🇩🇪",
    Italian: "🇮🇹",
    Dutch: "🇳🇱",
    Portuguese: "🇵🇹",
    Russian: "🇷🇺",
    Japanese: "🇯🇵",
    Chinese: "🇨🇳",
    Korean: "🇰🇷",
    Arabic: "🇪🇬", // Egypt as example
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
    Hebrew: "🇮🇱",
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
    // add more or tune as needed
  };
  return mapping[language] || "🏳️";
}
