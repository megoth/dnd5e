export function getDnd5eDataPath(type: string): string {
  return `./data/dnd5eapi/${type}.json`;
}

export function getDnd5eUrl(relativeUrl: string): string {
  return `https://www.dnd5eapi.co${relativeUrl}`;
}

export function getProperty<T>(
  key: keyof T,
  value?: any
): {} | Record<keyof T, any> {
  return value ? { [key]: value } : {};
}

export function getSanityFilePath(): string {
  return "./data/sanity/data.ndjson";
}
