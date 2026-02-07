'use client';

import { formatTime, cn } from '@/lib/utils';
import { TimerMode } from '@/types';

interface TimerDisplayProps {
  timeRemaining: number;
  mode: TimerMode;
  totalDuration: number;
  isRunning: boolean;
}

export function TimerDisplay({
  timeRemaining,
  mode,
  totalDuration,
  isRunning,
}: TimerDisplayProps) {
  const progress = ((totalDuration - timeRemaining) / totalDuration) * 100;

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Circular progress background */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={cn(
              'transition-colors duration-500',
              mode === 'work' ? 'text-red-100' : 'text-green-100'
            )}
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            className={cn(
              'transition-all duration-500',
              mode === 'work' ? 'text-red-500' : 'text-green-500'
            )}
          />
        </svg>

        {/* Timer content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Mode indicator */}
          <div
            className={cn(
              'mb-2 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-500',
              mode === 'work'
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            )}
          >
            {mode === 'work' ? '🍅 작업 시간' : '☕ 휴식 시간'}
          </div>

          {/* Time display */}
          <span
            className={cn(
              'text-5xl sm:text-6xl font-mono font-bold transition-colors duration-500',
              mode === 'work' ? 'text-red-600' : 'text-green-600'
            )}
          >
            {formatTime(timeRemaining)}
          </span>

          {/* Running indicator */}
          {isRunning && (
            <div className="mt-3 flex items-center gap-1">
              <span
                className={cn(
                  'w-2 h-2 rounded-full animate-pulse',
                  mode === 'work' ? 'bg-red-500' : 'bg-green-500'
                )}
              />
              <span className="text-sm text-gray-500">진행 중</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
