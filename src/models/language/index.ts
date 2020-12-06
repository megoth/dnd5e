import { negotiateLanguages } from "@fluent/langneg";
import { AppModel } from "../app";
import { currentLocales } from "../translation";

export function getLanguages(currentLanguage, languages) {
  return negotiateLanguages(languages, currentLocales, {
    defaultLocale: currentLanguage,
  });
}

export function getFluentBundles(app: AppModel, bundleLabel = "global") {
  return app.fluentBundles[bundleLabel];
}
