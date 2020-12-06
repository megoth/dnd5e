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
  errorsIndexURL,
  translationsIndexURL,
} from "../../../__testUtils/mockApp";
import { createSWRResponse } from "../../../__testUtils/mockSWR";
import { chain } from "../../utils";
import { getAppTerm } from "../appIndex";
import { getTranslationURL } from "../translation";
import { appVocabURL } from "../../../__testUtils/mockAppIndexDataset";

const app = mockApp();
const id = "test";

describe("getErrorURL", () => {
  it("creates an url out of an id", () =>
    expect(getErrorURL("test", app, "global")).toEqual(
      `${errorsIndexURL}#test`
    ));
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
  it("returns a translation URL for a error URL", () => {
    const errorURL = getErrorURL("test", {
      errorsIndexURL: { global: errorsIndexURL },
    });
    const translationURL = getTranslationURL("test", {
      translationsIndexURL: { global: translationsIndexURL },
    });
    const bundle = mockApp({
      errorsIndexSWR: {
        global: createSWRResponse(
          chain(mockSolidDatasetFrom(errorsIndexURL), (d) =>
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
          )
        ),
      },
    });
    expect(getErrorTranslationURL(errorURL, bundle, "global")).toEqual(
      translationURL
    );
  });

  it("returns null if errors dataset is not available", () => {
    const errorURL = getErrorURL("test", {
      errorsIndexURL: { global: errorsIndexURL },
    });
    const bundle = mockApp({
      errorsIndexSWR: {
        global: createSWRResponse(null),
      },
    });
    expect(getErrorTranslationURL(errorURL, bundle)).toBeNull();
  });

  it("returns null if error url does not exist", () => {
    expect(getErrorTranslationURL("test", app)).toBeNull();
  });
});
