'use client';

import { usePomodoro } from '@/hooks/usePomodoro';
import { TimerDisplay } from './TimerDisplay';
import { ControlButtons } from './ControlButtons';
import { SessionCounter } from './SessionCounter';
import { cn } from '@/lib/utils';

export function PomodoroTimer() {
  const {
    mode,
    timeRemaining,
    isRunning,
    completedSessions,
    settings,
    start,
    pause,
    reset,
    skip,
  } = usePomodoro();

  const currentDuration =
    mode === 'work' ? settings.workDuration : settings.breakDuration;

  return (
    <div
      className={cn(
        'min-h-screen w-full flex flex-col items-center justify-center p-4 transition-colors duration-700',
        mode === 'work'
          ? 'bg-gradient-to-b from-red-50 to-white'
          : 'bg-gradient-to-b from-green-50 to-white'
      )}
    >
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            🍅 Pomodoro Timer
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            집중하고, 휴식하고, 반복하세요
          </p>
        </header>

        {/* Timer Display */}
        <TimerDisplay
          timeRemaining={timeRemaining}
          mode={mode}
          totalDuration={currentDuration}
          isRunning={isRunning}
        />

        {/* Control Buttons */}
        <ControlButtons
          isRunning={isRunning}
          mode={mode}
          onStart={start}
          onPause={pause}
          onReset={reset}
          onSkip={skip}
        />

        {/* Session Counter */}
        <SessionCounter completedSessions={completedSessions} />

        {/* Info */}
        <div className="text-center text-xs text-gray-400 mt-4">
          <p>작업 시간: {settings.workDuration / 60}분 | 휴식 시간: {settings.breakDuration / 60}분</p>
        </div>
      </div>
    </div>
  );
}
