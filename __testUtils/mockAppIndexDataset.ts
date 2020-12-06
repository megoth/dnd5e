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
  errorsIndexURL,
  faqIndexURL,
  localizedIndexURL,
  translationsIndexURL,
} from "./mockApp";
import { currentLanguage } from "../src/models/translation";

export const appIndexURL = "https://example.com/index.ttl#dnd5e";
export const appVocabURL = "https://example.com/appVocab.ttl";
export const globalResourceURL = "https://example.com/index.ttl#globalResource";
export const globalLocalizationsURL =
  "https://example/com/index.ttl#localizationsIndex";
export const globalTranslationsURL =
  "https://example/com/index.ttl#translationsIndex";

export default function mockAppIndexDataset() {
  return chain(
    mockSolidDatasetFrom(appIndexURL),
    (d) =>
      setThing(
        d,
        chain(mockThingFrom(appIndexURL), (t) =>
          addUrl(
            t,
            getAppTerm("resourceBundle", { appVocabURL }),
            globalResourceURL
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
            addUrl(
              t,
              getAppTerm("errorsIndex", { appVocabURL }),
              errorsIndexURL
            ),
          (t) =>
            addUrl(t, getAppTerm("faqIndex", { appVocabURL }), faqIndexURL),
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
          addUrl(
            t,
            getAppTerm("resource", { appVocabURL }),
            translationsIndexURL
          )
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
              localizedIndexURL
            ),
          (t) =>
            addStringNoLocale(
              t,
              getAppTerm("language", { appVocabURL }),
              currentLanguage
            )
        )
      )
  );
}
