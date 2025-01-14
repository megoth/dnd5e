export function first<T>(valueOrArray: T | Array<T>): T {
  return Array.isArray(valueOrArray) ? valueOrArray[0] : valueOrArray;
}

export function uniqueArray(item, pos, array) {
  return array.indexOf(item) == pos;
}

export function removeDuplicates<T>(array: T[]): T[] {
  // TODO: FIX lazy solution
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return [...new Set(array)];
}
