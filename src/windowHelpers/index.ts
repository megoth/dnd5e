/* istanbul ignore file */
// eslint-disable-next-line import/prefer-default-export
export function getRedirectURL(path) {
  if (typeof window !== "undefined") {
    const currentOrigin = window.location.origin;
    return `${currentOrigin}/${path}`;
  }

  return "";
}

export function getNavigatorLanguages() {
  if (typeof navigator === "undefined") {
    return ["en-US"];
  }
  return [...navigator.languages];
}
