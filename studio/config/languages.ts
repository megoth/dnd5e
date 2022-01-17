export const languages = [
  {
    languageCode: "en_US",
    languageName: "English",
  },
  {
    languageCode: "nb_NO",
    languageName: "Norwegian",
  },
];

export default languages;

export function getLanguagesAsGroups() {
  return languages.map(({ languageCode, languageName }) => ({
    name: languageCode,
    title: languageName,
  }));
}

export function getGroupField({ name, title, ...rest }) {
  return languages.map(({ languageCode, languageName }) => ({
    name: `${name}_${languageCode}`,
    title: `${title} (${languageName})`,
    group: languageCode,
    ...rest,
  }));
}
