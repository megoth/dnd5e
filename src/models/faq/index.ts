import { getThingAll, getUrl, ThingPersisted } from "@inrupt/solid-client";
import { rdf } from "rdf-namespaces";
import { getAppTerm } from "../appIndex";
import { getTranslationId } from "../translation";
import { AppModel } from "../app";

export function generateFAQURL(id, { faqIndexURL }, bundleName = "global") {
  return `${faqIndexURL[bundleName]}#${id}`;
}

export function getFAQAll(
  { appVocabURL, faqIndexSWR }: AppModel,
  bundleName = "global"
) {
  const { data: faqDataset } = faqIndexSWR[bundleName];
  return faqDataset
    ? (getThingAll(faqDataset).filter(
        (t) => getUrl(t, rdf.type) === getAppTerm("FAQ", { appVocabURL })
      ) as Array<ThingPersisted>)
    : [];
}

export function getFAQDescriptionURL(faq, app) {
  return getUrl(faq, getAppTerm("faqDescription", app));
}

export function getFAQLabelId(faq, app) {
  return getTranslationId(getUrl(faq, getAppTerm("faqLabel", app)));
}
