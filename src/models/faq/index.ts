import {
  getThing,
  getThingAll,
  getUrl,
  Thing,
  ThingPersisted,
} from "@inrupt/solid-client";
import { rdf } from "rdf-namespaces";
import { getAppTerm } from "../appIndex";
import { AppModel, getBundleKey } from "../app";
import { getMessage } from "../translation";

type FAQModel = {
  label: string;
  description: string;
};

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

export function getFAQDetails(faq: Thing, app: AppModel): FAQModel {
  return {
    label: getMessage(app, getFAQLabelUrl(faq, app)),
    description: getMessage(app, getFAQDescriptionURL(faq, app)),
  };
}

export function getFAQ(
  faqId: string,
  app: AppModel,
  bundle = "global"
): FAQModel {
  const { currentLocale, resourceBundles } = app;
  const bundleKey = getBundleKey(currentLocale, bundle);
  const faqURL = `${resourceBundles[bundleKey].urls.faqs}#${faqId}`;
  const faq = getThing(resourceBundles[bundleKey].data.faqs, faqURL);
  return getFAQDetails(faq, app);
}
