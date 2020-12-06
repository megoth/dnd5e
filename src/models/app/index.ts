import { SolidDataset } from "@inrupt/solid-client";
import { responseInterface } from "swr";
import { FluentBundle } from "@fluent/bundle";
import { currentLanguage } from "../translation";

export type ResourceBundleResourceSWR = Record<
  string,
  responseInterface<SolidDataset, any>
>;
export type ResourceBundleResourceURL = Record<string, string | null>;

export type AppModel = {
  appVocabURL: string;
  bundleNames: string[];
  currentLanguage: string;
  errorsIndexSWR: ResourceBundleResourceSWR;
  errorsIndexURL: ResourceBundleResourceURL;
  faqIndexSWR: ResourceBundleResourceSWR;
  faqIndexURL: ResourceBundleResourceURL;
  fluentBundles: Record<string, Array<FluentBundle> | null>;
  localizedIndexSWR: ResourceBundleResourceSWR;
  localizedIndexURL: ResourceBundleResourceURL;
  translationsIndexSWR: ResourceBundleResourceSWR;
  translationsIndexURL: ResourceBundleResourceURL;
};

export function createApp(appVocabURL): AppModel {
  return {
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
  };
}
