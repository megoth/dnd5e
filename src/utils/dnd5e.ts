export function dataPath(type: string): string {
  // only used backend
  return `${process.cwd()}/public/data/${type}.ttl`;
}

export function dataUrl(type: string, id: string): string {
  return `https://dnd5e.app/data/${type}.ttl#${id}`;
}

export function vocabUrl(id: string): string {
  return `https://dnd5e.app/vocab/dnd5e.ttl#${id}`;
}
