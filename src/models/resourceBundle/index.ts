import { SolidDataset } from "@inrupt/solid-client";
import { responseInterface } from "swr";
import { FluentBundle } from "@fluent/bundle";

export type ResourceBundleResourceSWR = Record<
  string,
  responseInterface<SolidDataset, any>
>;
export type ResourceBundleResourceURL = Record<string, string | null>;

export type ResourceBundleModel = {
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
