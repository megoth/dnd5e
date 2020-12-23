type Modifier =
  | string
  | Record<string, boolean | undefined | null>
  | undefined
  | null;

function getModifier(base: string, modifier: Modifier): Array<string> {
  if (!modifier) return [];
  if (typeof modifier === "string") return [`${base}--${modifier}`];
  return Object.entries(modifier).map(([value, key]) =>
    key ? `${base}--${value}` : ""
  );
}

export function bem(base: string, ...modifiers: Array<Modifier>): string {
  const baseModifiers = modifiers.map((modifier) =>
    getModifier(base, modifier)
  );

  return [base]
    .concat(...baseModifiers)
    .join(" ")
    .trim();
}

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
