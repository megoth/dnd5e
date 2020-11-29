import { FluentBundle, FluentResource } from "@fluent/bundle";
import {
  generateTranslationUrl,
  getTranslationId,
} from "../src/models/translation";

interface Options {
  locale: string;
}

export default function mockFluentBundle(
  translations: Record<string, string> = {},
  options: Partial<Options> = {}
) {
  const bundle = new FluentBundle(options.locale || "en-US");
  Object.entries(translations).forEach(([id, message]) => {
    const translationUrl = generateTranslationUrl(id);
    const translationId = getTranslationId(translationUrl);
    bundle.addResource(new FluentResource(`${translationId} = ${message}`));
  });
  return bundle;
}