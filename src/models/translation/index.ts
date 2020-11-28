import {
  asUrl,
  getSolidDataset,
  getStringWithLocale,
  getThingAll,
  ThingPersisted,
} from "@inrupt/solid-client";
import { skos } from "rdf-namespaces";
import { negotiateLanguages } from "@fluent/langneg";
import { FluentBundle, FluentResource } from "@fluent/bundle";
import translationsTurtle from "../../../data/translations.ttl";

export const translationDatasetUrl =
  "http://localhost:3000/data/translations.ttl";

export function getDefaultBundle(bundles) {
  return bundles[0];
}

export function getTranslationId(url) {
  return url.replace(/(:|\/|\.|#)/g, "-");
}

export function getTranslationUrl(id) {
  return `${translationDatasetUrl}#${id}`;
}

export function getMessage(bundle, id, args: Record<string, any> = {}) {
  const translationUrl = getTranslationUrl(id);
  const translationId = getTranslationId(translationUrl);
  const message = bundle.getMessage(translationId);
  return message?.value
    ? bundle.formatPattern(message.value, args)
    : `[Translation for ${translationUrl} does not exist]`;
}

export async function getTranslationsDataset() {
  return getSolidDataset(translationDatasetUrl, {
    fetch: () =>
      Promise.resolve(
        new Response(translationsTurtle, {
          headers: new Headers({
            "Content-Type": "text/turtle",
          }),
        })
      ),
  });
}

export async function getTranslationBundleAll(userLocales) {
  const dataset = await getTranslationsDataset();
  const translations = getThingAll(dataset) as Array<ThingPersisted>;
  const currentLocales = negotiateLanguages(userLocales, ["en-US"], {
    defaultLocale: "en-US",
  });
  return currentLocales.map((locale) => {
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
