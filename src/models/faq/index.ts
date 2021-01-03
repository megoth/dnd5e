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
  faq: Thing;
  label: string;
  labelTranslationURL: string;
  description: string;
  descriptionTranslationURL: string;
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

export function getFAQLabelURL(faq, app) {
  return getUrl(faq, getAppTerm("faqLabel", app));
}

export function getFAQDetails(faq: Thing, app: AppModel): FAQModel {
  const labelURL = getFAQLabelURL(faq, app);
  const descriptionURL = getFAQDescriptionURL(faq, app);
  return {
    faq,
    label: getMessage(app, labelURL),
    labelTranslationURL: labelURL,
    description: getMessage(app, descriptionURL),
    descriptionTranslationURL: descriptionURL,
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
