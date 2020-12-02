const appVocabUrl = "https://dnd5e.inrupt.net/data/app-vocabulary.ttl";

// eslint-disable-next-line import/prefer-default-export
export function getAppTerm(alias) {
  return `${appVocabUrl}#${alias}`;
}
