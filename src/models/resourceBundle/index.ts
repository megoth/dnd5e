import { FluentBundle } from "@fluent/bundle";
import { getUrl, Thing } from "@inrupt/solid-client";
import NestedError from "nested-error-stacks";
import { getAppTerm } from "../app";
import {
  getTranslationBundleAll,
  generateUrl as getTranslateUrl,
} from "../translation";
import { generateUrl as getErrorUrl } from "../error";

export interface ResourceBundleModel {
  errorsUrl: string | null;
  translationBundles: Array<FluentBundle>;
  translationsUrl: string | null;
}

export function generateErrorUrl(id, bundle: ResourceBundleModel) {
  return getErrorUrl(id, bundle.errorsUrl);
}

export function generateTranslationUrl(id, bundle: ResourceBundleModel) {
  return getTranslateUrl(id, bundle.translationsUrl);
}

export function getError(id, bundle, error = null) {
  return new NestedError(generateErrorUrl(id, bundle), error);
}

export function isError(
  error,
  errorId: string,
  bundle: ResourceBundleModel
): boolean {
  const { message: errorUrl1 } = error;
  const errorUrl2 = generateErrorUrl(errorId, bundle);
  return errorUrl1 === errorUrl2;
}

export async function loadResourceBundle(
  bundle: Thing
): Promise<ResourceBundleModel> {
  const errorsUrl = getUrl(bundle, getAppTerm("errorsIndex"));
  const translationsUrl = getUrl(bundle, getAppTerm("translationsIndex"));
  const translationBundles = await getTranslationBundleAll(
    [...navigator.languages],
    {
      errorsUrl,
      translationsUrl,
    }
  );
  return {
    errorsUrl,
    translationBundles,
    translationsUrl,
  };
}
