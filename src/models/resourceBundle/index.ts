import { SolidDataset } from "@inrupt/solid-client";
import { AppModel, getBundleKey } from "../app";
import { extendFluentBundle } from "../language";

export type ResourceBundleData = {
  errors?: SolidDataset | null;
  faqs?: SolidDataset | null;
  localizations?: SolidDataset | null;
  translations?: SolidDataset | null;
};

export type ResourceBundleURLs = {
  errors?: string | null;
  faqs?: string | null;
  localizations?: string | null;
  translations?: string | null;
};

export type ResourceBundleModel = {
  label: string;
  locale: string;
  data: ResourceBundleData;
  urls: ResourceBundleURLs;
};

export function updateAppWithResourceBundle(
  app: AppModel,
  resourceBundle: ResourceBundleModel
): AppModel {
  const { label, locale, data } = resourceBundle;
  const bundleKey = getBundleKey(locale, label);
  return {
    ...app,
    fluentBundles: {
      ...app.fluentBundles,
      [app.currentLocale]: extendFluentBundle(
        app.currentLocale,
        data.localizations,
        app.fluentBundles[app.currentLocale]
      ),
    },
    resourceBundles: {
      ...app.resourceBundles,
      [bundleKey]: resourceBundle,
    },
  };
}
