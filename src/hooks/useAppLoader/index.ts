import useSWR, { responseInterface } from "swr";
import { useEffect, useState } from "react";
import NestedError from "nested-error-stacks";
import useAppIndex from "../useAppIndex";
import { getLanguages } from "../../models/language";
import useDataset from "../useDataset";
import useFluentBundles from "../useFluentBundles";
import { AppModel, createApp } from "../../models/app";
import { currentLanguage } from "../../models/translation";
import { getNavigatorLanguages } from "../../windowHelpers";

export const swrConfig = {
  errorRetryCount: 0,
};

export default function useAppLoader(
  bundleName,
  appIndexURL,
  appVocabURL
): responseInterface<AppModel, any> {
  const languages = getNavigatorLanguages();
  const currentLocales = getLanguages(currentLanguage, languages);
  const { data: appIndex, error: appIndexError } = useAppIndex(
    currentLocales,
    appIndexURL,
    appVocabURL
  );
  const [appModel, setAppModel] = useState<AppModel>(createApp(appVocabURL));
  const [errorsIndexURL, setErrorsIndexURL] = useState<string>();
  const errorsIndexSWR = useDataset(errorsIndexURL, [appModel], swrConfig);
  const [faqIndexURL, setFaqIndexURL] = useState<string>();
  const faqIndexSWR = useDataset(faqIndexURL, [appModel], swrConfig);
  const [translationsIndexURL, setTranslationsIndexURL] = useState<string>();
  const translationsIndexSWR = useDataset(
    translationsIndexURL,
    [appModel],
    swrConfig
  );
  const [localizedIndexURL, setLocalizedIndexURL] = useState<string>();
  const localizedIndexSWR = useDataset(
    localizedIndexURL,
    [appModel],
    swrConfig
  );
  const fluentBundles = useFluentBundles(localizedIndexSWR, currentLocales);
  useEffect(() => {
    if (appModel.bundleNames.indexOf(bundleName) !== -1 || appIndexError) {
      return;
    }
    setAppModel({
      ...appModel,
      bundleNames: appModel.bundleNames.concat(bundleName),
    });
  }, [appIndexError, appModel, appModel.bundleNames, bundleName]);
  return useSWR(
    [
      appModel.bundleNames,
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
        throw new NestedError("Unable to load app", appIndexError);
      }
      if (!appIndex) {
        return null;
      }
      const resourceBundle = appIndex.resourceBundleAll.find(
        ({ label }) => label === bundleName
      );
      if (!resourceBundle) {
        return null;
      }
      if (errorsIndexURL !== resourceBundle.errorsIndexURL) {
        setErrorsIndexURL(resourceBundle.errorsIndexURL);
      }
      if (faqIndexURL !== resourceBundle.faqIndexURL) {
        setFaqIndexURL(resourceBundle.faqIndexURL);
      }
      if (translationsIndexURL !== resourceBundle.translationsIndexURL) {
        setTranslationsIndexURL(resourceBundle.translationsIndexURL);
      }
      if (localizedIndexURL !== resourceBundle.localizedIndexURL) {
        setLocalizedIndexURL(resourceBundle.localizedIndexURL);
      }
      return fluentBundles
        ? {
            appVocabURL,
            bundleNames: appModel.bundleNames,
            currentLanguage: appModel.currentLanguage,
            errorsIndexSWR: {
              ...appModel.errorsIndexSWR,
              [bundleName]: errorsIndexSWR,
            },
            errorsIndexURL: {
              ...appModel.errorsIndexURL,
              [bundleName]: errorsIndexURL,
            },
            faqIndexSWR: {
              ...appModel.faqIndexSWR,
              [bundleName]: faqIndexSWR,
            },
            faqIndexURL: {
              ...appModel.faqIndexURL,
              [bundleName]: faqIndexURL,
            },
            fluentBundles: {
              ...appModel.fluentBundles,
              [bundleName]: fluentBundles,
            },
            localizedIndexSWR: {
              ...appModel.localizedIndexSWR,
              [bundleName]: localizedIndexSWR,
            },
            localizedIndexURL: {
              ...appModel.localizedIndexURL,
              [bundleName]: localizedIndexURL,
            },
            translationsIndexSWR: {
              ...appModel.translationsIndexSWR,
              [bundleName]: translationsIndexSWR,
            },
            translationsIndexURL: {
              ...appModel.translationsIndexURL,
              [bundleName]: translationsIndexURL,
            },
          }
        : null;
    },
    swrConfig
  );
}
