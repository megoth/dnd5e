import {
  addStringNoLocale,
  addUrl,
  mockSolidDatasetFrom,
  mockThingFrom,
  setThing,
} from "@inrupt/solid-client";
import { rdfs } from "rdf-namespaces";
import { chain } from "../src/utils";
import { getAppTerm } from "../src/models/appIndex";
import {
  errorsURL,
  faqsURL,
  localizationsURL,
  translationsURL,
} from "./mockApp";
import { defaultLocale } from "./mockLanguage";

export const appIndexURL = "https://example.com/index.ttl#dnd5e";
export const appVocabURL = "https://example.com/appVocab.ttl";
export const globalResourceURL = "https://example.com/index.ttl#globalResource";
export const globalLocalizationsURL =
  "https://example.com/index.ttl#localizationsIndex";
export const globalTranslationsURL =
  "https://example.com/index.ttl#translationsIndex";
export const supportLanguageEnUS = "https://example.com/index.ttl#locale-en-US";
export const translationLanguageEnUS =
  "https://example.com/translations.ttl#locale-en-US";

export default function mockAppIndexDataset() {
  return chain(
    mockSolidDatasetFrom(appIndexURL),
    (d) =>
      setThing(
        d,
        chain(
          mockThingFrom(appIndexURL),
          (t) =>
            addUrl(
              t,
              getAppTerm("resourceBundle", { appVocabURL }),
              globalResourceURL
            ),
          (t) =>
            addUrl(
              t,
              getAppTerm("supportLanguage", { appVocabURL }),
              supportLanguageEnUS
            )
        )
      ),
    (d) =>
      setThing(
        d,
        chain(
          mockThingFrom(globalResourceURL),
          (t) => addStringNoLocale(t, rdfs.label, "global"),
          (t) =>
            addUrl(t, getAppTerm("errorsIndex", { appVocabURL }), errorsURL),
          (t) => addUrl(t, getAppTerm("faqIndex", { appVocabURL }), faqsURL),
          (t) =>
            addUrl(
              t,
              getAppTerm("translationsIndex", { appVocabURL }),
              globalTranslationsURL
            ),
          (t) =>
            addUrl(
              t,
              getAppTerm("translationsIndex", { appVocabURL }),
              globalLocalizationsURL
            )
        )
      ),
    (d) =>
      setThing(
        d,
        chain(mockThingFrom(globalTranslationsURL), (t) =>
          addUrl(t, getAppTerm("resource", { appVocabURL }), translationsURL)
        )
      ),
    (d) =>
      setThing(
        d,
        chain(
          mockThingFrom(globalLocalizationsURL),
          (t) =>
            addUrl(
              t,
              getAppTerm("resource", { appVocabURL }),
              localizationsURL
            ),
          (t) =>
            addStringNoLocale(
              t,
              getAppTerm("language", { appVocabURL }),
              defaultLocale
            )
        )
      ),
    (d) =>
      setThing(
        d,
        chain(
          mockThingFrom(supportLanguageEnUS),
          (t) =>
            addStringNoLocale(
              t,
              getAppTerm("language", { appVocabURL }),
              defaultLocale
            ),
          (t) =>
            addStringNoLocale(
              t,
              getAppTerm("languageFlag", { appVocabURL }),
              "🇺🇸"
            ),
          (t) =>
            addUrl(
              t,
              getAppTerm("translation", { appVocabURL }),
              translationLanguageEnUS
            )
        )
      )
  );
}
