// Utility functions

/**
 * Format seconds to MM:SS display
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format time for browser tab title
 */
export function formatTabTitle(seconds: number, mode: 'work' | 'break'): string {
  const time = formatTime(seconds);
  const modeEmoji = mode === 'work' ? '🍅' : '☕';
  const modeText = mode === 'work' ? '작업' : '휴식';
  return `${time} ${modeEmoji} ${modeText} - Pomodoro`;
}

/**
 * Merge class names with proper spacing
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
