import { islandLanguageCodes, getLanguageFamily } from './languageMapping';

// Phase 4: Enhanced voice assignment based on language families
const voicesByFamily: Record<string, SpeechSynthesisVoice[]> = {};

export function findBestVoice(targetLanguage: string, voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const possibleLangCodes = islandLanguageCodes[targetLanguage] || [targetLanguage];
  const languageFamily = getLanguageFamily(targetLanguage);
  
  console.log(`🎯 Finding voice for ${targetLanguage} (family: ${languageFamily})`);
  
  // Phase 3: Enhanced voice selection with fallback chains
  // 1. First try to find local voices for the exact language
  for (const langCode of possibleLangCodes) {
    const localVoices = voices.filter(voice => {
      const voiceLang = voice.lang.toLowerCase();
      return voice.localService && (voiceLang.startsWith(langCode) || voiceLang.includes(langCode));
    });
    if (localVoices.length > 0) {
      console.log(`🏝️ Found local native voice for ${targetLanguage}:`, localVoices[0].name);
      return selectBestVoiceForFamily(localVoices, languageFamily);
    }
  }
  
  // 2. Try any voice for the exact language (non-local)
  for (const langCode of possibleLangCodes) {
    const anyVoices = voices.filter(voice => {
      const voiceLang = voice.lang.toLowerCase();
      return voiceLang.startsWith(langCode) || voiceLang.includes(langCode);
    });
    if (anyVoices.length > 0) {
      console.log(`🌐 Found native voice fallback for ${targetLanguage}:`, anyVoices[0].name);
      return selectBestVoiceForFamily(anyVoices, languageFamily);
    }
  }
  
  // 3. Try voices from the same language family
  const familyVoices = voices.filter(voice => {
    const voiceFamily = getLanguageFamily(voice.lang);
    return voiceFamily === languageFamily && voiceFamily !== 'other';
  });
  if (familyVoices.length > 0) {
    console.log(`👨‍👩‍👧‍👦 Found family voice for ${targetLanguage} (${languageFamily}):`, familyVoices[0].name);
    return selectBestVoiceForFamily(familyVoices, languageFamily);
  }
  
  // 4. Enhanced family-based fallbacks for new language groups
  if (languageFamily === 'slavic') {
    const slavicVoices = voices.filter(voice => 
      voice.lang.toLowerCase().includes('ru') || 
      voice.lang.toLowerCase().includes('pl') ||
      voice.name.toLowerCase().includes('slavic')
    );
    if (slavicVoices.length > 0) {
      console.log(`🇷🇺 Found Slavic family voice for ${targetLanguage}:`, slavicVoices[0].name);
      return slavicVoices[0];
    }
  }
  
  if (languageFamily === 'finno-ugric') {
    const finnoUgricVoices = voices.filter(voice => 
      voice.lang.toLowerCase().includes('fi') || 
      voice.lang.toLowerCase().includes('et') ||
      voice.name.toLowerCase().includes('nordic')
    );
    if (finnoUgricVoices.length > 0) {
      console.log(`🇫🇮 Found Finno-Ugric family voice for ${targetLanguage}:`, finnoUgricVoices[0].name);
      return finnoUgricVoices[0];
    }
  }
  
  if (languageFamily === 'austronesian' || languageFamily === 'austroasiatic') {
    const southeastAsianVoices = voices.filter(voice => {
      const lang = voice.lang.toLowerCase();
      return lang.includes('en-ph') || lang.includes('en-sg') || lang.includes('ms');
    });
    if (southeastAsianVoices.length > 0) {
      console.log(`🇵🇭 Found Southeast Asian voice for ${targetLanguage}:`, southeastAsianVoices[0].name);
      return southeastAsianVoices[0];
    }
  }
  
  // 5. For Indian languages, try English (India) voices as they often have better accent
  if (languageFamily === 'indic') {
    const indianEnglishVoices = voices.filter(voice => 
      voice.lang.toLowerCase().includes('en-in') || 
      voice.name.toLowerCase().includes('indian') ||
      voice.name.toLowerCase().includes('india')
    );
    if (indianEnglishVoices.length > 0) {
      console.log(`🇮🇳 Found Indian English voice for ${targetLanguage}:`, indianEnglishVoices[0].name);
      return indianEnglishVoices[0];
    }
  }
  
  // 6. For Pacific languages, try regional English variants
  if (languageFamily === 'pacific') {
    const pacificEnglishVoices = voices.filter(voice => {
      const lang = voice.lang.toLowerCase();
      return lang.includes('en-au') || lang.includes('en-nz') || lang.includes('en-ph');
    });
    if (pacificEnglishVoices.length > 0) {
      console.log(`🏝️ Found Pacific English voice for ${targetLanguage}:`, pacificEnglishVoices[0].name);
      return pacificEnglishVoices[0];
    }
  }
  
  console.log(`⚠️ No specific voice found for ${targetLanguage}, using system default`);
  return null;
}

