// Enhanced text preprocessing for more natural speech across languages
export function preprocessTextForTTS(text: string, language: string = "english"): string {
  let processed = text
    // Add natural pauses
    .replace(/([.!?])\s*/g, '$1 ')
    // Add slight pause after commas
    .replace(/,\s*/g, ', ')
    // Handle contractions more naturally
    .replace(/n't/g, " n't")
    .replace(/'ll/g, " 'll")
    .replace(/'re/g, " 're")
    .replace(/'ve/g, " 've")
    // Trim extra spaces
    .replace(/\s+/g, ' ')
    .trim();

  // Language-specific preprocessing
  const normalizedLanguage = language.toLowerCase();
  
  switch (normalizedLanguage) {
    case 'german':
      // Handle German umlauts and special characters for better pronunciation
      processed = processed
        .replace(/ß/g, 'ss')
        .replace(/ü/g, 'ue')
        .replace(/ö/g, 'oe')
        .replace(/ä/g, 'ae');
      break;
    case 'spanish':
      // Add slight emphasis for Spanish pronunciation
      processed = processed.replace(/ñ/g, 'ny');
      break;
    case 'french':
      // Handle French accents for better pronunciation
      processed = processed
        .replace(/é/g, 'e')
        .replace(/è/g, 'e')
        .replace(/ê/g, 'e')
        .replace(/ç/g, 'c');
      break;
    case 'norwegian':
    case 'swedish':
      // Handle Nordic characters
      processed = processed
        .replace(/å/g, 'aa')
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ø/g, 'oe');
      break;
  }
  
  return processed;
}