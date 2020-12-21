import { LanguageModel } from "../src/models/language";

export const defaultLocale = "en-US";

export default function mockLanguage(
  languageCode,
  overrides: Partial<LanguageModel> = {}
): LanguageModel {
  return {
    languageCode,
    translationUrl: `http://example.com/translations.ttl#locale-${languageCode}`,
    ...overrides,
  };
}
