import {
  asUrl,
  getStringWithLocale,
  getThingAll,
  ThingPersisted,
} from "@inrupt/solid-client";
import { skos } from "rdf-namespaces";
import { FluentBundle, FluentResource } from "@fluent/bundle";

export const currentLanguage = "en-US";
export const currentLocales = [currentLanguage];

export function getDefaultTranslationBundle(
  { fluentBundles },
  bundleName = "global"
) {
  return fluentBundles[bundleName] ? fluentBundles[bundleName][0] : null;
}

export function getTranslationId(url) {
  return url.replace(/([:/.#])/g, "-");
}

export function getTranslationURL(
  id,
  { translationsIndexURL },
  bundleName = "global"
) {
  return `${translationsIndexURL[bundleName]}#${id}`;
}

export function getFailedMessage(translationURL) {
  return `[Translation for ${translationURL} does not exist]`;
}

export function getMessage(
  bundle,
  idOrURL,
  args: Record<string, any> = {},
  bundleName?: string
) {
  const translationURL = idOrURL.startsWith("https://")
    ? idOrURL
    : getTranslationURL(idOrURL, bundle);
  const translationId = getTranslationId(translationURL);
  const translationBundle = getDefaultTranslationBundle(bundle, bundleName);
  const message = translationBundle?.getMessage(translationId);
  return message?.value
    ? translationBundle.formatPattern(message.value, args)
    : getFailedMessage(translationURL);
}

function getTranslations(datasets): Array<ThingPersisted> {
  return datasets.reduce(
    (translations, dataset) => translations.concat(getThingAll(dataset)),
    []
  );
}

export function getTranslationBundleAll(locales, localizedDataset) {
  const translations = getTranslations([localizedDataset]);
  return locales.map((locale) => {
    const bundle = new FluentBundle(locale);
    translations.forEach((t) => {
      const value = getStringWithLocale(t, skos.definition, locale);
      if (!value) {
        return;
      }
      const id = getTranslationId(asUrl(t));
      bundle.addResource(new FluentResource(`${id} = ${value}`));
    });
    return bundle;
  });
}
