import React, { ReactElement, ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./index.module.css";
import utilStyles from "../../styles/utils.module.css";
import { getMessage } from "../../src/models/translation";
import useResourceBundle from "../../src/hooks/useResourceBundle";

interface Props {
  children: ReactNode;
  home?: boolean;
}

export default function Layout({ children, home }: Props): ReactElement {
  const { resourceBundle } = useResourceBundle();

  const siteTitle = getMessage(resourceBundle, "appName");
  const description = getMessage(resourceBundle, "appDescription");

  return (
    <div className={styles.container}>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header className={styles.header}>
        {home && (
          <>
            <h1 className={utilStyles.heading2Xl}>{siteTitle}</h1>
          </>
        )}
      </header>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}

Layout.defaultProps = {
  home: false,
};
