export function chain(object, ...operations) {
  return operations.reduce((acc, transform) => {
    return transform(acc);
  }, object);
}

export function createLocalResponse(body) {
  return new Response(body, {
    headers: new Headers({
      "Content-Type": "text/turtle",
    }),
  });
}

export function getPath(url) {
  return url.split("#")[0];
}
