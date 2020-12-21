import { FluentBundle } from "@fluent/bundle";
import { ResourceBundleModel } from "../resourceBundle";
import { AppIndex } from "../appIndex";
import { LanguageModel } from "../language";

type BundleKey = string;
type Language = string;
export type FluentBundleMap = Record<Language, FluentBundle>;
export type ResourceBundleMap = Record<BundleKey, ResourceBundleModel>;
export type AppModel = {
  appVocabURL: string;
  currentLocale: Language;
  languages: Array<LanguageModel>;
  fluentBundles: FluentBundleMap;
  resourceBundles: ResourceBundleMap;
};

export function getBundleKey(locale = "en-US", label = "global") {
  return `${label}-${locale}`;
}

export function createApp(
  currentLocale,
  appVocabURL,
  appIndex: AppIndex | null
): AppModel {
  return {
    appVocabURL,
    currentLocale,
    fluentBundles: {},
    languages: appIndex?.supportLanguage || [],
    resourceBundles:
      appIndex?.resourceBundleAll.reduce<ResourceBundleMap>(
        (memo, { label, locale, urls }) => ({
          ...memo,
          [getBundleKey(locale, label)]: {
            label,
            locale,
            data: {},
            urls,
          },
        }),
        {}
      ) || {},
  };
}

export function appIsLoading(app: AppModel, bundles: string[]): boolean {
  return bundles.reduce<boolean>((memo, bundle) => {
    const bundleKey = getBundleKey(app.currentLocale, bundle);
    return memo || !app.resourceBundles[bundleKey];
  }, false);
}

export function appIsLoadingLocalizations(
  app: AppModel,
  bundles: string[]
): boolean {
  return bundles.reduce<boolean>((memo, bundle) => {
    const bundleKey = getBundleKey(app.currentLocale, bundle);
    return (
      memo ||
      !app.resourceBundles[bundleKey] ||
      app.resourceBundles[bundleKey].data.localizations === undefined
    );
  }, false);
}
