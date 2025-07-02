import { preprocessTextForTTS } from './textPreprocessing';

// Enhanced fallback with better mobile support and retry logic
export function playWithBrowserTTS(text: string, language: string = "en", retryCount: number = 0) {
  return new Promise<void>((resolve, reject) => {
    if (!("speechSynthesis" in window)) {
      console.error('❌ Speech synthesis not supported');
      reject(new Error('Speech synthesis not supported'));
      return;
    }

    // Normalize language variants to base languages
    const normalizeLanguageVariant = (lang: string): string => {
      const normalized = lang.toLowerCase();
      const variantMappings: Record<string, string> = {
        "colombian spanish": "spanish",
        "mexican spanish": "spanish", 
        "costa rican spanish": "spanish",
        "english (south africa)": "english",
      };
      return variantMappings[normalized] || normalized;
    };

    const normalizedLanguage = normalizeLanguageVariant(language.toLowerCase());
    console.log(`🎵 Browser TTS attempt ${retryCount + 1}:`, { 
      originalLanguage: language,
      normalizedLanguage, 
      text: text.slice(0, 30) 
    });

    // Cancel any ongoing speech to prevent conflicts
    window.speechSynthesis.cancel();
    
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
        
        // Enhanced voice selection for mobile with better language mapping
        const voices = window.speechSynthesis.getVoices();
        let targetLang = normalizedLanguage;
        
        // Enhanced mobile-friendly settings with language-specific adjustments
        utterance.lang = normalizedLanguage;
        utterance.rate = targetLang === 'norwegian' ? 0.65 : 0.75; // Extra slow for Norwegian clarity
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        // Comprehensive language code mapping for browser TTS
        const langMappings: Record<string, string[]> = {
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
          // Additional missing languages
          'korean': ['ko-KR', 'ko'],
          'polish': ['pl-PL', 'pl'],
          'russian': ['ru-RU', 'ru'],
          'turkish': ['tr-TR', 'tr'],
          'vietnamese': ['vi-VN', 'vi'],
          'thai': ['th-TH', 'th'],
          'czech': ['cs-CZ', 'cs'],
          'afrikaans': ['af-ZA', 'af'],
          // Language variants mapped to base languages
          'colombian spanish': ['es-CO', 'es-ES', 'es'],
          'mexican spanish': ['es-MX', 'es-ES', 'es'],
          'costa rican spanish': ['es-CR', 'es-ES', 'es'],
          'english (south africa)': ['en-ZA', 'en-GB', 'en-US', 'en']
        };
        
        const possibleLangCodes = langMappings[targetLang] || [targetLang];
        
        // Find the best voice for the language
        let selectedVoice = null;
        
        // First try to find local voices for the language
        for (const langCode of possibleLangCodes) {
          const localVoices = voices.filter(voice => {
            const voiceLang = voice.lang.toLowerCase();
            return voice.localService && (voiceLang.startsWith(langCode) || voiceLang.includes(langCode));
          });
          if (localVoices.length > 0) {
            selectedVoice = localVoices[0];
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
              break;
            }
          }
        }
        
        if (selectedVoice) {
          utterance.voice = selectedVoice;
          console.log('🎵 Selected voice for TTS:', selectedVoice.name);
        }
        
        utterance.onstart = () => {
          console.log('✅ Browser TTS started');
        };
        
        utterance.onend = () => {
          console.log('✅ Browser TTS completed');
          resolve();
        };
        
        utterance.onerror = (event) => {
          console.error('❌ Browser TTS error:', event.error, 'retry count:', retryCount);
          
          // Retry logic for common failures
          if (retryCount < 2 && (event.error === 'synthesis-failed' || event.error === 'network')) {
            console.log('🔄 Retrying browser TTS...');
            setTimeout(() => {
              playWithBrowserTTS(text, normalizedLanguage, retryCount + 1)
                .then(resolve)
                .catch(reject);
            }, 1000 * (retryCount + 1)); // Exponential backoff
          } else {
            reject(new Error(`Speech synthesis failed after ${retryCount + 1} attempts: ${event.error}`));
          }
        };
        
        // Speak with a small delay to ensure readiness
        setTimeout(() => {
          console.log('🎵 Starting speech synthesis...');
          try {
            window.speechSynthesis.speak(utterance);
          } catch (speakError) {
            console.error('❌ Error calling speak():', speakError);
            reject(speakError);
          }
        }, isMobile ? 200 : 100);
        
      } catch (error) {
        console.error('❌ Error setting up browser TTS:', error);
        reject(error);
      }
    }).catch(reject);
    }, cancelDelay);
  });
}