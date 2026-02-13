'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { TimerMode, TimerSettings, DEFAULT_SETTINGS } from '@/types';
import { saveState, loadState, saveSettings, loadSettings } from '@/lib/storage';
import { playNotificationSound, initAudio } from '@/lib/audio';
import { formatTabTitle } from '@/lib/utils';

interface UsePomodoroReturn {
  // State
  mode: TimerMode;
  timeRemaining: number;
  isRunning: boolean;
  completedSessions: number;
  settings: TimerSettings;

  // Actions
  start: () => void;
  pause: () => void;
  reset: () => void;
  skip: () => void;
  updateSettings: (settings: Partial<TimerSettings>) => void;
}

export function usePomodoro(): UsePomodoroReturn {
  const [mode, setMode] = useState<TimerMode>('work');
  const [settings, setSettings] = useState<TimerSettings>(DEFAULT_SETTINGS);
  const [timeRemaining, setTimeRemaining] = useState(DEFAULT_SETTINGS.workDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const workerRef = useRef<Worker | null>(null);
  const originalTitleRef = useRef<string>('Pomodoro Timer');

  // Initialize from localStorage
  useEffect(() => {
    const storedState = loadState();
    const storedSettings = loadSettings();

    if (storedSettings) {
      setSettings(storedSettings);
      setTimeRemaining(storedSettings.workDuration);
    }

    if (storedState) {
      setCompletedSessions(storedState.completedSessions);
    }

    // Save original title
    if (typeof document !== 'undefined') {
      originalTitleRef.current = document.title;
    }

    // Initialize audio context
    initAudio();

    setIsInitialized(true);
  }, []);

  // Update tab title when timer changes
  useEffect(() => {
    if (typeof document === 'undefined' || !isInitialized) return;

    if (isRunning) {
      document.title = formatTabTitle(timeRemaining, mode);
    } else {
      document.title = 'Pomodoro Timer';
    }

    return () => {
      document.title = originalTitleRef.current;
    };
  }, [timeRemaining, mode, isRunning, isInitialized]);

  // Initialize Web Worker
  useEffect(() => {
    workerRef.current = new Worker('/timer-worker.js');
    workerRef.current.onmessage = (e) => {
      const { remaining } = e.data;
      if (typeof remaining === 'number') {
        // Use the worker's authoritative remaining time (drift-corrected)
        setTimeRemaining(Math.max(0, remaining));
      }
    };

    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  // Start/stop Web Worker based on isRunning state
  useEffect(() => {
    if (!workerRef.current) return;

    if (isRunning) {
      workerRef.current.postMessage({ type: 'start', timeRemaining });
    } else {
      workerRef.current.postMessage({ type: 'stop' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  const handleTimerComplete = useCallback(() => {
    setIsRunning(false);
    playNotificationSound();

    if (mode === 'work') {
      // Work session completed
      const newSessions = completedSessions + 1;
      setCompletedSessions(newSessions);
      saveState(newSessions);

      // Switch to break
      setMode('break');
      setTimeRemaining(settings.breakDuration);
    } else {
      // Break completed - switch back to work
      setMode('work');
      setTimeRemaining(settings.workDuration);
    }
  }, [mode, completedSessions, settings]);

  // Handle timer completion via effect
  useEffect(() => {
    if (timeRemaining === 0 && isRunning) {
      handleTimerComplete();
    }
  }, [timeRemaining, isRunning, handleTimerComplete]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeRemaining(mode === 'work' ? settings.workDuration : settings.breakDuration);
  }, [mode, settings]);

  const skip = useCallback(() => {
    setIsRunning(false);
    if (mode === 'work') {
      setMode('break');
      setTimeRemaining(settings.breakDuration);
    } else {
      setMode('work');
      setTimeRemaining(settings.workDuration);
    }
  }, [mode, settings]);

  const updateSettings = useCallback((newSettings: Partial<TimerSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      saveSettings(updated);

      // Update current time if timer is not running
      if (!isRunning) {
        if (mode === 'work' && newSettings.workDuration !== undefined) {
          setTimeRemaining(newSettings.workDuration);
        } else if (mode === 'break' && newSettings.breakDuration !== undefined) {
          setTimeRemaining(newSettings.breakDuration);
        }
      }

      return updated;
    });
  }, [isRunning, mode]);

  return {
    mode,
    timeRemaining,
    isRunning,
    completedSessions,
    settings,
    start,
    pause,
    reset,
    skip,
    updateSettings,
  };
}
