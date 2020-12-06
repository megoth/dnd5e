import {
  getStringNoLocale,
  getThing,
  getUrl,
  getUrlAll,
  SolidDataset,
} from "@inrupt/solid-client";
import { rdfs } from "rdf-namespaces";
import { chain } from "../../utils";

export type AppIndex = {
  resourceBundleAll: Array<{
    label: string;
    errorsIndexURL: string;
    faqIndexURL: string;
    localizedIndexURL: string;
    translationsIndexURL: string;
  }>;
};

export function getAppTerm(alias, { appVocabURL }) {
  return `${appVocabURL}#${alias}`;
}

export function packageAppIndex(
  appIndexDataset: SolidDataset,
  appIndexURL: string,
  currentLocales: string[],
  appVocabURL: string
): AppIndex {
  const appIndex = getThing(appIndexDataset, appIndexURL);
  return {
    resourceBundleAll: appIndex
      ? getUrlAll(appIndex, getAppTerm("resourceBundle", { appVocabURL }))
          .map((bundleURL) => getThing(appIndexDataset, bundleURL))
          .map((resourceBundle) => {
            const translationsIndexAll = getUrlAll(
              resourceBundle,
              getAppTerm("translationsIndex", { appVocabURL })
            ).map((translationURL) =>
              getThing(appIndexDataset, translationURL)
            );
            return {
              label: getStringNoLocale(resourceBundle, rdfs.label),
              errorsIndexURL: getUrl(
                resourceBundle,
                getAppTerm("errorsIndex", { appVocabURL })
              ),
              faqIndexURL: getUrl(
                resourceBundle,
                getAppTerm("faqIndex", { appVocabURL })
              ),
              localizedIndexURL: chain(
                translationsIndexAll.find(
                  (translation) =>
                    currentLocales.indexOf(
                      getStringNoLocale(
                        translation,
                        getAppTerm("language", { appVocabURL })
                      )
                    ) !== -1
                ),
                (index) =>
                  getUrl(index, getAppTerm("resource", { appVocabURL }))
              ),
              translationsIndexURL: chain(
                translationsIndexAll.find(
                  (translation) =>
                    !getStringNoLocale(
                      translation,
                      getAppTerm("language", { appVocabURL })
                    )
                ),
                (index) =>
                  getUrl(index, getAppTerm("resource", { appVocabURL }))
              ),
            };
          })
      : [],
  };
}
