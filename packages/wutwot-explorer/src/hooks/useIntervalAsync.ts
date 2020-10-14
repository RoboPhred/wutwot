import * as React from "react";

/**
 * Calls an async function at an interval as long as isActive is true.
 * The interval time will be the time between call completions.  Time spent running the async function is not included in the call.
 * @param callback The callback to call on an interval.
 * @param interval The interval to call the callback on, in milliseconds.
 * @param isActive A boolean indicating whether the callback should be called.
 */
export function useIntervalAsync(
  callback: () => Promise<void>,
  interval: number,
  isActive: boolean = true,
) {
  const callbackRef = React.useRef(callback);
  const isActiveRef = React.useRef(isActive);
  // Keep our refs updated with the current values
  React.useEffect(() => {
    callbackRef.current = callback;
    isActiveRef.current = isActive;
  });

  React.useEffect(() => {
    if (!isActive) {
      return;
    }

    async function run() {
      // Run a delay before the first invocation.
      await delay(interval);
      while (isActiveRef.current) {
        try {
          await callback();
        } catch (e) {
          // Log the error but keep going.
          console.error(e);
        }
        // Delay after the invocation, so if isActive is set to false during the delay, we will not re-run.
        await delay(interval);
      }
    }

    run();
  }, [isActive]);
}

function delay(duration: number): Promise<void> {
  return new Promise((accept) => {
    setTimeout(accept, duration);
  });
}
