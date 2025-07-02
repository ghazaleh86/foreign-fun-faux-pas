// Check if we're on a mobile device
export function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Global audio context for mobile
let globalAudioContext: AudioContext | null = null;

// Initialize audio context for mobile
export async function initializeAudioContext(): Promise<AudioContext | null> {
  if (globalAudioContext) return globalAudioContext;
  
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return null;
    
    globalAudioContext = new AudioContextClass();
    
    if (globalAudioContext.state === 'suspended') {
      await globalAudioContext.resume();
      console.log('✅ Audio context resumed');
    }
    
    return globalAudioContext;
  } catch (error) {
    console.log('❌ Could not initialize audio context:', error);
    return null;
  }
}