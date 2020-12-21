import React from "react";
import Link from "next/link";
import useApp from "../../src/hooks/useApp";
import Translation from "../translation";

export const TESTID_LOCALE_SELECTOR_LANGUAGE = "locale-selector-language";

export default function LocaleSelector() {
  const { currentLocale, languages } = useApp();
  if (languages.length < 2) return null;
  return (
    <>
      {languages.map(({ languageCode, translationUrl }) => (
        <span key={languageCode} data-testid={TESTID_LOCALE_SELECTOR_LANGUAGE}>
          {languageCode === currentLocale ? (
            <Translation url={translationUrl} />
          ) : (
            <Link href={{ query: { locale: languageCode } }}>
              <a>
                <Translation url={translationUrl} />
              </a>
            </Link>
          )}
          &nbsp;
        </span>
      ))}
    </>
  );
}
