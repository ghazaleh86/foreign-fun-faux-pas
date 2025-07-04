
import { islandLanguageCodes } from './languageMapping';

export function findBestVoice(targetLanguage: string, voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const possibleLangCodes = islandLanguageCodes[targetLanguage] || [targetLanguage];
  
  // First try to find local voices for the language
  for (const langCode of possibleLangCodes) {
    const localVoices = voices.filter(voice => {
      const voiceLang = voice.lang.toLowerCase();
      return voice.localService && (voiceLang.startsWith(langCode) || voiceLang.includes(langCode));
    });
    if (localVoices.length > 0) {
      console.log(`🏝️ Found local island voice for ${targetLanguage}:`, localVoices[0].name);
      return localVoices[0];
    }
  }
  
  // If no local voice found, try any voice for the language
  for (const langCode of possibleLangCodes) {
    const anyVoice = voices.find(voice => {
      const voiceLang = voice.lang.toLowerCase();
      return voiceLang.startsWith(langCode) || voiceLang.includes(langCode);
    });
    if (anyVoice) {
      console.log(`🌐 Found island voice fallback for ${targetLanguage}:`, anyVoice.name);
      return anyVoice;
    }
  }
  
  console.log(`⚠️ No specific voice found for ${targetLanguage}, using default`);
  return null;
}

export function ensureVoicesLoaded(): Promise<void> {
  return new Promise<void>((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      console.log('✅ Voices loaded:', voices.length);
      resolve();
    } else {
      console.log('⏳ Waiting for voices to load...');
      const handleVoicesChanged = () => {
        window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
        console.log('✅ Voices changed event fired');
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
