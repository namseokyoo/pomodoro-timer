// Web Worker for accurate timer ticking
// Uses Date.now() for drift-proof timing, unaffected by background tab throttling

let timerId = null;
let targetTime = 0; // absolute timestamp when timer should fire next
let remaining = 0; // remaining seconds tracked by worker

self.onmessage = function (e) {
  const { type, timeRemaining } = e.data;

  if (type === 'start') {
    // Initialize remaining time from main thread
    if (typeof timeRemaining === 'number') {
      remaining = timeRemaining;
    }
    startTicking();
  }

  if (type === 'stop') {
    stopTicking();
  }

  if (type === 'sync') {
    // Sync remaining time without starting/stopping
    if (typeof timeRemaining === 'number') {
      remaining = timeRemaining;
    }
  }
};

function startTicking() {
  stopTicking();
  targetTime = Date.now() + 1000;
  scheduleTick();
}

function scheduleTick() {
  const now = Date.now();
  const delay = Math.max(0, targetTime - now);

  timerId = setTimeout(function tick() {
    remaining = remaining - 1;

    // Send remaining time to main thread for accuracy
    self.postMessage({ type: 'tick', remaining: remaining });

    if (remaining <= 0) {
      // Timer complete, stop ticking
      stopTicking();
      return;
    }

    // Schedule next tick using absolute target to prevent drift
    targetTime = targetTime + 1000;

    // If we've drifted too far (e.g., tab was suspended then resumed),
    // recalculate based on current time
    const now2 = Date.now();
    if (targetTime < now2 - 2000) {
      // We've been suspended; recalculate how many seconds were missed
      const missedMs = now2 - targetTime;
      const missedSeconds = Math.floor(missedMs / 1000);
      remaining = remaining - missedSeconds;

      if (remaining <= 0) {
        remaining = 0;
        self.postMessage({ type: 'tick', remaining: 0 });
        stopTicking();
        return;
      }

      self.postMessage({ type: 'tick', remaining: remaining });
      targetTime = now2 + 1000;
    }

    scheduleTick();
  }, delay);
}

function stopTicking() {
  if (timerId !== null) {
    clearTimeout(timerId);
    timerId = null;
  }
}
