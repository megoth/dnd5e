import {
  appIsLoading,
  appIsLoadingLocalizations,
  createApp,
  getBundleKey,
} from "./index";
import mockLanguage, { defaultLocale } from "../../../__testUtils/mockLanguage";
import {
  appVocabURL,
  translationLanguageEnUS,
} from "../../../__testUtils/mockAppIndexDataset";
import mockAppIndex from "../../../__testUtils/mockAppIndex";
import { defaultBundle } from "../../../__testUtils/mockResourceBundle";
import mockApp, {
  mockEmptyApp,
  mockUnloadedApp,
} from "../../../__testUtils/mockApp";
import mockResourceBundleMap from "../../../__testUtils/mockResourceBundleMap";

describe("getBundleKey", () => {
  it("returns a string combination of locale code and bundle name", () => {
    expect(getBundleKey("nb-NO", "test")).toEqual("test-nb-NO");
    expect(getBundleKey("nb-NO")).toEqual("global-nb-NO");
    expect(getBundleKey()).toEqual("global-en-US");
  });
});

describe("createApp", () => {
  it("creates an empty app if no app index is given", () => {
    expect(createApp(defaultLocale, appVocabURL, null)).toEqual({
      appVocabURL,
      currentLocale: defaultLocale,
      fluentBundles: {},
      languages: [],
      resourceBundles: {},
    });
  });

  it("populates properties with data from app index", () => {
    const appIndex = mockAppIndex();
    expect(createApp(defaultLocale, appVocabURL, appIndex)).toEqual({
      appVocabURL,
      currentLocale: defaultLocale,
      fluentBundles: {},
      languages: [
        mockLanguage(defaultLocale, {
          translationUrl: translationLanguageEnUS,
        }),
      ],
      resourceBundles: mockResourceBundleMap(),
    });
  });
});

describe("appIsLoading", () => {
  it("checks whether resource bundles are loaded into the app model", () => {
    const app = mockApp();
    expect(appIsLoading(app, [defaultBundle, "admin"])).toBeFalsy();
    expect(appIsLoading(app, ["test"])).toBeTruthy();
    expect(appIsLoading(mockEmptyApp(), [defaultBundle])).toBeTruthy();
    expect(appIsLoading(mockUnloadedApp(), [defaultBundle])).toBeFalsy();
  });
});

describe("appIsLoadingLocalizations", () => {
  it("checks whether data for localizations have been loaded into the app model", () => {
    expect(appIsLoadingLocalizations(mockApp(), [defaultBundle])).toBeFalsy();
    expect(
      appIsLoadingLocalizations(mockEmptyApp(), [defaultBundle])
    ).toBeTruthy();
    expect(
      appIsLoadingLocalizations(mockUnloadedApp(), [defaultBundle])
    ).toBeTruthy();
  });
});
