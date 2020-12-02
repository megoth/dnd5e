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
import { FluentBundle } from "@fluent/bundle";
import {
  getDefaultTranslationBundle,
  getFailedMessage,
  getMessage,
  getTranslationBundleAll,
  getTranslationId,
  getTranslationsDataset,
} from "./index";
import translationsTurtle from "../../../public/data/translations.ttl";
import { chain } from "../../utils";
import mockResourceBundle from "../../../__testUtils/mockResourceBundle";
import mockFluentBundle from "../../../__testUtils/mockFluentBundle";
import { generateUrl } from "../error";
import { generateTranslationUrl } from "../resourceBundle";

const resourceBundle = mockResourceBundle();
const { translationsUrl } = resourceBundle;

describe("getDefaultBundle", () => {
  it("picks the first available bundle", () => {
    const bundle1 = new FluentBundle("en-US");
    const bundle2 = new FluentBundle("en");
    expect(getDefaultTranslationBundle([bundle1, bundle2])).toEqual(bundle1);
  });
});

describe("getTranslationId", () => {
  it("converts a url to safe string for Fluent", () =>
    expect(getTranslationId("http://example.com/test/me#more")).toEqual(
      "http---example-com-test-me-more"
    ));
});

describe("generateTranslationUrl", () => {
  it("creates an url out of an id", () =>
    expect(generateTranslationUrl("test", resourceBundle)).toEqual(
      `${translationsUrl}#test`
    ));
});

describe("getMessage", () => {
  const id = "test";

  it("returns a message from a bundle", () => {
    const message = "Test";
    const mockedFluentBundle = mockFluentBundle(translationsUrl, {
      [id]: message,
    });
    const mockedResourceBundle = mockResourceBundle({
      translationBundles: [mockedFluentBundle],
    });
    expect(getMessage(mockedResourceBundle, id)).toEqual(message);
  });

  it("supports interpolation", () => {
    const mockedFluentBundle = mockFluentBundle(translationsUrl, {
      [id]: "{$test}",
    });
    const mockedResourceBundle = mockResourceBundle({
      translationBundles: [mockedFluentBundle],
    });
    expect(
      getMessage(mockedResourceBundle, id, {
        test: 42,
      })
    ).toContain("42");
  });

  it("supports fallback if translation does not exist", () => {
    expect(getMessage(resourceBundle, id)).toEqual(
      `[Translation for ${generateTranslationUrl(
        id,
        resourceBundle
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
      mockThingFrom(generateTranslationUrl("message1", resourceBundle)),
      (t) => setUrl(t, rdf.type, rdfs.Literal),
      (t) => setStringWithLocale(t, skos.definition, "Test", "en-US")
    );
    const message2 = chain(
      mockThingFrom(generateTranslationUrl("message2", resourceBundle)),
      (t) => setUrl(t, rdf.type, rdfs.Literal)
    );
    const dataset = chain(
      mockSolidDatasetFrom(translationsUrl),
      (d) => setThing(d, message1),
      (d) => setThing(d, message2)
    );
    jest.spyOn(solidClientFns, "getSolidDataset").mockResolvedValue(dataset);
    const bundles = await getTranslationBundleAll(["en-US"], resourceBundle);
    expect(bundles).toHaveLength(1);

    const mockedResourceBundle = mockResourceBundle({
      translationBundles: bundles,
    });
    expect(getMessage(mockedResourceBundle, "message1")).toEqual("Test");
    expect(getMessage(mockedResourceBundle, "message2")).toEqual(
      getFailedMessage(generateTranslationUrl("message2", resourceBundle))
    );
  });

  it("throws custom error if anything goes wrong", async () => {
    const error = new Error();
    jest.spyOn(solidClientFns, "getSolidDataset").mockImplementation(() => {
      throw error;
    });
    await expect(
      getTranslationBundleAll(["en-US"], resourceBundle)
    ).rejects.toEqual(
      new NestedError(
        generateUrl("translationsLoadFailed", resourceBundle.errorsUrl),
        error
      )
    );
  });
});
