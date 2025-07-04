
// Enhanced text preprocessing for island languages with cultural accuracy
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

  // Enhanced language-specific preprocessing for island countries
  const normalizedLanguage = language.toLowerCase();
  
  switch (normalizedLanguage) {
    // EUROPEAN LANGUAGES
    case 'german':
      processed = processed
        .replace(/ß/g, 'ss')
        .replace(/ü/g, 'ue')
        .replace(/ö/g, 'oe')
        .replace(/ä/g, 'ae');
      break;
    case 'spanish':
      processed = processed.replace(/ñ/g, 'ny');
      break;
    case 'french':
      processed = processed
        .replace(/é/g, 'e')
        .replace(/è/g, 'e')
        .replace(/ê/g, 'e')
        .replace(/ç/g, 'c');
      break;
    case 'norwegian':
      processed = processed
        .replace(/å/g, 'oa')
        .replace(/ø/g, 'uh')
        .replace(/æ/g, 'ae')
        .replace(/\s+og\s+/g, ' og ')
        .replace(/\s+men\s+/g, ', men ')
        .replace(/\s+eller\s+/g, ' eller ');
      break;
    case 'swedish':
      processed = processed
        .replace(/å/g, 'aa')
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe');
      break;
      
    // PACIFIC ISLAND LANGUAGES
    case 'tagalog':
    case 'filipino':
      processed = processed
        // Handle ng combinations for Filipino pronunciation
        .replace(/ng/g, 'ng ')
        // Soft pronunciation guides
        .replace(/ñ/g, 'ny')
        // Emphasis patterns for double vowels
        .replace(/([aeiou])\1/g, '$1-$1')
        // Handle glottal stops
        .replace(/'/g, ' ')
        // Soften harsh consonants
        .replace(/k/g, 'k ');
      break;
      
    case 'samoan':
      processed = processed
        // Polynesian glottal stops
        .replace(/'/g, ' ')
        // Vowel clusters with natural breaks
        .replace(/([aeiou])([aeiou])/g, '$1-$2')
        // Soft consonants
        .replace(/ng/g, 'ng ')
        // Polynesian rhythm
        .replace(/\s+ma\s+/g, ' ma ')
        .replace(/fa'a/g, 'fah-ah');
      break;
      
    case 'fijian':
      processed = processed
        // Fijian specific sounds
        .replace(/c/g, 'th') // Fijian 'c' is pronounced 'th'
        .replace(/q/g, 'ng') // Fijian 'q' is pronounced 'ng'
        // Vowel clusters
        .replace(/([aeiou])([aeiou])/g, '$1-$2')
        // Soft pronunciation
        .replace(/b/g, 'mb')
        .replace(/d/g, 'nd');
      break;
      
    case 'tongan':
      processed = processed
        // Tongan glottal stops
        .replace(/'/g, ' ')
        // Vowel emphasis
        .replace(/([aeiou])\1/g, '$1-$1')
        // Soft consonants
        .replace(/ng/g, 'ng ')
        // Tongan rhythm patterns
        .replace(/\s+mo\s+/g, ' mo ');
      break;
      
    case 'chamorro':
      processed = processed
        // Chamorro specific sounds
        .replace(/ñ/g, 'ny')
        .replace(/ch/g, 'ts')
        // Vowel patterns
        .replace(/([aeiou])([aeiou])/g, '$1-$2')
        // Spanish influence softening
        .replace(/ll/g, 'y');
      break;
      
    case 'māori':
    case 'maori':
      processed = processed
        // Māori pronunciation rules
        .replace(/wh/g, 'f') // 'wh' sounds like 'f' in Māori
        .replace(/r/g, 'r ') // Rolled 'r'
        .replace(/ng/g, 'ng ') // Soft 'ng'
        // Vowel emphasis
        .replace(/([aeiou])\1/g, '$1-$1')
        // Respectful pronunciation pace
        .replace(/\s+/g, ' ');
      break;
      
    // NORDIC/EUROPEAN ISLAND LANGUAGES
    case 'icelandic':
      processed = processed
        // Icelandic special characters
        .replace(/þ/g, 'th')
        .replace(/ð/g, 'th')
        .replace(/æ/g, 'ai')
        .replace(/ø/g, 'ur')
        .replace(/á/g, 'ow')
        .replace(/é/g, 'yeh')
        .replace(/í/g, 'ee')
        .replace(/ó/g, 'oh')
        .replace(/ú/g, 'oo')
        .replace(/ý/g, 'ee')
        // Nordic rhythm
        .replace(/\s+og\s+/g, ' og ');
      break;
      
    case 'faroese':
      processed = processed
        // Similar to Icelandic but softer
        .replace(/ø/g, 'uh')
        .replace(/á/g, 'oa')
        .replace(/ý/g, 'ee')
        .replace(/æ/g, 'ai')
        // Faroese softness
        .replace(/ð/g, 'th')
        .replace(/g/g, 'gh');
      break;
      
    case 'maltese':
      processed = processed
        // Maltese specific characters
        .replace(/ċ/g, 'ch')
        .replace(/ġ/g, 'j')
        .replace(/ħ/g, 'h')
        .replace(/ż/g, 'z')
        // Arabic influence
        .replace(/għ/g, 'ah')
        .replace(/ie/g, 'ee-eh');
      break;
      
    case 'corsican':
      processed = processed
        // Italian-influenced pronunciation
        .replace(/cch/g, 'k')
        .replace(/ggh/g, 'g')
        .replace(/u/g, 'oo')
        // Corsican rhythm
        .replace(/è/g, 'eh')
        .replace(/ò/g, 'oh');
      break;
      
    case 'sicilian':
      processed = processed
        // Sicilian pronunciation
        .replace(/dd/g, 'd')
        .replace(/gg/g, 'g')
        .replace(/cch/g, 'k')
        // Vowel emphasis
        .replace(/a/g, 'ah')
        .replace(/i/g, 'ee')
        .replace(/u/g, 'oo');
      break;
      
    // CARIBBEAN LANGUAGES
    case 'jamaican patois':
      processed = processed
        // Patois pronunciation patterns
        .replace(/th/g, 'd')
        .replace(/ing/g, 'in')
        .replace(/er/g, 'a')
        .replace(/ou/g, 'oo')
        // Jamaican rhythm
        .replace(/\s+and\s+/g, ' an ')
        .replace(/\s+the\s+/g, ' di ')
        // Patois softening
        .replace(/tion/g, 'shun');
      break;
      
    case 'haitian creole':
      processed = processed
        // French-influenced pronunciation
        .replace(/è/g, 'e')
        .replace(/ò/g, 'o')
        .replace(/an/g, 'ahn')
        .replace(/en/g, 'ehn')
        // Creole rhythm
        .replace(/\s+ak\s+/g, ' ak ')
        .replace(/ou/g, 'oo');
      break;
      
    case 'papiamento':
      processed = processed
        // Spanish-Dutch-Portuguese fusion
        .replace(/ñ/g, 'ny')
        .replace(/ch/g, 'sh')
        .replace(/j/g, 'h')
        // Papiamento rhythm
        .replace(/\s+i\s+/g, ' ee ')
        .replace(/\s+un\s+/g, ' oon ');
      break;
      
    case 'spanish (cuba)':
      processed = processed
        // Cuban Spanish characteristics
        .replace(/s$/g, '') // Drop final 's'
        .replace(/r$/g, '') // Soften final 'r'
        .replace(/ñ/g, 'ny')
        // Cuban rhythm
        .replace(/\s+y\s+/g, ' ee ');
      break;
      
    case 'spanish (dominican republic)':
      processed = processed
        // Dominican Spanish characteristics
        .replace(/r/g, 'l') // 'r' to 'l' substitution
        .replace(/s$/g, '') // Drop final 's'
        .replace(/ñ/g, 'ny')
        // Dominican expressiveness
        .replace(/\s+que\s+/g, ' keh ');
      break;
      
    // INDIAN OCEAN & OCEANIC LANGUAGES
    case 'sinhala':
      processed = processed
        // Sinhala pronunciation
        .replace(/ā/g, 'aa')
        .replace(/ī/g, 'ee')
        .replace(/ū/g, 'oo')
        .replace(/ē/g, 'ay')
        .replace(/ō/g, 'oh')
        // Soft consonants
        .replace(/th/g, 'th ')
        .replace(/dh/g, 'dh ');
      break;
      
    case 'dhivehi':
      processed = processed
        // Maldivian pronunciation
        .replace(/ā/g, 'aa')
        .replace(/ī/g, 'ee')
        .replace(/ū/g, 'oo')
        // Arabic influence
        .replace(/kh/g, 'h')
        .replace(/gh/g, 'g');
      break;
      
    case 'mauritian creole':
    case 'seychellois creole':
      processed = processed
        // French-based creole pronunciation
        .replace(/è/g, 'e')
        .replace(/ò/g, 'o')
        .replace(/ã/g, 'ahn')
        .replace(/õ/g, 'ohn')
        // Creole rhythm
        .replace(/\s+ek\s+/g, ' ek ')
        .replace(/ou/g, 'oo');
      break;
      
    case 'tok pisin':
      processed = processed
        // English-based pidgin
        .replace(/ng/g, 'ng ')
        .replace(/\s+bilong\s+/g, ' bee-long ')
        .replace(/\s+long\s+/g, ' long ')
        // Pidgin simplification
        .replace(/tion/g, 'shun')
        .replace(/th/g, 't');
      break;
  }
  
  return processed;
}
