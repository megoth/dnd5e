import React, { ReactNode } from "react";
import { LocalizationProvider, ReactLocalization } from "@fluent/react";
import AppProvider from "../../src/contexts/app";
import useAppLoader from "../../src/hooks/useAppLoader";
import ErrorMessage from "../errorMessage";
import Loading from "../loading";
import { getFluentBundles } from "../../src/models/language";

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
  const { data: app, error: appError } = useAppLoader(
    "global",
    appIndexURL,
    appVocabURL
  );

  if (appError) {
    return <ErrorMessage error={appError} />;
  }

  if (!app) {
    return <Loading />;
  }

  const l10n = new ReactLocalization(getFluentBundles(app));
  return (
    <LocalizationProvider l10n={l10n}>
      <AppProvider app={app}>{children}</AppProvider>
    </LocalizationProvider>
  );
}
