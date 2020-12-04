// eslint-disable-next-line import/prefer-default-export
export function generateRedirectURL(path) {
  if (typeof window !== "undefined") {
    const currentOrigin = window.location.origin;
    return `${currentOrigin}/${path}`;
  }

  return "";
}
