import { mockSolidDatasetFrom } from "@inrupt/solid-client";
import { ResourceBundleModel } from "../src/models/resourceBundle";
import mockFluentBundle from "./mockFluentBundle";
import { createSWRResponse } from "./mockSWR";
import { appVocabURL } from "./mockAppIndexDataset";

export const errorsIndexURL = "https://example.com/errors.ttl";
export const faqIndexURL = "https://example.com/faq.ttl";
export const translationsIndexURL = "https://example.com/translations.ttl";
export const localizedIndexURL = "https://example.com/translations.en-US.ttl";

export default function mockResourceBundle(
  overrides: Partial<ResourceBundleModel> = {}
): ResourceBundleModel {
  return {
    appVocabURL,
    bundleNames: ["global"],
    currentLanguage: "en-US",
    errorsIndexURL: { global: errorsIndexURL },
    errorsIndexSWR: {
      global: createSWRResponse(mockSolidDatasetFrom(errorsIndexURL)),
    },
    faqIndexURL: { global: faqIndexURL },
    faqIndexSWR: {
      global: createSWRResponse(mockSolidDatasetFrom(faqIndexURL)),
    },
    fluentBundles: {
      global: [mockFluentBundle({}, "en-US")],
    },
    localizedIndexURL: { global: localizedIndexURL },
    localizedIndexSWR: {
      global: createSWRResponse(mockSolidDatasetFrom(faqIndexURL)),
    },
    translationsIndexURL: { global: translationsIndexURL },
    translationsIndexSWR: {
      global: createSWRResponse(mockSolidDatasetFrom(translationsIndexURL)),
    },
    ...overrides,
  };
}
