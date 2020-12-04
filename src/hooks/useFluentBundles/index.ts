import { useEffect, useState } from "react";
import { FluentBundle } from "@fluent/bundle";
import { getTranslationBundleAll } from "../../models/translation";

function bundleExist(fluentBundles, currentLocales) {
  return fluentBundles?.find(({ locales }) => {
    return locales.reduce(
      (memo, l) => memo && currentLocales.indexOf(l) !== -1,
      true
    );
  });
}

export default function useFluentBundles(localizedIndexSWR, currentLocales) {
  const [fluentBundles, setFluentBundles] = useState<Array<FluentBundle>>(null);
  useEffect(() => {
    const { data: localizedIndexDataset } = localizedIndexSWR || {};
    if (!localizedIndexDataset || bundleExist(fluentBundles, currentLocales)) {
      return;
    }
    setFluentBundles(
      getTranslationBundleAll(currentLocales, localizedIndexDataset)
    );
  }, [currentLocales, localizedIndexSWR, fluentBundles]);
  return fluentBundles;
}
