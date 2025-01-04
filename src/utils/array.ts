export function removeDuplicates<T>(array: T[]): T[] {
  // TODO: FIX lazy solution
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return [...new Set(array)];
}
