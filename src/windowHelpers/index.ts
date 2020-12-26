/* istanbul ignore file */
// eslint-disable-next-line import/prefer-default-export
export function createURLFromPath(path) {
  if (typeof window !== "undefined") {
    return window.location.origin + path;
  }
  return `https://localhost${path}`;
}

export function ensureAbsoluteURL(relativeOrAbsoluteURL) {
  return relativeOrAbsoluteURL.startsWith("https")
    ? relativeOrAbsoluteURL
    : createURLFromPath(relativeOrAbsoluteURL);
}

export function getRedirectURL(path) {
  if (typeof window !== "undefined") {
    const currentOrigin = window.location.origin;
    return `${currentOrigin}/${path}`;
  }

  return "";
}

export function getNavigatorLanguages(selectedLocale?: string | string[]) {
  if (typeof navigator === "undefined") {
    return ["en-US"];
  }
  if (!selectedLocale) {
    const storedLanguage = localStorage.getItem("locale");
    return storedLanguage
      ? [storedLanguage, ...navigator.languages]
      : [...navigator.languages];
  }
  return Array.isArray(selectedLocale)
    ? selectedLocale.concat([...navigator.languages])
    : [selectedLocale, ...navigator.languages];
}
