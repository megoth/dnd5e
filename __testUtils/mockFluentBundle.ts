import { FluentBundle, FluentResource } from "@fluent/bundle";
import { getTranslationURL, getTranslationId } from "../src/models/translation";
import { translationsURL } from "./mockApp";
import mockResourceBundleMap from "./mockResourceBundleMap";
import { defaultLocale } from "./mockLanguage";

interface Options {
  locale: string;
}

export default function mockFluentBundle(
  translations: Record<string, string> = {},
  url: string = translationsURL,
  options: Partial<Options> = {}
) {
  const locale = options.locale || defaultLocale;
  const bundle = new FluentBundle(locale);
  Object.entries(translations).forEach(([id, message]) => {
    const translationURL = getTranslationURL(id, {
      currentLocale: locale,
      resourceBundles: mockResourceBundleMap({
        locale,
        urls: {
          translations: url,
        },
      }),
    });
    const translationId = getTranslationId(translationURL);
    bundle.addResource(new FluentResource(`${translationId} = ${message}`));
  });
  return bundle;
}
