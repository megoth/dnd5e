import NestedError from "nested-error-stacks";
import {
  addUrl,
  mockSolidDatasetFrom,
  mockThingFrom,
  setThing,
} from "@inrupt/solid-client";
import {
  getErrorURL,
  getError,
  getErrorTranslationURL,
  isError,
} from "./index";
import mockApp, {
  errorsURL,
  translationsURL,
} from "../../../__testUtils/mockApp";
import { chain } from "../../utils";
import { getAppTerm } from "../appIndex";
import { getTranslationURL } from "../translation";
import { appVocabURL } from "../../../__testUtils/mockAppIndexDataset";
import mockResourceBundleMap from "../../../__testUtils/mockResourceBundleMap";
import { defaultLocale } from "../../../__testUtils/mockLanguage";

const app = mockApp();
const id = "test";

describe("getErrorURL", () => {
  it("creates an url out of an id", () =>
    expect(getErrorURL("test", app, "global")).toEqual(`${errorsURL}#test`));
});

describe("getError", () => {
  const error = new Error();

  it("generates a nested error", () =>
    expect(getError(id, app, error)).toEqual(
      new NestedError(getErrorURL(id, app), error)
    ));
});

describe("isError", () => {
  const error = getError(id, app);

  it("checks whether an error is a given error id", () => {
    expect(isError(error, id, app)).toBe(true);
    expect(isError(new Error(), id, app)).toBe(false);
  });
});

describe("getErrorTranslationURL", () => {
  const urls = {
    errors: errorsURL,
    translations: translationsURL,
  };
  const globalResourceBundle = mockResourceBundleMap({
    urls,
  });
  const errorURL = getErrorURL("test", {
    currentLocale: defaultLocale,
    resourceBundles: globalResourceBundle,
  });

  it("returns a translation URL for a error URL", () => {
    const translationURL = getTranslationURL("test", {
      currentLocale: defaultLocale,
      resourceBundles: globalResourceBundle,
    });
    const appWithErrors = mockApp({
      resourceBundles: mockResourceBundleMap({
        data: {
          errors: chain(mockSolidDatasetFrom(errorsURL), (d) =>
            setThing(
              d,
              chain(mockThingFrom(errorURL), (t) =>
                addUrl(
                  t,
                  getAppTerm("translation", { appVocabURL }),
                  translationURL
                )
              )
            )
          ),
        },
        urls,
      }),
    });
    expect(getErrorTranslationURL(errorURL, appWithErrors, "global")).toEqual(
      translationURL
    );
  });

  it("returns null if errors dataset is not available", () => {
    const appWithNoErrors = mockApp({
      resourceBundles: globalResourceBundle,
    });
    expect(getErrorTranslationURL(errorURL, appWithNoErrors)).toBeNull();
  });

  it("returns null if error url does not exist", () => {
    expect(
      getErrorTranslationURL(
        "test",
        mockApp({
          resourceBundles: mockResourceBundleMap({
            data: {
              errors: mockSolidDatasetFrom(errorsURL),
            },
          }),
        })
      )
    ).toBeNull();
  });
});
