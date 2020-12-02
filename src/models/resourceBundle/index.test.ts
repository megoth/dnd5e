import NestedError from "nested-error-stacks";
import { mockThingFrom, setUrl } from "@inrupt/solid-client";
import mockResourceBundle from "../../../__testUtils/mockResourceBundle";
import {
  generateErrorUrl,
  generateTranslationUrl,
  getError,
  isError,
  loadResourceBundle,
} from "./index";
import { generateUrl as getErrorUrl } from "../error";
import * as translationFns from "../translation";
import { chain } from "../../utils";
import { getAppTerm } from "../app";
import mockFluentBundle from "../../../__testUtils/mockFluentBundle";

const errorsUrl = "https://example.com/errors.ttl";
const translationsUrl = "https://example.com/translations.ttl";
const resourceBundle = mockResourceBundle({
  errorsUrl,
  translationsUrl,
});
const id = "test";

describe("generateErrorUrl", () => {
  it("generates a URL", () =>
    expect(generateErrorUrl(id, resourceBundle)).toEqual(
      getErrorUrl(id, errorsUrl)
    ));
});

describe("generateTranslationUrl", () => {
  it("generates a URL", () =>
    expect(generateTranslationUrl(id, resourceBundle)).toEqual(
      translationFns.generateUrl(id, translationsUrl)
    ));
});

describe("getError", () => {
  const error = new Error();

  it("generates a nested error", () =>
    expect(getError(id, resourceBundle, error)).toEqual(
      new NestedError(generateErrorUrl(id, resourceBundle), error)
    ));
});

describe("isError", () => {
  const error = getError(id, resourceBundle);

  it("checks whether an error is a given error id", () => {
    expect(isError(error, id, resourceBundle)).toBe(true);
    expect(isError(new Error(), id, resourceBundle)).toBe(false);
  });
});

describe("loadResourceBundle", () => {
  const bundle = chain(
    mockThingFrom("https://example.com/#bundle"),
    (t) => setUrl(t, getAppTerm("errorsIndex"), errorsUrl),
    (t) => setUrl(t, getAppTerm("translationsIndex"), translationsUrl)
  );
  const translationBundles = [mockFluentBundle(translationsUrl)];

  it("calls getTranslationsBundleAll", async () => {
    jest
      .spyOn(translationFns, "getTranslationBundleAll")
      .mockResolvedValue(translationBundles);
    await expect(loadResourceBundle(bundle)).resolves.toEqual({
      errorsUrl,
      translationBundles,
      translationsUrl,
    });
  });
});
