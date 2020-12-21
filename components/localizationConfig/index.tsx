import React, { useEffect, useState } from "react";
import { AppModel, getBundleKey } from "../../src/models/app";
import useDataset from "../../src/hooks/useDataset";
import ErrorMessage from "../errorMessage";
import { updateAppWithResourceBundle } from "../../src/models/resourceBundle";

interface Props {
  app: AppModel;
  bundle: string;
  setApp: Function;
}

export const swrConfig = {
  errorRetryCount: 0,
};

export const TESTID_LOCALIZATION_CONFIG_NO_ERROR =
  "localization-config-no-error";

export default function LocalizationConfig({ app, bundle, setApp }: Props) {
  const [done, setDone] = useState(false);
  const bundleKey = getBundleKey(app.currentLocale, bundle);
  const { label, locale, urls } = app.resourceBundles[bundleKey];
  const { data: errors, error: errorsError } = useDataset(
    urls.errors,
    [],
    swrConfig
  );
  const { data: faqs, error: faqsError } = useDataset(urls.faqs, [], swrConfig);
  const { data: translations, error: translationsError } = useDataset(
    urls.translations,
    [],
    swrConfig
  );
  const { data: localizations, error: localizationsError } = useDataset(
    urls.localizations,
    [locale],
    swrConfig
  );
  const error =
    errorsError || faqsError || translationsError || localizationsError;
  const loading =
    errors === undefined ||
    faqs === undefined ||
    translations === undefined ||
    localizations === undefined;
  useEffect(() => {
    if (loading || done) return;
    const data = {
      errors,
      faqs,
      translations,
      localizations,
    };
    setApp(
      updateAppWithResourceBundle(app, {
        label,
        locale,
        urls,
        data,
      })
    );
    setDone(true);
  }, [
    app,
    bundleKey,
    done,
    errors,
    faqs,
    label,
    loading,
    locale,
    localizations,
    setApp,
    translations,
    urls,
  ]);
  if (error) return <ErrorMessage error={error} />;
  return <div data-testid={TESTID_LOCALIZATION_CONFIG_NO_ERROR} />;
}