// Phase 4: Enhanced voice selection within language families
function selectBestVoiceForFamily(voices: SpeechSynthesisVoice[], family: string): SpeechSynthesisVoice {
  if (voices.length === 1) return voices[0];
  
  // Prefer local voices
  const localVoices = voices.filter(v => v.localService);
  if (localVoices.length > 0) voices = localVoices;
  
  // Enhanced family-specific preferences
  switch (family) {
    case 'germanic':
      // Prefer deeper, more authoritative voices for Germanic languages
      return voices.find(v => 
        v.name.toLowerCase().includes('male') || 
        v.name.toLowerCase().includes('deep')
      ) || voices[0];
      
    case 'romance':
      // Prefer warmer, more expressive voices for Romance languages
      return voices.find(v => 
        v.name.toLowerCase().includes('warm') || 
        v.name.toLowerCase().includes('expressive')
      ) || voices[0];
      
    case 'indic':
      // Prefer clear, articulate voices for Indian languages
      return voices.find(v => 
        v.name.toLowerCase().includes('clear') || 
        v.name.toLowerCase().includes('natural')
      ) || voices[0];
      
    case 'pacific':
      // Prefer friendly, warm voices for Pacific languages
      return voices.find(v => 
        v.name.toLowerCase().includes('friendly') || 
        v.name.toLowerCase().includes('warm')
      ) || voices[0];
      
    case 'slavic':
      // Clear, strong voices for Slavic languages
      return voices.find(v => 
        v.name.toLowerCase().includes('clear') || 
        v.name.toLowerCase().includes('strong')
      ) || voices[0];
      
    case 'finno-ugric':
      // Precise, articulate voices for Finno-Ugric languages
      return voices.find(v => 
        v.name.toLowerCase().includes('precise') || 
        v.name.toLowerCase().includes('articulate')
      ) || voices[0];
      
    case 'austronesian':
    case 'austroasiatic':
      // Warm, friendly voices for Southeast Asian languages
      return voices.find(v => 
        v.name.toLowerCase().includes('warm') || 
        v.name.toLowerCase().includes('friendly')
      ) || voices[0];
      
    case 'mongolic':
      // Deep, resonant voices for Mongolic languages
      return voices.find(v => 
        v.name.toLowerCase().includes('deep') || 
        v.name.toLowerCase().includes('resonant')
      ) || voices[0];
      
    default:
      return voices[0];
  }
}

export async function ensureVoicesLoaded(): Promise<void> {
  return new Promise<void>((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      console.log('✅ Voices loaded:', voices.length);
      // Phase 5: Cache voices by family for faster selection
      cacheVoicesByFamily(voices);
      resolve();
    } else {
      console.log('⏳ Waiting for voices to load...');
      const handleVoicesChanged = () => {
        window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
        const newVoices = window.speechSynthesis.getVoices();
        console.log('✅ Voices changed event fired, loaded:', newVoices.length);
        cacheVoicesByFamily(newVoices);
        resolve();
      };
      window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
      
      // Fallback timeout
      setTimeout(() => {
        console.log('⚠️ Voice loading timeout, proceeding anyway');
        resolve();
      }, 3000);
    }
  });
}

// Phase 5: Cache voices by language family for performance
function cacheVoicesByFamily(voices: SpeechSynthesisVoice[]) {
  // Clear existing cache
  Object.keys(voicesByFamily).forEach(key => delete voicesByFamily[key]);
  
  // Group voices by language family
  voices.forEach(voice => {
    const family = getLanguageFamily(voice.lang);
    if (!voicesByFamily[family]) {
      voicesByFamily[family] = [];
    }
    voicesByFamily[family].push(voice);
  });
  
  console.log('📦 Cached voices by family:', Object.keys(voicesByFamily));
}
