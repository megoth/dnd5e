import {
  mockSolidDatasetFrom,
  mockThingFrom,
  setThing,
  setUrl,
} from "@inrupt/solid-client";
import { rdf } from "rdf-namespaces";
import mockResourceBundle, {
  faqIndexURL,
  translationsIndexURL,
} from "../../../__testUtils/mockResourceBundle";
import { createSWRResponse } from "../../../__testUtils/mockSWR";
import { chain } from "../../utils";
import {
  generateFAQURL,
  getFAQAll,
  getFAQDescriptionURL,
  getFAQLabelId,
} from "./index";
import { getAppTerm } from "../appIndex";
import { getTranslationURL, getTranslationId } from "../translation";
import { appVocabURL } from "../../../__testUtils/mockAppIndexDataset";

const faqURL = generateFAQURL("test", {
  faqIndexURL: { global: faqIndexURL },
});
const faqLabelURL = getTranslationURL("label", {
  translationsIndexURL: { global: translationsIndexURL },
});
const faqDescriptionURL = getTranslationURL("description", {
  translationsIndexURL: { global: translationsIndexURL },
});
const faq = chain(
  mockThingFrom(faqURL),
  (t) => setUrl(t, rdf.type, getAppTerm("FAQ", appVocabURL)),
  (t) => setUrl(t, getAppTerm("faqLabel", appVocabURL), faqLabelURL),
  (t) => setUrl(t, getAppTerm("faqDescription", appVocabURL), faqDescriptionURL)
);

describe("generateFAQURL", () => {
  it("generates a FAQ URL", () => {
    expect(
      generateFAQURL("test", { faqIndexURL: { global: faqIndexURL } }, "global")
    ).toEqual(`${faqIndexURL}#test`);
  });
});

describe("getFAQAll", () => {
  it("returns an array of all available FAQs in a resource bundle", () => {
    const bundle = mockResourceBundle({
      faqIndexSWR: {
        global: createSWRResponse(
          chain(mockSolidDatasetFrom(faqIndexURL), (d) => setThing(d, faq))
        ),
      },
    });
    expect(getFAQAll(bundle, "global")).toEqual([faq]);
  });

  it("returns an empty array if resource bundle is not available", () => {
    const bundle = mockResourceBundle({
      faqIndexSWR: {
        global: createSWRResponse(null),
      },
    });
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
    expect(getFAQLabelId(faq, { appVocabURL })).toEqual(
      getTranslationId(faqLabelURL)
    );
  });
});
