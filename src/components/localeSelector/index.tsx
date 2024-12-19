import React from "react";
import Translation from "../translation";
import { useLocation } from "react-router-dom";
import useApp from "../../hooks/useApp";
import { useLocalization } from "@fluent/react";

export const TESTID_LOCALE_SELECTOR_LANGUAGE = "locale-selector-language";

export default function LocaleSelector() {
  const { l10n } = useLocalization();
  const { availableLocales } = useApp();
  const location = useLocation();
  return availableLocales.map((locale) => (
    <a
      href={`${location?.pathname || "/"}?locale=${locale.language}`}
      key={locale.language}
      className="button"
      data-testid={TESTID_LOCALE_SELECTOR_LANGUAGE}
    >
      {locale.languageFlag}
      &nbsp;
      <Translation
        id="translateTo"
        vars={{
          language: l10n.getString(`locale-${locale.language}`),
        }}
      />
    </a>
  ));
}
