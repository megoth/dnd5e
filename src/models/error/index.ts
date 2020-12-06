import { getThing, getUrl } from "@inrupt/solid-client";
import NestedError from "nested-error-stacks";
import { AppModel } from "../app";
import { getAppTerm } from "../appIndex";

export function getErrorURL(
  id: string,
  { errorsIndexURL },
  bundleName = "global"
) {
  return `${errorsIndexURL[bundleName]}#${id}`;
}

export function getError(id, bundle, error = null) {
  return new NestedError(getErrorURL(id, bundle), error);
}

export function isError(
  error,
  errorId: string,
  app: AppModel,
  bundleName?: string
): boolean {
  const { message: errorURL1 } = error;
  const errorURL2 = getErrorURL(errorId, app, bundleName);
  return errorURL1 === errorURL2;
}

export function getErrorTranslationURL(
  errorURL,
  { appVocabURL, errorsIndexSWR }: AppModel,
  bundleName = "global"
): string | null {
  const { data: errorsDataset } = errorsIndexSWR[bundleName];
  if (!errorsDataset) {
    return null;
  }
  try {
    const error = getThing(errorsDataset, errorURL);
    return getUrl(error, getAppTerm("translation", { appVocabURL }));
  } catch (error) {
    // ignore new error
    return null;
  }
}
