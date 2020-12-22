import { AppModel, createApp, getBundleKey } from "../src/models/app";
import mockFluentBundle from "./mockFluentBundle";
import { appVocabURL } from "./mockAppIndexDataset";
import mockLanguage, { defaultLocale } from "./mockLanguage";
import mockResourceBundleMap from "./mockResourceBundleMap";
import mockAppIndex from "./mockAppIndex";

export const errorsURL = "https://example.com/global/errors.ttl";
export const faqsURL = "https://example.com/global/faqs.ttl";
export const translationsURL = "https://example.com/global/translations.ttl";
export const localizationsURL =
  "https://example.com/global/translations.en-US.ttl";

export function mockAppPropValue(val, bundleName = "global", locale = "en-US") {
  return bundleName
    ? {
        [getBundleKey(locale, bundleName)]: val,
      }
    : {
        [locale]: val,
      };
}

export default function mockApp(overrides: Partial<AppModel> = {}): AppModel {
  const currentLocale = overrides.currentLocale || defaultLocale;
  return {
    appVocabURL: overrides.appVocabURL || appVocabURL,
    currentLocale,
    fluentBundles: {
      [currentLocale]: mockFluentBundle({}, translationsURL, {
        locale: currentLocale,
      }),
      ...overrides.fluentBundles,
    },
    languages: [mockLanguage(currentLocale), ...(overrides.languages || [])],
    resourceBundles: {
      ...mockResourceBundleMap({
        label: "admin",
        locale: currentLocale,
        data: {
          errors: null,
          faqs: null,
          localizations: null,
          translations: null,
        },
      }),
      ...mockResourceBundleMap({
        locale: currentLocale,
        data: {
          errors: null,
          faqs: null,
          localizations: null,
          translations: null,
        },
      }),
      ...overrides.resourceBundles,
    },
  };
}

export function mockNorwegianApp(overrides: Partial<AppModel> = {}): AppModel {
  const locale = "nb-NO";
  return mockApp({
    currentLocale: locale,
    fluentBundles: {
      [locale]: mockFluentBundle({}, translationsURL, {
        locale,
      }),
    },
    languages: [
      mockLanguage(locale, {
        languageCode: "🇳🇴",
      }),
    ],
    resourceBundles: {
      ...mockResourceBundleMap({
        locale,
        data: {
          errors: null,
          faqs: null,
          localizations: null,
          translations: null,
        },
      }),
    },
    ...overrides,
  });
}

export function mockEmptyApp(): AppModel {
  return createApp(defaultLocale, appVocabURL, null);
}

export function mockUnloadedApp(): AppModel {
  return createApp(defaultLocale, appVocabURL, mockAppIndex());
}
