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
import { generateUrl as generateErrorUrl, getErrorsDataset } from "../error";
import { generateTranslationUrl, ResourceBundleModel } from "../resourceBundle";

export function getDefaultTranslationBundle(bundles: Array<FluentBundle>) {
  return bundles[0];
}

export function getTranslationId(url) {
  return url.replace(/(:|\/|\.|#)/g, "-");
}

export function generateUrl(id, translationsUrl) {
  return `${translationsUrl}#${id}`;
}

export function getFailedMessage(translationUrl) {
  return `[Translation for ${translationUrl} does not exist]`;
}

export function getMessage(
  bundle: ResourceBundleModel,
  id,
  args: Record<string, any> = {}
) {
  const translationUrl = generateTranslationUrl(id, bundle);
  const translationId = getTranslationId(translationUrl);
  const translationBundle = getDefaultTranslationBundle(
    bundle.translationBundles
  );
  const message = translationBundle.getMessage(translationId);
  return message?.value
    ? translationBundle.formatPattern(message.value, args)
    : getFailedMessage(translationUrl);
}

export function getTranslations(datasets): Array<ThingPersisted> {
  return datasets.reduce(
    (translations, dataset) => translations.concat(getThingAll(dataset)),
    []
  );
}

export async function getTranslationsDataset(datasetUrl) {
  return getSolidDataset(datasetUrl, {
    fetch: () => Promise.resolve(createLocalResponse(translationsTurtle)),
  });
}

export async function getTranslationBundleAll(
  userLocales,
  { errorsUrl, translationsUrl }
) {
  try {
    const [translationsDataset, errorsDataset] = await Promise.all([
      getTranslationsDataset(translationsUrl),
      getErrorsDataset(errorsUrl),
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
    throw new NestedError(
      generateErrorUrl("translationsLoadFailed", errorsUrl),
      error
    );
  }
}
