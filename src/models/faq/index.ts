import { getThingAll, getUrl, ThingPersisted } from "@inrupt/solid-client";
import { rdf } from "rdf-namespaces";
import { getAppTerm } from "../appIndex";
import { AppModel, getBundleKey } from "../app";

export function getFAQAll(
  { appVocabURL, currentLocale, resourceBundles }: Partial<AppModel>,
  bundleName = "global"
) {
  const bundleKey = getBundleKey(currentLocale, bundleName);
  const { faqs } = resourceBundles[bundleKey].data;
  return faqs
    ? (getThingAll(faqs).filter(
        (t) => getUrl(t, rdf.type) === getAppTerm("FAQ", { appVocabURL })
      ) as Array<ThingPersisted>)
    : [];
}

export function getFAQDescriptionURL(faq, app) {
  return getUrl(faq, getAppTerm("faqDescription", app));
}

export function getFAQLabelUrl(faq, app) {
  return getUrl(faq, getAppTerm("faqLabel", app));
}
