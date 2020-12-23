import { mockSolidDatasetFrom, setThing } from "@inrupt/solid-client";
import mockApp, {
  faqsURL,
  mockUnloadedApp,
} from "../../../__testUtils/mockApp";
import { chain } from "../../utils";
import {
  getFAQ,
  getFAQAll,
  getFAQDescriptionURL,
  getFAQDetails,
  getFAQLabelUrl,
} from "./index";
import { getMessage } from "../translation";
import mockResourceBundleMap from "../../../__testUtils/mockResourceBundleMap";
import mockFAQThing, {
  faqDescriptionURL,
  faqId,
  faqLabelURL,
} from "../../../__testUtils/mockFAQThing";
import { defaultBundle } from "../../../__testUtils/mockResourceBundle";

const faq = mockFAQThing();
const app = mockApp();

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
    const unloadedApp = mockUnloadedApp();
    expect(getFAQAll(unloadedApp)).toEqual([]);
  });
});

describe("getFAQDescriptionURL", () => {
  it("returns the translation URL for FAQs description", () => {
    expect(getFAQDescriptionURL(faq, app)).toEqual(faqDescriptionURL);
  });
});

describe("getFAQLabelURL", () => {
  it("returns the translation URL for FAQs label", () => {
    expect(getFAQLabelUrl(faq, app)).toEqual(faqLabelURL);
  });
});

describe("getFAQDetails", () => {
  it("prepares a model from a FAQ thing", () => {
    expect(getFAQDetails(faq, app)).toEqual({
      label: getMessage(app, getFAQLabelUrl(faq, app)),
      description: getMessage(app, getFAQDescriptionURL(faq, app)),
    });
  });
});

describe("getFAQ", () => {
  it("prepares a model from a FAQ id", () => {
    expect(getFAQ(faqId, app)).toEqual({
      label: getMessage(app, getFAQLabelUrl(faq, app)),
      description: getMessage(app, getFAQDescriptionURL(faq, app)),
    });
  });

  it("can specify which bundle the FAQ is in", () => {
    expect(getFAQ(faqId, app, defaultBundle)).toEqual({
      label: getMessage(app, getFAQLabelUrl(faq, app)),
      description: getMessage(app, getFAQDescriptionURL(faq, app)),
    });
  });
});
