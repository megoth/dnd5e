import { mockSolidDatasetFrom } from "@inrupt/solid-client";
import { getAppTerm, packageAppIndex } from "./index";
import mockAppIndexDataset, {
  appIndexURL,
  appVocabURL,
  translationLanguageEnUS,
} from "../../../__testUtils/mockAppIndexDataset";
import {
  errorsURL,
  faqsURL,
  localizationsURL,
  translationsURL,
} from "../../../__testUtils/mockApp";
import mockLanguage, { defaultLocale } from "../../../__testUtils/mockLanguage";
import { defaultBundle } from "../../../__testUtils/mockResourceBundle";

describe("getAppTerm", () => {
  it("generates a URL", () =>
    expect(getAppTerm("test", { appVocabURL })).toEqual(`${appVocabURL}#test`));
});

describe("packageAppIndex", () => {
  it("packages AppIndexModel from appIndexDataset", () => {
    const dataset = mockAppIndexDataset();
    expect(packageAppIndex(dataset, appIndexURL, appVocabURL)).toEqual({
      resourceBundleAll: [
        {
          label: defaultBundle,
          locale: defaultLocale,
          urls: {
            errors: errorsURL,
            faqs: faqsURL,
            localizations: localizationsURL,
            translations: translationsURL,
          },
        },
      ],
      supportLanguage: [
        mockLanguage(defaultLocale, {
          translationUrl: translationLanguageEnUS,
        }),
      ],
    });
  });

  it("handles empty datasets", () => {
    const dataset = mockSolidDatasetFrom("https://example.com/");
    expect(packageAppIndex(dataset, appIndexURL, appVocabURL)).toEqual({
      resourceBundleAll: [],
      supportLanguage: [],
    });
  });
});
