// Pomodoro Timer Types

export type TimerMode = 'work' | 'break';

export interface TimerSettings {
  workDuration: number; // in seconds
  breakDuration: number; // in seconds
}

export interface TimerState {
  mode: TimerMode;
  timeRemaining: number; // in seconds
  isRunning: boolean;
  completedSessions: number;
}

export const DEFAULT_SETTINGS: TimerSettings = {
  workDuration: 25 * 60, // 25 minutes
  breakDuration: 5 * 60, // 5 minutes
};
