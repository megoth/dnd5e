import { negotiateLanguages } from "@fluent/langneg";
import { FluentBundle, FluentResource } from "@fluent/bundle";
import {
  asUrl,
  getStringWithLocale,
  getThingAll,
  SolidDataset,
  ThingPersisted,
} from "@inrupt/solid-client";
import { skos } from "rdf-namespaces";
import { AppModel } from "../app";
import { getTranslationId } from "../translation";
import { getNavigatorLanguages } from "../../windowHelpers";

export type LanguageModel = {
  languageCode: string;
  languageFlag: string;
  translationUrl: string;
};

export function getLocale(selectedLocale?: string | string[]): string {
  const languages = getNavigatorLanguages(selectedLocale);
  return negotiateLanguages(languages, ["en-US", "nb-NO"], {
    defaultLocale: "en-US",
  })[0];
}

export function getFluentBundles(app: AppModel): Array<FluentBundle> {
  return [app.fluentBundles[app.currentLocale]];
}

export function extendFluentBundle(
  locale,
  localizations: SolidDataset | null,
  bundle = new FluentBundle(locale)
) {
  if (!localizations) return bundle;
  const messages = getThingAll(localizations) as Array<ThingPersisted>;
  messages.forEach((t) => {
    const value = getStringWithLocale(t, skos.definition, locale);
    if (!value) {
      return;
    }
    const id = getTranslationId(asUrl(t));
    bundle.addResource(new FluentResource(`${id} = ${value}`));
  });
  return bundle;
}

export function updateAppWithLocale(app: AppModel, locale: string): AppModel {
  return { ...app, currentLocale: locale };
}
