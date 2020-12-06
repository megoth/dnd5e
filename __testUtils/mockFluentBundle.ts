import { FluentBundle, FluentResource } from "@fluent/bundle";
import {
  currentLanguage,
  getTranslationURL,
  getTranslationId,
} from "../src/models/translation";
import { translationsIndexURL } from "./mockApp";

interface Options {
  locale: string;
}

export default function mockFluentBundle(
  translations: Record<string, string> = {},
  translationsURL: string = translationsIndexURL,
  options: Partial<Options> = {}
) {
  const bundle = new FluentBundle(options.locale || currentLanguage);
  Object.entries(translations).forEach(([id, message]) => {
    const translationURL = getTranslationURL(id, {
      translationsIndexURL: {
        global: translationsURL,
      },
    });
    const translationId = getTranslationId(translationURL);
    bundle.addResource(new FluentResource(`${translationId} = ${message}`));
  });
  return bundle;
}
