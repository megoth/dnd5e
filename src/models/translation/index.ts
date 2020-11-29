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
import NestedError from "nested-error-stacks";
import translationsTurtle from "../../../public/data/translations.ttl";
import { createLocalResponse } from "../../utils";
import { getErrorsDataset, generateErrorUrl } from "../error";

export const translationDatasetUrl =
  "http://localhost:3000/data/translations.ttl";

export function getDefaultBundle(bundles) {
  return bundles[0];
}

export function getTranslationId(url) {
  return url.replace(/(:|\/|\.|#)/g, "-");
}

export function generateTranslationUrl(id) {
  return `${translationDatasetUrl}#${id}`;
}

export function getFailedMessage(translationUrl) {
  return `[Translation for ${translationUrl} does not exist]`;
}

export function getMessage(bundle, id, args: Record<string, any> = {}) {
  const translationUrl = generateTranslationUrl(id);
  const translationId = getTranslationId(translationUrl);
  const message = bundle.getMessage(translationId);
  return message?.value
    ? bundle.formatPattern(message.value, args)
    : getFailedMessage(translationUrl);
}

export function getTranslations(datasets): Array<ThingPersisted> {
  return datasets.reduce(
    (translations, dataset) => translations.concat(getThingAll(dataset)),
    []
  );
}

export async function getTranslationsDataset() {
  return getSolidDataset(translationDatasetUrl, {
    fetch: () => Promise.resolve(createLocalResponse(translationsTurtle)),
  });
}

export async function getTranslationBundleAll(userLocales) {
  try {
    const [translationsDataset, errorsDataset] = await Promise.all([
      getTranslationsDataset(),
      getErrorsDataset(),
    ]);
    const translations = getTranslations([translationsDataset, errorsDataset]);
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
  } catch (error) {
    throw new NestedError(generateErrorUrl("translationsLoadFailed"), error);
  }
}
