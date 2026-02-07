'use client';

interface SessionCounterProps {
  completedSessions: number;
}

export function SessionCounter({ completedSessions }: SessionCounterProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-sm text-gray-500 font-medium">오늘 완료한 세션</div>
      <div className="flex items-center gap-2">
        {/* Visual pomodoro icons */}
        <div className="flex gap-1">
          {[...Array(Math.min(completedSessions, 8))].map((_, i) => (
            <span key={i} className="text-xl" role="img" aria-label="완료된 포모도로">
              🍅
            </span>
          ))}
          {completedSessions === 0 && (
            <span className="text-gray-300">아직 없음</span>
          )}
        </div>
        {completedSessions > 8 && (
          <span className="text-sm text-gray-500">+{completedSessions - 8}</span>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-700">
        {completedSessions}
        <span className="text-sm font-normal text-gray-500 ml-1">세션</span>
      </div>
    </div>
  );
}
