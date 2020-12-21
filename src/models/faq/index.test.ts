import {
  mockSolidDatasetFrom,
  mockThingFrom,
  setThing,
  setUrl,
} from "@inrupt/solid-client";
import { rdf } from "rdf-namespaces";
import mockApp, { faqsURL } from "../../../__testUtils/mockApp";
import { chain } from "../../utils";
import { getFAQAll, getFAQDescriptionURL, getFAQLabelUrl } from "./index";
import { getAppTerm } from "../appIndex";
import { getTranslationURL } from "../translation";
import { appVocabURL } from "../../../__testUtils/mockAppIndexDataset";
import { defaultLocale } from "../../../__testUtils/mockLanguage";
import mockResourceBundleMap from "../../../__testUtils/mockResourceBundleMap";

const faqURL = `${faqsURL}#test`;
const resourceBundles = mockResourceBundleMap();
const faqLabelURL = getTranslationURL("label", {
  currentLocale: defaultLocale,
  resourceBundles,
});
const faqDescriptionURL = getTranslationURL("description", {
  currentLocale: defaultLocale,
  resourceBundles,
});
const faq = chain(
  mockThingFrom(faqURL),
  (t) => setUrl(t, rdf.type, getAppTerm("FAQ", { appVocabURL })),
  (t) => setUrl(t, getAppTerm("faqLabel", { appVocabURL }), faqLabelURL),
  (t) =>
    setUrl(t, getAppTerm("faqDescription", { appVocabURL }), faqDescriptionURL)
);

describe("getFAQAll", () => {
  it("returns an array of all available FAQs in an app", () => {
    const bundle = mockApp({
      resourceBundles: mockResourceBundleMap({
        data: {
          faqs: chain(mockSolidDatasetFrom(faqsURL), (d) => setThing(d, faq)),
        },
      }),
    });
    expect(getFAQAll(bundle, "global")).toEqual([faq]);
  });

  it("returns an empty array if app is not available", () => {
    const bundle = mockApp();
    expect(getFAQAll(bundle)).toEqual([]);
  });
});

describe("getFAQDescriptionURL", () => {
  it("returns the translation URL for FAQs description", () => {
    expect(getFAQDescriptionURL(faq, { appVocabURL })).toEqual(
      faqDescriptionURL
    );
  });
});

describe("getFAQLabelURL", () => {
  it("returns the translation URL for FAQs label", () => {
    expect(getFAQLabelUrl(faq, { appVocabURL })).toEqual(faqLabelURL);
  });
});
