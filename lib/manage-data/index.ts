import crypto from "crypto";

export function createKeyedArray(list) {
  return list.map((item) => ({
    _key: crypto.randomBytes(8).toString("hex"),
    ...item,
  }));
}

export function createSlug(slug: string | number): {
  _type: "slug";
  current: string;
} {
  return {
    _type: "slug",
    current: slug.toString(),
  };
}

export function getDnd5eDataPath(type: string): string {
  return `./data/dnd5eapi/${type}.json`;
}

export function getDnd5eUrl(relativeUrl: string): string {
  return `https://www.dnd5eapi.co${relativeUrl}`;
}

export function getProperty<T>(key: keyof T, value?: any): Record<string, any> {
  return value ? { [key]: value } : {};
}

export function getSanityFilePath(): string {
  return "./data/sanity/data.ndjson";
}

export function getSafeType(type) {
  return type.replace("'", "");
}

export function migrateToMarkdown(lines: string[] = []): string {
  return lines
    .map((line, index) =>
      (line[0] === "|" && lines[index + 1] && lines[index + 1][0] === "|") ||
      !lines[index + 1]
        ? line
        : `${line}\n`
    )
    .join("\n");
}
