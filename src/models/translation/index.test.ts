import { FluentBundle, FluentResource } from "@fluent/bundle";
import * as solidClientFns from "@inrupt/solid-client";
import {
  mockSolidDatasetFrom,
  mockThingFrom,
  setStringWithLocale,
  setThing,
  setUrl,
} from "@inrupt/solid-client";
import { rdf, skos, rdfs } from "rdf-namespaces";
import {
  getDefaultBundle,
  getMessage,
  getTranslationBundleAll,
  getTranslationId,
  getTranslationsDataset,
  getTranslationUrl,
  translationDatasetUrl,
} from "./index";
import { mockedDataset } from "../../../__testUtils/mockDataset";
import translationsTurtle from "../../../data/translations.ttl";
import { chain } from "../../utils";

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

describe("getTranslationUrl", () => {
  it("creates an url out of an id", () =>
    expect(getTranslationUrl("test")).toEqual(`${translationDatasetUrl}#test`));
});

describe("getMessage", () => {
  const id = "test";
  const translationUrl = getTranslationUrl(id);
  const translationId = getTranslationId(translationUrl);

  it("returns a message from a bundle", () => {
    const message = "Test";
    const bundle = new FluentBundle("en");
    bundle.addResource(new FluentResource(`${translationId} = ${message}`));
    expect(getMessage(bundle, id)).toEqual(message);
  });

  it("supports interpolation", () => {
    const bundle = new FluentBundle("en");
    bundle.addResource(new FluentResource(`${translationId} = {$test}`));
    expect(
      getMessage(bundle, id, {
        test: 42,
      })
    ).toContain("42");
  });

  it("supports fallback if translation does not exist", () => {
    const bundle = new FluentBundle("en");
    expect(getMessage(bundle, id)).toEqual(
      `[Translation for ${translationUrl} does not exist]`
    );
  });
});

describe("getTranslationsDataset", () => {
  it("sets a custom fetch to getSolidDataset", async () => {
    const dataset = mockedDataset;
    const mockedGetter = jest
      .spyOn(solidClientFns, "getSolidDataset")
      .mockResolvedValue(dataset);
    await expect(getTranslationsDataset()).resolves.toBe(dataset);
    const fetch = mockedGetter.mock.calls[0][1].fetch as Function;
    const response = fetch();
    await expect(response).resolves.toEqual(
      new Response(translationsTurtle, {
        headers: new Headers({
          "Content-Type": "text/turtle",
        }),
      })
    );
  });
});

describe("getTranslationBundleAll", () => {
  it("gets all bundles for a given locale", async () => {
    const message1 = chain(
      mockThingFrom(getTranslationUrl("message1")),
      (t) => setUrl(t, rdf.type, rdfs.Literal),
      (t) => setStringWithLocale(t, skos.definition, "Test", "en-US")
    );
    const message2 = chain(mockThingFrom(getTranslationUrl("message2")), (t) =>
      setUrl(t, rdf.type, rdfs.Literal)
    );
    const dataset = chain(
      mockSolidDatasetFrom(translationDatasetUrl),
      (d) => setThing(d, message1),
      (d) => setThing(d, message2)
    );
    jest.spyOn(solidClientFns, "getSolidDataset").mockResolvedValue(dataset);
    const bundles = await getTranslationBundleAll(["en-US"]);
    expect(bundles).toHaveLength(1);
    const defaultBundle = getDefaultBundle(bundles);
    expect(getMessage(defaultBundle, "message1")).toEqual("Test");
  });
});
