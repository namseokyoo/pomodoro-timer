// Audio notification utilities

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return audioContext;
}

export function playNotificationSound(): void {
  if (typeof window === 'undefined') return;

  try {
    const ctx = getAudioContext();

    // Resume audio context if suspended (due to browser autoplay policy)
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Create a pleasant notification sound
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Pleasant bell-like sound
    oscillator.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
    oscillator.type = 'sine';

    // Envelope
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.5);

    // Play second tone for a more complete sound
    setTimeout(() => {
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc2.frequency.setValueAtTime(1174.66, ctx.currentTime); // D6 note
      osc2.type = 'sine';

      gain2.gain.setValueAtTime(0, ctx.currentTime);
      gain2.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.01);
      gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);

      osc2.start(ctx.currentTime);
      osc2.stop(ctx.currentTime + 0.6);
    }, 150);

    // Play third tone
    setTimeout(() => {
      const osc3 = ctx.createOscillator();
      const gain3 = ctx.createGain();

      osc3.connect(gain3);
      gain3.connect(ctx.destination);

      osc3.frequency.setValueAtTime(1318.51, ctx.currentTime); // E6 note
      osc3.type = 'sine';

      gain3.gain.setValueAtTime(0, ctx.currentTime);
      gain3.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01);
      gain3.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);

      osc3.start(ctx.currentTime);
      osc3.stop(ctx.currentTime + 0.8);
    }, 300);

  } catch (error) {
    console.error('Failed to play notification sound:', error);
  }
}

// Initialize audio context on first user interaction
export function initAudio(): void {
  if (typeof window === 'undefined') return;

  const initHandler = () => {
    getAudioContext();
    document.removeEventListener('click', initHandler);
    document.removeEventListener('keydown', initHandler);
    document.removeEventListener('touchstart', initHandler);
  };

  document.addEventListener('click', initHandler);
  document.addEventListener('keydown', initHandler);
  document.addEventListener('touchstart', initHandler);
}
