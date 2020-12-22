import {
  getStringNoLocale,
  getThing,
  getUrl,
  getUrlAll,
} from "@inrupt/solid-client";
import { rdfs } from "rdf-namespaces";
import { chain } from "../../utils";
import { ResourceBundleIndex } from "../resourceBundleIndex";
import { LanguageModel } from "../language";

export type AppIndex = {
  resourceBundleAll: Array<ResourceBundleIndex>;
  supportLanguage: Array<LanguageModel>;
};

export function getAppTerm(alias, { appVocabURL }) {
  return `${appVocabURL}#${alias}`;
}

export function packageAppIndex(
  appIndexDataset,
  appIndexURL,
  appVocabURL
): AppIndex {
  const appIndex = getThing(appIndexDataset, appIndexURL);
  const supportLanguage = appIndex
    ? getUrlAll(appIndex, getAppTerm("supportLanguage", { appVocabURL }))
        .map((languageUrl) => getThing(appIndexDataset, languageUrl))
        .map((language) => ({
          languageCode: getStringNoLocale(
            language,
            getAppTerm("language", { appVocabURL })
          ),
          languageFlag: getStringNoLocale(
            language,
            getAppTerm("languageFlag", { appVocabURL })
          ),
          translationUrl: getUrl(
            language,
            getAppTerm("translation", { appVocabURL })
          ),
        }))
    : [];
  return {
    resourceBundleAll: appIndex
      ? getUrlAll(appIndex, getAppTerm("resourceBundle", { appVocabURL }))
          .map((bundleURL) => getThing(appIndexDataset, bundleURL))
          .map((resourceBundle) => {
            const label = getStringNoLocale(resourceBundle, rdfs.label);
            const translationsIndexAll = getUrlAll(
              resourceBundle,
              getAppTerm("translationsIndex", { appVocabURL })
            ).map((translationURL) =>
              getThing(appIndexDataset, translationURL)
            );
            return supportLanguage.map(({ languageCode }) => ({
              label,
              locale: languageCode,
              urls: {
                errors: getUrl(
                  resourceBundle,
                  getAppTerm("errorsIndex", { appVocabURL })
                ),
                faqs: getUrl(
                  resourceBundle,
                  getAppTerm("faqIndex", { appVocabURL })
                ),
                localizations: chain(
                  translationsIndexAll.find(
                    (translation) =>
                      getStringNoLocale(
                        translation,
                        getAppTerm("language", { appVocabURL })
                      ) === languageCode
                  ),
                  (index) =>
                    getUrl(index, getAppTerm("resource", { appVocabURL }))
                ),
                translations: chain(
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
              },
            }));
          })
          .flat()
      : [],
    supportLanguage,
  };
}
