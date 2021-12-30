import { AppModel, createApp, getBundleKey } from "../src/models/app";
import mockFluentBundle from "./mockFluentBundle";
import { appVocabURL } from "./mockAppIndexDataset";
import mockLanguage, { defaultLocale } from "./mockLanguage";
import mockResourceBundleMap from "./mockResourceBundleMap";
import mockAppIndex from "./mockAppIndex";
import mockFAQsDataset from "./mockFAQsDataset";
import createTranslationsRecordFromArray from "./createTranslationsRecordFromArray";

export const errorsURL = "https://example.com/global/errors.ttl";
export const faqsURL = "https://example.com/global/faqs.ttl";
export const globalTranslationsURL =
  "https://example.com/global/translations.ttl";
export const globalLocalizationsURL =
  "https://example.com/global/translations.en-US.ttl";
export const adminTranslationsURL =
  "https://example.com/admin/translations.ttl";
export const adminLocalizationsURL =
  "https://example.com/admin/translations.en-US.ttl";
// localizations
export const appName = "Test App";
export const translations = {
  [`${globalTranslationsURL}#appName`]: appName,
  ...createTranslationsRecordFromArray(globalTranslationsURL, [
    "aboutPageTitle",
    "appPitch",
    "authenticationGuidance",
    "authenticationPitch",
    "charactersPageTitle",
    "classesPageTitle",
    "close",
    "darkModeTurnOff",
    "darkModeTurnOn",
    "equipmentPageTitle",
    "faqLabel",
    "faqPageTitle",
    "faqShort",
    "learnMore",
    "loggedIn",
    "LoggedInAlready",
    "login",
    "loginPageTitle",
    "loginPitch",
    "loginPrompt",
    "logOut",
    "monstersPageTitle",
    "onlyAvailableInEnglish",
    "or",
    "provideIdP",
    "racesPageTitle",
    "recommendedIdPSet",
    "rememberIdP",
    "rulesPageTitle",
    "signupGuidance",
    "signupPageTitle",
    "signupSolidPrompt",
    "solidIdP",
    "spellsPageTitle",
    "translateTo",
    "translationId",
    "workInProgress",
  ]),
  ...createTranslationsRecordFromArray(adminTranslationsURL, [
    "adminPageTitle",
  ]),
};

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
      [currentLocale]: mockFluentBundle(translations, {
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
        urls: {
          errors: null,
          faqs: null,
          localizations: adminLocalizationsURL,
          translations: adminTranslationsURL,
        },
      }),
      ...mockResourceBundleMap({
        locale: currentLocale,
        data: {
          errors: null,
          faqs: mockFAQsDataset(),
          localizations: null,
          translations: null,
        },
        urls: {
          errors: errorsURL,
          faqs: faqsURL,
          localizations: globalLocalizationsURL,
          translations: globalTranslationsURL,
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
      [locale]: mockFluentBundle(translations, {
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
