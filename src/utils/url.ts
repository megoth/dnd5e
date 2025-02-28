export function resourceUrl(url: string) {
  return url.split("#")[0];
}

export function hash(url: string) {
  return url.split("#")[1];
}

// found at https://stackoverflow.com/a/43467144
export function isUrl(str: string): boolean {
  let url: URL;

  try {
    url = new URL(str);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}
