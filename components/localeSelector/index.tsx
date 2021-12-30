import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useApp from "../../src/hooks/useApp";
import Translation from "../translation";
import { getMessage } from "../../src/models/translation";

export const TESTID_LOCALE_SELECTOR_LANGUAGE = "locale-selector-language";

export default function LocaleSelector() {
  const app = useApp();
  const router = useRouter();
  const { currentLocale, languages } = app;
  if (languages.length < 2) return null;
  return (
    <>
      {languages
        .filter(({ languageCode }) => languageCode !== currentLocale)
        .map(({ languageCode, languageFlag, translationUrl }) => (
          <Link
            href={{
              pathname: router?.pathname || "/",
              query: { locale: languageCode },
            }}
            key={languageCode}
          >
            <a className="button" data-testid={TESTID_LOCALE_SELECTOR_LANGUAGE}>
              {languageFlag}
              &nbsp;
              <Translation
                id="translateTo"
                vars={{ language: getMessage(app, translationUrl) }}
              />
            </a>
          </Link>
        ))}
    </>
  );
}
