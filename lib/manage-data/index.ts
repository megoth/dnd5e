export function getDnd5eDataPath(type: string): string {
  return `./data/dnd5eapi/${type}.json`;
}

export function getSanityFilePath(): string {
  return "./data/sanity/data.ndjson";
}
