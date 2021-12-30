import {
  mockSolidDatasetFrom,
  mockThingFrom,
  setStringWithLocale,
  setThing,
  setUrl,
} from "@inrupt/solid-client";
import { rdf, rdfs, skos } from "rdf-namespaces";
import {
  extendFluentBundle,
  getFluentBundles,
  getLocale,
  updateAppWithLocale,
} from "./index";
import mockApp, { globalLocalizationsURL } from "../../../__testUtils/mockApp";
import { chain } from "../../utils";
import {
  getFailedMessage,
  getMessage,
  getTranslationURL,
} from "../translation";
import { defaultLocale } from "../../../__testUtils/mockLanguage";
import mockResourceBundleMap from "../../../__testUtils/mockResourceBundleMap";
import mockFluentBundle from "../../../__testUtils/mockFluentBundle";

describe("getLanguages", () => {
  it("returns the available languages", () => {
    expect(getLocale(defaultLocale)).toEqual(defaultLocale);
  });
});

describe("getFluentBundles", () => {
  it("returns fluent bundles in an app", () => {
    const app = mockApp();
    const { fluentBundles } = app;
    expect(getFluentBundles(app)).toEqual([fluentBundles[app.currentLocale]]);
  });
});

describe("extendFluentBundle", () => {
  it("gets all bundles for a given locale", () => {
    const resourceBundles = mockResourceBundleMap();
    const message1 = chain(
      mockThingFrom(
        getTranslationURL("message1", {
          currentLocale: defaultLocale,
          resourceBundles,
        })
      ),
      (t) => setUrl(t, rdf.type, rdfs.Literal),
      (t) => setStringWithLocale(t, skos.definition, "Test", defaultLocale)
    );
    const message2 = chain(
      mockThingFrom(
        getTranslationURL("message2", {
          currentLocale: defaultLocale,
          resourceBundles,
        })
      ),
      (t) => setUrl(t, rdf.type, rdfs.Literal)
    );
    const dataset = chain(
      mockSolidDatasetFrom(globalLocalizationsURL),
      (d) => setThing(d, message1),
      (d) => setThing(d, message2)
    );
    const fluentBundle = extendFluentBundle(defaultLocale, dataset);
    const app = mockApp({
      fluentBundles: {
        [defaultLocale]: fluentBundle,
      },
    });
    expect(getMessage(app, "message1")).toEqual("Test");
    expect(getMessage(app, "message2")).toEqual(
      getFailedMessage(
        getTranslationURL("message2", {
          currentLocale: defaultLocale,
          resourceBundles,
        })
      )
    );
  });

  it("handles when dataset is null", () => {
    const existingFluentBundle = mockFluentBundle();
    expect(extendFluentBundle(defaultLocale, null, existingFluentBundle)).toBe(
      existingFluentBundle
    );
  });
});

describe("updateAppWithLocale", () => {
  it("sets new locale to an app", () => {
    const app = mockApp();
    const newLocale = "nb-NO";
    expect(updateAppWithLocale(app, newLocale).currentLocale).toEqual(
      newLocale
    );
  });
});
