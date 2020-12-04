import { getThingAll, getUrl, ThingPersisted } from "@inrupt/solid-client";
import { rdf } from "rdf-namespaces";
import { getAppTerm } from "../appIndex";
import { getTranslationId } from "../translation";
import { ResourceBundleModel } from "../resourceBundle";

export function generateFAQURL(id, { faqIndexURL }, bundleName = "global") {
  return `${faqIndexURL[bundleName]}#${id}`;
}

export function getFAQAll(
  { appVocabURL, faqIndexSWR }: ResourceBundleModel,
  bundleName = "global"
) {
  const { data: faqDataset } = faqIndexSWR[bundleName];
  return faqDataset
    ? (getThingAll(faqDataset).filter(
        (t) => getUrl(t, rdf.type) === getAppTerm("FAQ", appVocabURL)
      ) as Array<ThingPersisted>)
    : [];
}

export function getFAQDescriptionURL(faq, { appVocabURL }) {
  return getUrl(faq, getAppTerm("faqDescription", appVocabURL));
}

export function getFAQLabelId(faq, { appVocabURL }) {
  return getTranslationId(getUrl(faq, getAppTerm("faqLabel", appVocabURL)));
}
