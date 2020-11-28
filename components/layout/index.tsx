import React, { ReactElement, ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import { LocalizationProvider, ReactLocalization } from "@fluent/react";
import styles from "./index.module.css";
import utilStyles from "../../styles/utils.module.css";
import useTranslations from "../../src/hooks/useTranslations";
import { getDefaultBundle, getMessage } from "../../src/models/translation";
import Loading from "../loading";
import ErrorMessage from "../errorMessage";

interface Props {
  children: ReactNode;
  home?: boolean;
}

export default function Index({ children, home }: Props): ReactElement {
  const { data: bundles, error } = useTranslations();

  if (error) {
    return (
      <ErrorMessage error={error}>Error when loading page...</ErrorMessage>
    );
  }

  if (!bundles) {
    return <Loading />;
  }

  const bundle = getDefaultBundle(bundles);
  const siteTitle = getMessage(bundle, "appName");
  const description = getMessage(bundle, "appDescription");

  const l10n = new ReactLocalization(bundles);

  return (
    <LocalizationProvider l10n={l10n}>
      <div className={styles.container}>
        <Head>
          <title>{siteTitle}</title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content={bundle.formatPattern(description)}
          />
          <meta name="og:title" content={bundle.formatPattern(siteTitle)} />s{" "}
        </Head>
        <header className={styles.header}>
          {home ? (
            <>
              <h1 className={utilStyles.heading2Xl}>{siteTitle}</h1>
            </>
          ) : (
            <>
              <h2 className={utilStyles.headingLg}>
                <Link href="/">
                  <a className={utilStyles.colorInherit}>{siteTitle}</a>
                </Link>
              </h2>
            </>
          )}
        </header>
        <main>{children}</main>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        )}
      </div>
    </LocalizationProvider>
  );
}

Index.defaultProps = {
  home: false,
};
