import {
  getTranslationURL,
  getFailedMessage,
  getMessage,
  getTranslationId,
} from "./index";
import mockApp, {
  mockAppPropValue,
  translationsURL,
} from "../../../__testUtils/mockApp";
import mockFluentBundle from "../../../__testUtils/mockFluentBundle";
import { defaultLocale } from "../../../__testUtils/mockLanguage";
import mockResourceBundleMap from "../../../__testUtils/mockResourceBundleMap";

describe("getTranslationId", () => {
  it("converts a url to safe string for Fluent", () =>
    expect(getTranslationId("http://example.com/test/me#more")).toEqual(
      "http---example-com-test-me-more"
    ));
});

describe("getTranslationURL", () => {
  it("creates an url out of an id", () =>
    expect(
      getTranslationURL(
        "test",
        {
          currentLocale: defaultLocale,
          resourceBundles: mockResourceBundleMap(),
        },
        "global"
      )
    ).toEqual(`${translationsURL}#test`));
});

describe("getMessage", () => {
  const id = "test";

  it("returns a message from a bundle given a translation id", () => {
    const message = "Test";
    const mockedFluentBundle = mockFluentBundle({
      [id]: message,
    });
    const app = mockApp({
      fluentBundles: {
        [defaultLocale]: mockedFluentBundle,
      },
    });
    expect(getMessage(app, id, {})).toEqual(message);
  });

  it("returns a message from a bundle given a translation URL", () => {
    const message = "Test";
    const mockedFluentBundle = mockFluentBundle({
      [id]: message,
    });
    const translationURL = getTranslationURL(id, {
      currentLocale: defaultLocale,
      resourceBundles: mockResourceBundleMap(),
    });
    const app = mockApp({
      fluentBundles: {
        [defaultLocale]: mockedFluentBundle,
      },
    });
    expect(getMessage(app, translationURL)).toEqual(message);
  });

  it("supports interpolation", () => {
    const mockedFluentBundle = mockFluentBundle({
      [id]: "{$test}",
    });
    const app = mockApp({
      fluentBundles: mockAppPropValue(mockedFluentBundle, null),
    });
    expect(
      getMessage(app, id, {
        test: 42,
      })
    ).toContain("42");
  });

  it("supports fallback if translation does not exist", () => {
    const app = mockApp();
    expect(getMessage(app, id)).toEqual(
      getFailedMessage(getTranslationURL(id, app))
    );
  });

  it("supports fallback if fluent bundles not available", () => {
    const app = mockApp({
      fluentBundles: mockAppPropValue(null, null),
    });
    expect(getMessage(app, id)).toEqual(
      getFailedMessage(getTranslationURL(id, app))
    );
  });
});
