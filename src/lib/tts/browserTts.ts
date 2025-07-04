import { preprocessTextForTTS } from './textPreprocessing';
import { audioManager } from './audioManager';

// Enhanced fallback with island language support and better mobile compatibility
export function playWithBrowserTTS(text: string, language: string = "en", retryCount: number = 0) {
  return new Promise<void>((resolve, reject) => {
    if (!("speechSynthesis" in window)) {
      console.error('❌ Speech synthesis not supported');
      reject(new Error('Speech synthesis not supported'));
      return;
    }

    // Enhanced normalize language variants for island countries
    const normalizeLanguageVariant = (lang: string): string => {
      const normalized = lang.toLowerCase();
      const variantMappings: Record<string, string> = {
        "colombian spanish": "spanish",
        "mexican spanish": "spanish", 
        "costa rican spanish": "spanish",
        "english (south africa)": "english",
        "spanish (cuba)": "spanish",
        "spanish (dominican republic)": "spanish",
        "filipino": "tagalog",
      };
      return variantMappings[normalized] || normalized;
    };

    const normalizedLanguage = normalizeLanguageVariant(language.toLowerCase());
    console.log(`🎵 Browser TTS attempt ${retryCount + 1}:`, { 
      originalLanguage: language,
      normalizedLanguage, 
      text: text.slice(0, 30) 
    });

    // Stop all audio including ElevenLabs before starting browser TTS
    audioManager.stopAllAudio();
    
    // Wait a bit after cancellation on mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const cancelDelay = isMobile ? 500 : 100;
    
    setTimeout(() => {
      // Ensure speech synthesis is ready
      const ensureVoicesLoaded = () => {
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
      };

    ensureVoicesLoaded().then(() => {
      try {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new window.SpeechSynthesisUtterance(preprocessTextForTTS(text, normalizedLanguage));
        
        // Enhanced voice selection for island languages
        const voices = window.speechSynthesis.getVoices();
        let targetLang = normalizedLanguage;
        
        // Island-specific rate adjustments for cultural accuracy
        const islandLanguageRates: Record<string, number> = {
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
        
        utterance.lang = normalizedLanguage;
        utterance.rate = islandLanguageRates[targetLang] || 0.75;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        // Comprehensive language code mapping for island languages
        const islandLanguageCodes: Record<string, string[]> = {
          // PACIFIC ISLANDS
          'tagalog': ['tl-PH', 'fil-PH', 'tl', 'en-PH'],
          'samoan': ['sm-WS', 'sm', 'en-WS', 'en-US'],
          'fijian': ['fj-FJ', 'fj', 'en-FJ', 'en-US'],
          'tongan': ['to-TO', 'to', 'en-TO', 'en-US'],
          'chamorro': ['ch-GU', 'ch', 'en-GU', 'en-US'],
          'māori': ['mi-NZ', 'mi', 'en-NZ', 'en-US'],
          'maori': ['mi-NZ', 'mi', 'en-NZ', 'en-US'],
          
          // NORDIC/EUROPEAN ISLANDS
          'icelandic': ['is-IS', 'is'],
          'faroese': ['fo-FO', 'fo', 'da-DK', 'no-NO'],
          'maltese': ['mt-MT', 'mt', 'en-MT', 'it-IT'],
          'corsican': ['co-FR', 'co', 'fr-FR', 'it-IT'],
          'sicilian': ['scn-IT', 'it-IT', 'it'],
          
          // CARIBBEAN
          'jamaican patois': ['en-JM', 'en-GB', 'en-US'],
          'haitian creole': ['ht-HT', 'ht', 'fr-HT', 'fr-FR'],
          'papiamento': ['pap-AW', 'pap', 'es-ES', 'nl-NL'],
          'spanish (cuba)': ['es-CU', 'es-ES', 'es'],
          'spanish (dominican republic)': ['es-DO', 'es-ES', 'es'],
          
          // INDIAN OCEAN & OCEANIC
          'sinhala': ['si-LK', 'si', 'en-LK'],
          'dhivehi': ['dv-MV', 'dv', 'en-MV', 'ar-SA'],
          'mauritian creole': ['mfe-MU', 'fr-MU', 'fr-FR', 'en-MU'],
          'seychellois creole': ['crs-SC', 'fr-SC', 'fr-FR', 'en-SC'],
          'tok pisin': ['tpi-PG', 'en-PG', 'en-US'],
          
          // Standard language mappings
          'norwegian': ['nb-NO', 'nb', 'no-NO', 'no', 'nn-NO', 'nn'],
          'swedish': ['sv-SE', 'sv'],
          'arabic': ['ar-SA', 'ar'],
          'chinese': ['zh-CN', 'zh', 'zh-cn', 'zh-tw'],
          'german': ['de-DE', 'de'],
          'spanish': ['es-ES', 'es'],
          'french': ['fr-FR', 'fr'],
          'italian': ['it-IT', 'it'],
          'portuguese': ['pt-PT', 'pt-BR', 'pt'],
          'dutch': ['nl-NL', 'nl'],
          'japanese': ['ja-JP', 'ja'],
          'english': ['en-US', 'en-GB', 'en'],
          'korean': ['ko-KR', 'ko'],
          'polish': ['pl-PL', 'pl'],
          'russian': ['ru-RU', 'ru'],
          'turkish': ['tr-TR', 'tr'],
          'vietnamese': ['vi-VN', 'vi'],
          'thai': ['th-TH', 'th'],
          'czech': ['cs-CZ', 'cs'],
          'afrikaans': ['af-ZA', 'af'],
          'farsi': ['fa-IR', 'fa'],
          'persian': ['fa-IR', 'fa'],
          'mali': ['bm-ML', 'bm', 'en-US', 'en'],
          'bambara': ['bm-ML', 'bm', 'en-US', 'en'],
          'irish': ['ga-IE', 'ga', 'en-IE', 'en-US', 'en'],
          'gaeilge': ['ga-IE', 'ga', 'en-IE', 'en-US', 'en'],
          'scottish': ['gd-GB', 'gd', 'en-GB', 'en-US', 'en'],
          'scottish gaelic': ['gd-GB', 'gd', 'en-GB', 'en-US', 'en'],
          'hebrew': ['he-IL', 'he'],
          'colombian spanish': ['es-CO', 'es-ES', 'es'],
          'mexican spanish': ['es-MX', 'es-ES', 'es'],
          'costa rican spanish': ['es-CR', 'es-ES', 'es'],
          'english (south africa)': ['en-ZA', 'en-GB', 'en-US', 'en']
        };
        
        const possibleLangCodes = islandLanguageCodes[targetLang] || [targetLang];
        
        // Find the best voice for the island language
        let selectedVoice = null;
        
        // First try to find local voices for the language
        for (const langCode of possibleLangCodes) {
          const localVoices = voices.filter(voice => {
            const voiceLang = voice.lang.toLowerCase();
            return voice.localService && (voiceLang.startsWith(langCode) || voiceLang.includes(langCode));
          });
          if (localVoices.length > 0) {
            selectedVoice = localVoices[0];
            console.log(`🏝️ Found local island voice for ${targetLang}:`, selectedVoice.name);
            break;
          }
        }
        
        // If no local voice found, try any voice for the language
        if (!selectedVoice) {
          for (const langCode of possibleLangCodes) {
            const anyVoice = voices.find(voice => {
              const voiceLang = voice.lang.toLowerCase();
              return voiceLang.startsWith(langCode) || voiceLang.includes(langCode);
            });
            if (anyVoice) {
              selectedVoice = anyVoice;
              console.log(`🌐 Found island voice fallback for ${targetLang}:`, selectedVoice.name);
              break;
            }
          }
        }
        
        if (selectedVoice) {
          utterance.voice = selectedVoice;
          console.log(`🎵 Selected island voice for TTS:`, selectedVoice.name, `(${selectedVoice.lang})`);
        } else {
          console.log(`⚠️ No specific voice found for ${targetLang}, using default`);
        }
        
        utterance.onstart = () => {
          console.log(`✅ Browser TTS started for ${targetLang}`);
        };
        
        utterance.onend = () => {
          console.log(`✅ Browser TTS completed for ${targetLang}`);
          resolve();
        };
        
        utterance.onerror = (event) => {
          console.error(`❌ Browser TTS error for ${targetLang}:`, event.error, 'retry count:', retryCount);
          
          // Retry logic for common failures
          if (retryCount < 2 && (event.error === 'synthesis-failed' || event.error === 'network')) {
            console.log(`🔄 Retrying browser TTS for ${targetLang}...`);
            setTimeout(() => {
              playWithBrowserTTS(text, normalizedLanguage, retryCount + 1)
                .then(resolve)
                .catch(reject);
            }, 1000 * (retryCount + 1)); // Exponential backoff
          } else {
            reject(new Error(`Speech synthesis failed for ${targetLang} after ${retryCount + 1} attempts: ${event.error}`));
          }
        };
        
        // Speak with a small delay to ensure readiness
        setTimeout(() => {
          console.log(`🎵 Starting speech synthesis for ${targetLang}...`);
          try {
            window.speechSynthesis.speak(utterance);
          } catch (speakError) {
            console.error(`❌ Error calling speak() for ${targetLang}:`, speakError);
            reject(speakError);
          }
        }, isMobile ? 200 : 100);
        
      } catch (error) {
        console.error(`❌ Error setting up browser TTS for ${targetLang}:`, error);
        reject(error);
      }
    }).catch(reject);
    }, cancelDelay);
  });
}
