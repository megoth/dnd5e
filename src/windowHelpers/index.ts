// eslint-disable-next-line import/prefer-default-export
export function generateRedirectUrl(path) {
  if (typeof window !== "undefined") {
    const currentOrigin = window.location.origin;
    return `${currentOrigin}/${path}`;
  }

  return "";
}
