import { negotiateLanguages } from "@fluent/langneg";
import { ResourceBundleModel } from "../resourceBundle";
import { currentLocales } from "../translation";

export function getLanguages(currentLanguage, languages) {
  return negotiateLanguages(languages, currentLocales, {
    defaultLocale: currentLanguage,
  });
}

export function getFluentBundles(
  bundle: ResourceBundleModel,
  bundleLabel = "global"
) {
  return bundle.fluentBundles[bundleLabel];
}
