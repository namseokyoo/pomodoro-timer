// LocalStorage utility functions

const STORAGE_KEY = 'pomodoro-timer-state';
const SETTINGS_KEY = 'pomodoro-timer-settings';

interface StoredState {
  completedSessions: number;
  lastUpdated: string;
}

interface StoredSettings {
  workDuration: number;
  breakDuration: number;
}

export function saveState(completedSessions: number): void {
  if (typeof window === 'undefined') return;

  const state: StoredState = {
    completedSessions,
    lastUpdated: new Date().toISOString(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save state to localStorage:', error);
  }
}

export function loadState(): StoredState | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const state: StoredState = JSON.parse(stored);

    // Reset sessions if it's a new day
    const lastUpdated = new Date(state.lastUpdated);
    const today = new Date();

    if (
      lastUpdated.getDate() !== today.getDate() ||
      lastUpdated.getMonth() !== today.getMonth() ||
      lastUpdated.getFullYear() !== today.getFullYear()
    ) {
      return { completedSessions: 0, lastUpdated: today.toISOString() };
    }

    return state;
  } catch (error) {
    console.error('Failed to load state from localStorage:', error);
    return null;
  }
}

export function saveSettings(settings: StoredSettings): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings to localStorage:', error);
  }
}

export function loadSettings(): StoredSettings | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to load settings from localStorage:', error);
    return null;
  }
}
