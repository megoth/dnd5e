import useSWR from "swr";
import { useEffect, useState } from "react";
import NestedError from "nested-error-stacks";
import useAppIndex from "../useAppIndex";
import { getLanguages } from "../../models/language";
import useDataset from "../useDataset";
import useFluentBundles from "../useFluentBundles";
import { ResourceBundleModel } from "../../models/resourceBundle";
import { currentLanguage } from "../../models/translation";
import useLanguages from "../useLanguages";

export const swrConfig = {
  errorRetryCount: 0,
};

export default function useResourceBundleLoader(
  bundleName: string,
  appIndexURL,
  appVocabURL
) {
  const languages = useLanguages();
  const currentLocales = getLanguages(currentLanguage, languages);
  const { data: appIndex, error: appIndexError } = useAppIndex(
    currentLocales,
    appIndexURL,
    appVocabURL
  );
  const [bundleModel, setBundleModel] = useState<ResourceBundleModel>({
    appVocabURL,
    bundleNames: [],
    currentLanguage,
    errorsIndexSWR: {},
    errorsIndexURL: {},
    faqIndexSWR: {},
    faqIndexURL: {},
    fluentBundles: {},
    localizedIndexSWR: {},
    localizedIndexURL: {},
    translationsIndexSWR: {},
    translationsIndexURL: {},
  });
  const [errorsIndexURL, setErrorsIndexURL] = useState<string>();
  const errorsIndexSWR = useDataset(errorsIndexURL, [bundleModel], swrConfig);
  const [faqIndexURL, setFaqIndexURL] = useState<string>();
  const faqIndexSWR = useDataset(faqIndexURL, [bundleModel], swrConfig);
  const [translationsIndexURL, setTranslationsIndexURL] = useState<string>();
  const translationsIndexSWR = useDataset(
    translationsIndexURL,
    [bundleModel],
    swrConfig
  );
  const [localizedIndexURL, setLocalizedIndexURL] = useState<string>();
  const localizedIndexSWR = useDataset(
    localizedIndexURL,
    [bundleModel],
    swrConfig
  );
  const fluentBundles = useFluentBundles(localizedIndexSWR, currentLocales);
  useEffect(() => {
    if (bundleModel.bundleNames.indexOf(bundleName) !== -1 || appIndexError) {
      return;
    }
    setBundleModel({
      ...bundleModel,
      bundleNames: bundleModel.bundleNames.concat(bundleName),
    });
  }, [appIndexError, bundleModel, bundleModel.bundleNames, bundleName]);
  return useSWR(
    [
      bundleModel.bundleNames,
      bundleName,
      appIndex,
      errorsIndexSWR,
      faqIndexSWR,
      translationsIndexSWR,
      localizedIndexSWR,
      fluentBundles,
    ],
    () => {
      if (appIndexError) {
        throw new NestedError("Unable to load resource bundle", appIndexError);
      }
      if (!appIndex) {
        return null;
      }
      const bundle = appIndex.resourceBundleAll.find(
        ({ label }) => label === bundleName
      );
      if (!bundle) {
        return null;
      }
      if (errorsIndexURL !== bundle.errorsIndexURL) {
        setErrorsIndexURL(bundle.errorsIndexURL);
      }
      if (faqIndexURL !== bundle.faqIndexURL) {
        setFaqIndexURL(bundle.faqIndexURL);
      }
      if (translationsIndexURL !== bundle.translationsIndexURL) {
        setTranslationsIndexURL(bundle.translationsIndexURL);
      }
      if (localizedIndexURL !== bundle.localizedIndexURL) {
        setLocalizedIndexURL(bundle.localizedIndexURL);
      }
      return fluentBundles
        ? {
            appVocabURL,
            bundleNames: bundleModel.bundleNames,
            currentLanguage: bundleModel.currentLanguage,
            errorsIndexSWR: {
              ...bundleModel.errorsIndexSWR,
              [bundleName]: errorsIndexSWR,
            },
            errorsIndexURL: {
              ...bundleModel.errorsIndexURL,
              [bundleName]: errorsIndexURL,
            },
            faqIndexSWR: {
              ...bundleModel.faqIndexSWR,
              [bundleName]: faqIndexSWR,
            },
            faqIndexURL: {
              ...bundleModel.faqIndexURL,
              [bundleName]: faqIndexURL,
            },
            fluentBundles: {
              ...bundleModel.fluentBundles,
              [bundleName]: fluentBundles,
            },
            localizedIndexSWR: {
              ...bundleModel.localizedIndexSWR,
              [bundleName]: localizedIndexSWR,
            },
            localizedIndexURL: {
              ...bundleModel.localizedIndexURL,
              [bundleName]: localizedIndexURL,
            },
            translationsIndexSWR: {
              ...bundleModel.translationsIndexSWR,
              [bundleName]: translationsIndexSWR,
            },
            translationsIndexURL: {
              ...bundleModel.translationsIndexURL,
              [bundleName]: translationsIndexURL,
            },
          }
        : null;
    },
    swrConfig
  );
}
