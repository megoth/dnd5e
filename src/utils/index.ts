// eslint-disable-next-line import/prefer-default-export
export function chain(object, ...operations) {
  return operations.reduce((acc, transform) => {
    return transform(acc);
  }, object);
}
