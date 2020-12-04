import {
  mockSolidDatasetFrom,
  mockThingFrom,
  setStringWithLocale,
  setThing,
  setUrl,
} from "@inrupt/solid-client";
import { rdf, rdfs, skos } from "rdf-namespaces";
import { FluentBundle } from "@fluent/bundle";
import {
  generateTranslationURL,
  getDefaultTranslationBundle,
  getFailedMessage,
  getMessage,
  getTranslationBundleAll,
  getTranslationId,
} from "./index";
import { chain } from "../../utils";
import mockResourceBundle, {
  localizedIndexURL,
  translationsIndexURL,
} from "../../../__testUtils/mockResourceBundle";
import mockFluentBundle from "../../../__testUtils/mockFluentBundle";

describe("getDefaultTranslationBundle", () => {
  it("picks the first available bundle", () => {
    const bundle1 = new FluentBundle("en-US");
    const bundle2 = new FluentBundle("en");
    const resourceBundle = mockResourceBundle({
      fluentBundles: {
        global: [bundle1, bundle2],
      },
    });
    expect(getDefaultTranslationBundle(resourceBundle)).toEqual(bundle1);
  });

  it("returns null if fluent bundles is not available", () => {
    expect(
      getDefaultTranslationBundle({ fluentBundles: { global: null } })
    ).toBeNull();
  });
});

describe("getTranslationId", () => {
  it("converts a url to safe string for Fluent", () =>
    expect(getTranslationId("http://example.com/test/me#more")).toEqual(
      "http---example-com-test-me-more"
    ));
});

describe("generateTranslationURL", () => {
  it("creates an url out of an id", () =>
    expect(
      generateTranslationURL(
        "test",
        {
          translationsIndexURL: { global: translationsIndexURL },
        },
        "global"
      )
    ).toEqual(`${translationsIndexURL}#test`));
});

describe("getMessage", () => {
  const id = "test";

  it("returns a message from a bundle given a translation id", () => {
    const message = "Test";
    const mockedFluentBundle = mockFluentBundle({
      [id]: message,
    });
    const mockedResourceBundle = mockResourceBundle({
      fluentBundles: {
        global: [mockedFluentBundle],
      },
    });
    expect(getMessage(mockedResourceBundle, id, {}, "global")).toEqual(message);
  });

  it("returns a message from a bundle given a translation URL", () => {
    const message = "Test";
    const mockedFluentBundle = mockFluentBundle({
      [id]: message,
    });
    const translationURL = generateTranslationURL(id, {
      translationsIndexURL: { global: translationsIndexURL },
    });
    const mockedResourceBundle = mockResourceBundle({
      fluentBundles: {
        global: [mockedFluentBundle],
      },
    });
    expect(getMessage(mockedResourceBundle, translationURL)).toEqual(message);
  });

  it("supports interpolation", () => {
    const mockedFluentBundle = mockFluentBundle({
      [id]: "{$test}",
    });
    const mockedResourceBundle = mockResourceBundle({
      fluentBundles: {
        global: [mockedFluentBundle],
      },
    });
    expect(
      getMessage(mockedResourceBundle, id, {
        test: 42,
      })
    ).toContain("42");
  });

  it("supports fallback if translation does not exist", () => {
    const resourceBundle = mockResourceBundle();
    expect(getMessage(resourceBundle, id)).toEqual(
      getFailedMessage(generateTranslationURL(id, resourceBundle))
    );
  });

  it("supports fallback if fluent bundles not available", () => {
    const resourceBundle = mockResourceBundle({
      fluentBundles: {
        global: null,
      },
    });
    expect(getMessage(resourceBundle, id)).toEqual(
      getFailedMessage(generateTranslationURL(id, resourceBundle))
    );
  });
});

describe("getTranslationBundleAll", () => {
  it("gets all bundles for a given locale", async () => {
    const message1 = chain(
      mockThingFrom(
        generateTranslationURL("message1", {
          translationsIndexURL: { global: translationsIndexURL },
        })
      ),
      (t) => setUrl(t, rdf.type, rdfs.Literal),
      (t) => setStringWithLocale(t, skos.definition, "Test", "en-US")
    );
    const message2 = chain(
      mockThingFrom(
        generateTranslationURL("message2", {
          translationsIndexURL: { global: translationsIndexURL },
        })
      ),
      (t) => setUrl(t, rdf.type, rdfs.Literal)
    );
    const dataset = chain(
      mockSolidDatasetFrom(localizedIndexURL),
      (d) => setThing(d, message1),
      (d) => setThing(d, message2)
    );
    const bundles = await getTranslationBundleAll(["en-US"], dataset);
    expect(bundles).toHaveLength(1);

    const mockedResourceBundle = mockResourceBundle({
      fluentBundles: {
        global: bundles,
      },
    });
    expect(getMessage(mockedResourceBundle, "message1")).toEqual("Test");
    expect(getMessage(mockedResourceBundle, "message2")).toEqual(
      getFailedMessage(
        generateTranslationURL("message2", {
          translationsIndexURL: { global: translationsIndexURL },
        })
      )
    );
  });
});
