
import { preprocessTextForTTS } from './textPreprocessing';
import { audioManager } from './audioManager';
import { normalizeLanguageVariant } from './languageMapping';
import { createSpeechUtterance } from './speechConfig';
import { findBestVoice, ensureVoicesLoaded } from './voiceSelection';

// Phase 3: Enhanced fallback with comprehensive language support and better mobile compatibility
export function playWithBrowserTTS(text: string, language: string = "en", retryCount: number = 0) {
  return new Promise<void>((resolve, reject) => {
    if (!("speechSynthesis" in window)) {
      console.error('❌ Speech synthesis not supported');
      reject(new Error('Speech synthesis not supported'));
      return;
    }

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
      ensureVoicesLoaded().then(() => {
        try {
          // Cancel any ongoing speech
          window.speechSynthesis.cancel();
          
          // Phase 4: Use enhanced speech configuration
          const utterance = createSpeechUtterance(
            preprocessTextForTTS(text, normalizedLanguage), 
            normalizedLanguage
          );
          
          // Phase 3: Enhanced voice selection with comprehensive fallback
          const voices = window.speechSynthesis.getVoices();
          const selectedVoice = findBestVoice(normalizedLanguage, voices);
          
          if (selectedVoice) {
            utterance.voice = selectedVoice;
            console.log(`🎵 Selected optimized voice for TTS:`, {
              voice: selectedVoice.name,
              lang: selectedVoice.lang,
              local: selectedVoice.localService,
              language: normalizedLanguage
            });
          } else {
            console.log(`⚠️ No optimal voice found for ${normalizedLanguage}, using system default`);
          }
          
          utterance.onstart = () => {
            console.log(`✅ Browser TTS started for ${normalizedLanguage} with enhanced pronunciation`);
          };
          
          utterance.onend = () => {
            console.log(`✅ Browser TTS completed for ${normalizedLanguage}`);
            resolve();
          };
          
          utterance.onerror = (event) => {
            console.error(`❌ Browser TTS error for ${normalizedLanguage}:`, event.error, 'retry count:', retryCount);
            
            // Phase 5: Enhanced retry logic with exponential backoff
            if (retryCount < 3 && (event.error === 'synthesis-failed' || event.error === 'network' || event.error === 'synthesis-unavailable')) {
              console.log(`🔄 Retrying browser TTS for ${normalizedLanguage} (attempt ${retryCount + 2}/4)...`);
              setTimeout(() => {
                playWithBrowserTTS(text, normalizedLanguage, retryCount + 1)
                  .then(resolve)
                  .catch(reject);
              }, Math.min(1000 * Math.pow(2, retryCount), 5000)); // Exponential backoff, max 5s
            } else {
              reject(new Error(`Speech synthesis failed for ${normalizedLanguage} after ${retryCount + 1} attempts: ${event.error}`));
            }
          };
          
          // Enhanced mobile handling
          const speakDelay = isMobile ? 300 : 150;
          setTimeout(() => {
            console.log(`🎵 Starting enhanced speech synthesis for ${normalizedLanguage}...`);
            try {
              window.speechSynthesis.speak(utterance);
            } catch (speakError) {
              console.error(`❌ Error calling speak() for ${normalizedLanguage}:`, speakError);
              reject(speakError);
            }
          }, speakDelay);
          
        } catch (error) {
          console.error(`❌ Error setting up browser TTS for ${normalizedLanguage}:`, error);
          reject(error);
        }
      }).catch(reject);
    }, cancelDelay);
  });
}
