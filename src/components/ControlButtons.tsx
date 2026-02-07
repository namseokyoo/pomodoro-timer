'use client';

import { cn } from '@/lib/utils';
import { TimerMode } from '@/types';

interface ControlButtonsProps {
  isRunning: boolean;
  mode: TimerMode;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export function ControlButtons({
  isRunning,
  mode,
  onStart,
  onPause,
  onReset,
  onSkip,
}: ControlButtonsProps) {
  const primaryColor = mode === 'work' ? 'red' : 'green';

  return (
    <div className="flex items-center justify-center gap-4">
      {/* Reset button */}
      <button
        onClick={onReset}
        className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200',
          'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800',
          'active:scale-95'
        )}
        title="리셋"
        aria-label="타이머 리셋"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </button>

      {/* Play/Pause button */}
      <button
        onClick={isRunning ? onPause : onStart}
        className={cn(
          'w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-200',
          'shadow-lg active:scale-95',
          primaryColor === 'red'
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-green-500 hover:bg-green-600 text-white'
        )}
        title={isRunning ? '일시정지' : '시작'}
        aria-label={isRunning ? '타이머 일시정지' : '타이머 시작'}
      >
        {isRunning ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 sm:w-10 sm:h-10"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 sm:w-10 sm:h-10 ml-1"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5.14v14l11-7-11-7z" />
          </svg>
        )}
      </button>

      {/* Skip button */}
      <button
        onClick={onSkip}
        className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200',
          'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800',
          'active:scale-95'
        )}
        title="건너뛰기"
        aria-label="현재 세션 건너뛰기"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M5 4l10 8-10 8V4z" />
          <rect x="17" y="4" width="2" height="16" rx="1" />
        </svg>
      </button>
    </div>
  );
}
