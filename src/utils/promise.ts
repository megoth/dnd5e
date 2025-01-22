export function timedPromise(timeout: number = 1000): Promise<void> {
  return new Promise((resolve) => setTimeout(() => resolve(null), timeout));
}
