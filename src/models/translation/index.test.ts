import * as solidClientFns from "@inrupt/solid-client";
import {
  getThingAll,
  mockSolidDatasetFrom,
  mockThingFrom,
  setStringWithLocale,
  setThing,
  setUrl,
} from "@inrupt/solid-client";
import { rdf, rdfs, skos } from "rdf-namespaces";
import NestedError from "nested-error-stacks";
import {
  generateTranslationUrl,
  getDefaultBundle,
  getFailedMessage,
  getMessage,
  getTranslationBundleAll,
  getTranslationId,
  getTranslationsDataset,
} from "./index";
import translationsTurtle from "../../../public/data/translations.ttl";
import { chain } from "../../utils";
import mockFluentBundle from "../../../__testUtils/mockFluentBundle";
import { generateErrorUrl } from "../error";
import mockAppConfig from "../../../__testUtils/mockAppConfig";

const appConfig = mockAppConfig();
const { translationsUrl } = appConfig;

describe("getDefaultBundle", () => {
  it("picks the first available bundle", () =>
    expect(getDefaultBundle([42, 1337])).toEqual(42));
});

describe("getTranslationId", () => {
  it("converts a url to safe string for Fluent", () =>
    expect(getTranslationId("http://example.com/test/me#more")).toEqual(
      "http---example-com-test-me-more"
    ));
});

describe("generateTranslationUrl", () => {
  it("creates an url out of an id", () =>
    expect(generateTranslationUrl("test", translationsUrl)).toEqual(
      `${translationsUrl}#test`
    ));
});

describe("getMessage", () => {
  const id = "test";

  it("returns a message from a bundle", () => {
    const message = "Test";
    const bundle = mockFluentBundle(translationsUrl, {
      [id]: message,
    });
    expect(getMessage(translationsUrl, bundle, id)).toEqual(message);
  });

  it("supports interpolation", () => {
    const bundle = mockFluentBundle(translationsUrl, {
      [id]: "{$test}",
    });
    expect(
      getMessage(translationsUrl, bundle, id, {
        test: 42,
      })
    ).toContain("42");
  });

  it("supports fallback if translation does not exist", () => {
    const bundle = mockFluentBundle(translationsUrl);
    expect(getMessage(translationsUrl, bundle, id)).toEqual(
      `[Translation for ${generateTranslationUrl(
        id,
        translationsUrl
      )} does not exist]`
    );
  });
});

describe("getTranslationsDataset", () => {
  it("sets a custom fetch to getSolidDataset", async () => {
    const dataset = await getTranslationsDataset(translationsUrl);
    expect(getThingAll(dataset).length).toEqual(
      translationsTurtle.match(/rdfs:Literal/g)?.length
    );
  });
});

describe("getTranslationBundleAll", () => {
  it("gets all bundles for a given locale", async () => {
    const message1 = chain(
      mockThingFrom(generateTranslationUrl("message1", translationsUrl)),
      (t) => setUrl(t, rdf.type, rdfs.Literal),
      (t) => setStringWithLocale(t, skos.definition, "Test", "en-US")
    );
    const message2 = chain(
      mockThingFrom(generateTranslationUrl("message2", translationsUrl)),
      (t) => setUrl(t, rdf.type, rdfs.Literal)
    );
    const dataset = chain(
      mockSolidDatasetFrom(translationsUrl),
      (d) => setThing(d, message1),
      (d) => setThing(d, message2)
    );
    jest.spyOn(solidClientFns, "getSolidDataset").mockResolvedValue(dataset);
    const bundles = await getTranslationBundleAll(["en-US"], appConfig);
    expect(bundles).toHaveLength(1);
    const defaultBundle = getDefaultBundle(bundles);
    expect(getMessage(translationsUrl, defaultBundle, "message1")).toEqual(
      "Test"
    );
    expect(getMessage(translationsUrl, defaultBundle, "message2")).toEqual(
      getFailedMessage(generateTranslationUrl("message2", translationsUrl))
    );
  });

  it("throws custom error if anything goes wrong", async () => {
    const error = new Error();
    jest.spyOn(solidClientFns, "getSolidDataset").mockImplementation(() => {
      throw error;
    });
    await expect(getTranslationBundleAll(["en-US"], appConfig)).rejects.toEqual(
      new NestedError(
        generateErrorUrl("translationsLoadFailed", translationsUrl),
        error
      )
    );
  });
});
