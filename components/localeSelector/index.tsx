import React from "react";
import Link from "next/link";
import useApp from "../../src/hooks/useApp";
import Translation from "../translation";
import { getMessage } from "../../src/models/translation";

export const TESTID_LOCALE_SELECTOR_LANGUAGE = "locale-selector-language";

export default function LocaleSelector() {
  const app = useApp();
  const { currentLocale, languages } = app;
  if (languages.length < 2) return null;
  return (
    <>
      {languages
        .filter(({ languageCode }) => languageCode !== currentLocale)
        .map(({ languageCode, languageFlag, translationUrl }) => (
          <span
            key={languageCode}
            data-testid={TESTID_LOCALE_SELECTOR_LANGUAGE}
          >
            <Link href={{ query: { locale: languageCode } }}>
              <a className="bg-red-100 py-1 px-2 rounded border border-red-300 hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-800 hover:shadow-inner">
                {languageFlag}
                &nbsp;
                <Translation
                  id="translateTo"
                  vars={{ language: getMessage(app, translationUrl) }}
                />
              </a>
            </Link>
          </span>
        ))}
    </>
  );
}
