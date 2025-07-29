
// Main TTS exports
export { playWithElevenLabsTTS } from './elevenlabsTts';
export { playWithBrowserTTS } from './browserTts';
export { preprocessTextForTTS } from './textPreprocessing';
export { isMobileDevice, initializeAudioContext } from './audioUtils';
export { audioManager } from './audioManager';
export { normalizeLanguageVariant, islandLanguageCodes } from './languageMapping';
export { createSpeechUtterance, islandLanguageRates } from './speechConfig';
export { findBestVoice, ensureVoicesLoaded } from './voiceSelection';
export { getOptimalVoice, normalizeLanguageForVoice, getVoiceQualityScore } from './voiceOptimization';
