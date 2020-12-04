import React, { ReactNode } from "react";
import { LocalizationProvider, ReactLocalization } from "@fluent/react";
import ResourceBundleProvider from "../../src/contexts/resourceBundle";
import useResourceBundleLoader from "../../src/hooks/useResourceBundleLoader";
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
  const {
    data: resourceBundle,
    error: resourceBundleError,
  } = useResourceBundleLoader("global", appIndexURL, appVocabURL);

  if (resourceBundleError) {
    return <ErrorMessage error={resourceBundleError} />;
  }

  if (!resourceBundle) {
    return <Loading />;
  }

  const l10n = new ReactLocalization(getFluentBundles(resourceBundle));
  return (
    <LocalizationProvider l10n={l10n}>
      <ResourceBundleProvider resourceBundle={resourceBundle}>
        {children}
      </ResourceBundleProvider>
    </LocalizationProvider>
  );
}
