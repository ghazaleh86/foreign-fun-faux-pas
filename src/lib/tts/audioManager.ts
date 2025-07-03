// Global audio manager to prevent overlapping audio playback
class AudioManager {
  private static instance: AudioManager | null = null;
  private activeAudio: Set<HTMLAudioElement> = new Set();
  private isElevenLabsPlaying = false;

  private constructor() {}

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  // Stop all active audio immediately
  stopAllAudio(): void {
    console.log('🛑 AudioManager: Stopping all audio');
    
    // Stop browser TTS
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    
    // Stop all HTML audio elements
    this.activeAudio.forEach(audio => {
      try {
        audio.pause();
        audio.currentTime = 0;
        audio.src = '';
        URL.revokeObjectURL(audio.src);
      } catch (error) {
        console.log('Error stopping audio:', error);
      }
    });
    
    this.activeAudio.clear();
    this.isElevenLabsPlaying = false;
  }

  // Register a new audio element
  registerAudio(audio: HTMLAudioElement): void {
    this.stopAllAudio(); // Stop any existing audio first
    this.activeAudio.add(audio);
    this.isElevenLabsPlaying = true;
    
    // Auto-cleanup when audio ends
    const cleanup = () => {
      this.activeAudio.delete(audio);
      this.isElevenLabsPlaying = false;
      audio.removeEventListener('ended', cleanup);
      audio.removeEventListener('error', cleanup);
    };
    
    audio.addEventListener('ended', cleanup);
    audio.addEventListener('error', cleanup);
  }

  // Check if any audio is currently playing
  isPlaying(): boolean {
    return this.activeAudio.size > 0 || this.isElevenLabsPlaying;
  }

  // Prepare for new audio playback
  prepareForNewAudio(): void {
    this.stopAllAudio();
  }
}

export const audioManager = AudioManager.getInstance();