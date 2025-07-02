import { preprocessTextForTTS } from './textPreprocessing';

// Enhanced fallback with better mobile support
export function playWithBrowserTTS(text: string, language: string = "en") {
  return new Promise<void>((resolve, reject) => {
    if (!("speechSynthesis" in window)) {
      reject(new Error('Speech synthesis not supported'));
      return;
    }

    // Ensure speech synthesis is ready
    const ensureVoicesLoaded = () => {
      return new Promise<void>((resolve) => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          resolve();
        } else {
          const handleVoicesChanged = () => {
            window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
            resolve();
          };
          window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
          
          // Fallback timeout
          setTimeout(resolve, 2000);
        }
      });
    };

    ensureVoicesLoaded().then(() => {
      try {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new window.SpeechSynthesisUtterance(preprocessTextForTTS(text, language));
        
        // Enhanced voice selection for mobile with better language mapping
        const voices = window.speechSynthesis.getVoices();
        let targetLang = language.toLowerCase();
        
        // Enhanced mobile-friendly settings with language-specific adjustments
        utterance.lang = language;
        utterance.rate = targetLang === 'norwegian' ? 0.65 : 0.75; // Extra slow for Norwegian clarity
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        // Better language code mapping for browser TTS
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
          'english': ['en-US', 'en-GB', 'en']
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
          console.error('❌ Browser TTS error:', event.error);
          reject(new Error(`Speech synthesis failed: ${event.error}`));
        };
        
        // Speak with a small delay to ensure readiness
        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, 100);
        
      } catch (error) {
        console.error('❌ Error setting up browser TTS:', error);
        reject(error);
      }
    }).catch(reject);
  });
}