import { FluentBundle, FluentResource } from "@fluent/bundle";
import { getTranslationId } from "../src/models/translation";
import { defaultLocale } from "./mockLanguage";

interface Options {
  locale: string;
}

export default function mockFluentBundle(
  translations: Record<string, string> = {},
  options: Partial<Options> = {}
) {
  const locale = options.locale || defaultLocale;
  const bundle = new FluentBundle(locale);
  Object.entries(translations).forEach(([translationURL, message]) => {
    const translationId = getTranslationId(translationURL);
    bundle.addResource(new FluentResource(`${translationId} = ${message}`));
  });
  return bundle;
}
