
// Speech configuration and rate settings for different languages
export const islandLanguageRates: Record<string, number> = {
  'norwegian': 0.65, // Extra slow for Norwegian clarity
  'tagalog': 0.7, // Moderate pace for Filipino
  'samoan': 0.6, // Slow for Polynesian rhythm
  'fijian': 0.65, // Relaxed Fijian pace
  'tongan': 0.6, // Respectful Tongan pace
  'māori': 0.65, // Respectful Māori pace
  'maori': 0.65, // Respectful Māori pace
  'icelandic': 0.7, // Precise Icelandic
  'faroese': 0.7, // Clear Faroese
  'maltese': 0.75, // Mediterranean pace
  'jamaican patois': 0.8, // Rhythmic Patois
  'haitian creole': 0.7, // French-influenced rhythm
  'papiamento': 0.75, // Multi-lingual pace
  'sinhala': 0.7, // Sri Lankan pace
  'dhivehi': 0.7, // Maldivian pace
  'tok pisin': 0.75, // Pidgin clarity
};

export function createSpeechUtterance(text: string, language: string): SpeechSynthesisUtterance {
  const utterance = new window.SpeechSynthesisUtterance(text);
  
  utterance.lang = language;
  utterance.rate = islandLanguageRates[language] || 0.75;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;
  
  return utterance;
}
