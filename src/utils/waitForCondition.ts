/**
 * Waits until the provided condition returns true or the timeout is reached.
 * @param conditionFn A function that returns a boolean (or a Promise that resolves to boolean)
 * @param timeout Maximum time to wait in milliseconds (default 30s)
 * @param interval Interval between checks in milliseconds (default 1s)
 */
export async function waitForCondition(
    conditionFn: () => Promise<boolean> | boolean,
    timeout = 30000,
    interval = 1000
  ): Promise<void> {
    const startTime = Date.now();
    while (true) {
      try {
        const conditionMet = await conditionFn();
        if (conditionMet) return;
      } catch (error) {
        // Optionally log errors from the condition function, but continue waiting.
      }
      if (Date.now() - startTime > timeout) {
        throw new Error('Timeout waiting for condition.');
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
  