import { getStringNoLocale, getThing, getUrlAll } from "@inrupt/solid-client";
import { rdfs } from "rdf-namespaces";
import NestedError from "nested-error-stacks";
import useSWR from "swr";
import useAppIndex from "../useAppIndex";
import { getAppTerm } from "../../models/app";
import { loadResourceBundle } from "../../models/resourceBundle";
import useAppConfig from "../useAppConfig";

export default function useResourceBundle(bundleName) {
  const { data, error: appIndexError } = useAppIndex();
  const { solidBase } = useAppConfig();

  return useSWR([bundleName, "resourceBundle", data], async () => {
    if (appIndexError) {
      throw appIndexError;
    }
    if (!data) {
      return null;
    }
    const appIndex = getThing(data, solidBase);
    const resourceBundleUrls = getUrlAll(
      appIndex,
      getAppTerm("resourceBundle")
    );
    const resourceBundle = resourceBundleUrls
      .map((bundleUrl) => getThing(data, bundleUrl))
      .find((b) => getStringNoLocale(b, rdfs.label) === bundleName);
    if (!resourceBundle) {
      throw new NestedError("Unable to load bundle");
    }
    return loadResourceBundle(resourceBundle);
  });
}
