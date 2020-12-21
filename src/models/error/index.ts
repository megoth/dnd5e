import { getThing, getUrl } from "@inrupt/solid-client";
import NestedError from "nested-error-stacks";
import { AppModel, getBundleKey } from "../app";
import { getAppTerm } from "../appIndex";

export function getErrorURL(
  id: string,
  { currentLocale, resourceBundles }: Partial<AppModel>,
  bundleName = "global"
) {
  const bundleKey = getBundleKey(currentLocale, bundleName);
  return `${resourceBundles[bundleKey].urls.errors}#${id}`;
}

export function getError(id, bundle, error = null) {
  return new NestedError(getErrorURL(id, bundle), error);
}

export function isError(
  error,
  errorId: string,
  app: Partial<AppModel>,
  bundleName?: string
): boolean {
  const { message: errorURL1 } = error;
  const errorURL2 = getErrorURL(errorId, app, bundleName);
  return errorURL1 === errorURL2;
}

export function getErrorTranslationURL(
  errorURL,
  { appVocabURL, currentLocale, resourceBundles }: Partial<AppModel>,
  bundleName = "global"
): string | null {
  const bundleKey = getBundleKey(currentLocale, bundleName);
  const { errors } = resourceBundles[bundleKey].data;
  if (!errors) {
    return null;
  }
  try {
    const error = getThing(errors, errorURL);
    return getUrl(error, getAppTerm("translation", { appVocabURL }));
  } catch (error) {
    // ignore new error
    return null;
  }
}
