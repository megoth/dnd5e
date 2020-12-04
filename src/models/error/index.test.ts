import NestedError from "nested-error-stacks";
import {
  addUrl,
  mockSolidDatasetFrom,
  mockThingFrom,
  setThing,
} from "@inrupt/solid-client";
import {
  generateErrorURL,
  getError,
  getErrorTranslationURL,
  isError,
} from "./index";
import mockResourceBundle, {
  errorsIndexURL,
  translationsIndexURL,
} from "../../../__testUtils/mockResourceBundle";
import { createSWRResponse } from "../../../__testUtils/mockSWR";
import { chain } from "../../utils";
import { getAppTerm } from "../appIndex";
import { generateTranslationURL } from "../translation";
import { appVocabURL } from "../../../__testUtils/mockAppIndexDataset";

const resourceBundle = mockResourceBundle();
const id = "test";

describe("generateErrorURL", () => {
  it("creates an url out of an id", () =>
    expect(generateErrorURL("test", resourceBundle, "global")).toEqual(
      `${errorsIndexURL}#test`
    ));
});

describe("getError", () => {
  const error = new Error();

  it("generates a nested error", () =>
    expect(getError(id, resourceBundle, error)).toEqual(
      new NestedError(generateErrorURL(id, resourceBundle), error)
    ));
});

describe("isError", () => {
  const error = getError(id, resourceBundle);

  it("checks whether an error is a given error id", () => {
    expect(isError(error, id, resourceBundle)).toBe(true);
    expect(isError(new Error(), id, resourceBundle)).toBe(false);
  });
});

describe("getErrorTranslationURL", () => {
  it("returns a translation URL for a error URL", () => {
    const errorURL = generateErrorURL("test", {
      errorsIndexURL: { global: errorsIndexURL },
    });
    const translationURL = generateTranslationURL("test", {
      translationsIndexURL: { global: translationsIndexURL },
    });
    const bundle = mockResourceBundle({
      errorsIndexSWR: {
        global: createSWRResponse(
          chain(mockSolidDatasetFrom(errorsIndexURL), (d) =>
            setThing(
              d,
              chain(mockThingFrom(errorURL), (t) =>
                addUrl(
                  t,
                  getAppTerm("translation", appVocabURL),
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
    const errorURL = generateErrorURL("test", {
      errorsIndexURL: { global: errorsIndexURL },
    });
    const bundle = mockResourceBundle({
      errorsIndexSWR: {
        global: createSWRResponse(null),
      },
    });
    expect(getErrorTranslationURL(errorURL, bundle)).toBeNull();
  });

  it("returns null if error url does not exist", () => {
    expect(getErrorTranslationURL("test", resourceBundle)).toBeNull();
  });
});
