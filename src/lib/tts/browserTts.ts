
import { preprocessTextForTTS } from './textPreprocessing';
import { audioManager } from './audioManager';
import { normalizeLanguageVariant } from './languageMapping';
import { createSpeechUtterance } from './speechConfig';
import { findBestVoice, ensureVoicesLoaded } from './voiceSelection';

// Enhanced fallback with island language support and better mobile compatibility
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
          
          const utterance = createSpeechUtterance(
            preprocessTextForTTS(text, normalizedLanguage), 
            normalizedLanguage
          );
          
          // Find the best voice for the language
          const voices = window.speechSynthesis.getVoices();
          const selectedVoice = findBestVoice(normalizedLanguage, voices);
          
          if (selectedVoice) {
            utterance.voice = selectedVoice;
            console.log(`🎵 Selected island voice for TTS:`, selectedVoice.name, `(${selectedVoice.lang})`);
          }
          
          utterance.onstart = () => {
            console.log(`✅ Browser TTS started for ${normalizedLanguage}`);
          };
          
          utterance.onend = () => {
            console.log(`✅ Browser TTS completed for ${normalizedLanguage}`);
            resolve();
          };
          
          utterance.onerror = (event) => {
            console.error(`❌ Browser TTS error for ${normalizedLanguage}:`, event.error, 'retry count:', retryCount);
            
            // Retry logic for common failures
            if (retryCount < 2 && (event.error === 'synthesis-failed' || event.error === 'network')) {
              console.log(`🔄 Retrying browser TTS for ${normalizedLanguage}...`);
              setTimeout(() => {
                playWithBrowserTTS(text, normalizedLanguage, retryCount + 1)
                  .then(resolve)
                  .catch(reject);
              }, 1000 * (retryCount + 1)); // Exponential backoff
            } else {
              reject(new Error(`Speech synthesis failed for ${normalizedLanguage} after ${retryCount + 1} attempts: ${event.error}`));
            }
          };
          
          // Speak with a small delay to ensure readiness
          setTimeout(() => {
            console.log(`🎵 Starting speech synthesis for ${normalizedLanguage}...`);
            try {
              window.speechSynthesis.speak(utterance);
            } catch (speakError) {
              console.error(`❌ Error calling speak() for ${normalizedLanguage}:`, speakError);
              reject(speakError);
            }
          }, isMobile ? 200 : 100);
          
        } catch (error) {
          console.error(`❌ Error setting up browser TTS for ${normalizedLanguage}:`, error);
          reject(error);
        }
      }).catch(reject);
    }, cancelDelay);
  });
}
