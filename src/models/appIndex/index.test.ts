import { mockSolidDatasetFrom } from "@inrupt/solid-client";
import { getAppTerm, packageAppIndex } from "./index";
import mockAppIndexDataset, {
  appIndexURL,
  appVocabURL,
} from "../../../__testUtils/mockAppIndexDataset";
import { currentLocales } from "../translation";
import {
  errorsIndexURL,
  faqIndexURL,
  localizedIndexURL,
  translationsIndexURL,
} from "../../../__testUtils/mockApp";

describe("getAppTerm", () => {
  it("generates a URL", () =>
    expect(getAppTerm("test", { appVocabURL })).toEqual(`${appVocabURL}#test`));
});

describe("packageAppIndex", () => {
  it("packages AppIndexModel from appIndexDataset", () => {
    const dataset = mockAppIndexDataset();
    expect(
      packageAppIndex(dataset, appIndexURL, currentLocales, appVocabURL)
    ).toEqual({
      resourceBundleAll: [
        {
          label: "global",
          errorsIndexURL,
          faqIndexURL,
          localizedIndexURL,
          translationsIndexURL,
        },
      ],
    });
  });

  it("handles empty datasets", () => {
    const dataset = mockSolidDatasetFrom("https://example.com/");
    expect(
      packageAppIndex(dataset, appIndexURL, currentLocales, appVocabURL)
    ).toEqual({
      resourceBundleAll: [],
    });
  });
});
