export default function createTranslationsRecordFromArray(
  url,
  list: string[]
): Record<string, string> {
  return list.reduce((memo: Record<string, string>, key) => {
    // eslint-disable-next-line no-param-reassign
    memo[`${url}#${key}`] = key;
    return memo;
  }, {});
}
