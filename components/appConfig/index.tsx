import React, { ReactNode, useEffect, useState } from "react";
import { LocalizationProvider, ReactLocalization } from "@fluent/react";
import { useRouter } from "next/router";
import AppProvider from "../../src/contexts/app";
import useAppCore from "../../src/hooks/useAppCore";
import ErrorMessage from "../errorMessage";
import Loading from "../loading";
import {
  getFluentBundles,
  getLocale,
  updateAppWithLocale,
} from "../../src/models/language";
import {
  appIsLoading,
  appIsLoadingLocalizations,
  getBundleKey,
} from "../../src/models/app";
import LocalizationConfig from "../localizationConfig";

interface Props {
  children: ReactNode;
  appIndexURL: string;
  appVocabURL: string;
}

export default function AppConfig({
  children,
  appIndexURL,
  appVocabURL,
}: Props) {
  const router = useRouter();
  const [locale, setLocale] = useState<string>(getLocale(router.query.locale));
  const { app: appCore, error: appError } = useAppCore(
    appVocabURL,
    appIndexURL,
    locale
  );
  const [app, setApp] = useState(appCore);
  useEffect(() => setApp(appCore), [appCore]);
  const [bundles, setBundles] = useState<string[]>(["global"]);
  useEffect(() => {
    const newLocale = getLocale(router.query.locale);
    if (!app || app.currentLocale === newLocale) return;
    localStorage.setItem("locale", newLocale);
    setLocale(newLocale);
    setBundles(["global"]);
    setApp(updateAppWithLocale(app, newLocale));
  }, [app, router.query.locale]);

  if (appError) {
    return <ErrorMessage error={appError} />;
  }

  if (!app || appIsLoading(app, bundles)) {
    return <Loading />;
  }

  if (appIsLoadingLocalizations(app, bundles)) {
    return (
      <>
        {bundles.map((bundle) => (
          <LocalizationConfig
            app={app}
            bundle={bundle}
            setApp={setApp}
            key={getBundleKey(app.currentLocale, bundle)}
          />
        ))}
        <Loading />
      </>
    );
  }

  return (
    <LocalizationProvider l10n={new ReactLocalization(getFluentBundles(app))}>
      <AppProvider app={app} setBundles={setBundles} setLocale={setLocale}>
        {children}
      </AppProvider>
    </LocalizationProvider>
  );
}
