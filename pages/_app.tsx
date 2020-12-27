import React, { useEffect } from "react";
import { AppProps } from "next/app";
import "../styles/globals.css";
import { SessionProvider } from "@inrupt/solid-ui-react";
import Head from "next/head";
import { ensureAbsoluteURL, prefersDarkModeScheme } from "../src/windowHelpers";
import AppConfig from "../components/appConfig";

const APP_INDEX_URL = ensureAbsoluteURL(
  process.env.NEXT_PUBLIC_APP_INDEX_URL || "/data/index.ttl#dnd5e"
);
const APP_VOCAB_URL = ensureAbsoluteURL(
  process.env.NEXT_PUBLIC_APP_VOCAB_URL || "/data/app-vocabulary.ttl"
);

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document
      .querySelector("html")
      .classList.toggle("dark", prefersDarkModeScheme());
  });
  return (
    <>
      <Head>
        <title>D&D5e Solid App</title>
        <meta name="application-name" content="D&D5e Solid App" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="&D5e Solid App" />
        <meta
          name="description"
          content="Solid App for Dungeons & Dragons 5th edition"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="msapplication-config"
          content="/static/icons/browserconfig.xml"
        />
        <meta name="msapplication-TileColor" content="#DC2626" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#DC2626" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/app/icons8-dungeons-and-dragons-180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/app/icons8-dungeons-and-dragons-32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/app/icons8-dungeons-and-dragons-16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="mask-icon"
          href="/icons/app/icons8-dungeons-and-dragons.svg"
          color="#ffffff"
        />
        <link
          rel="shortcut icon"
          href="/icons/app/icons8-dungeons-and-dragons.ico"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://dnd5e.vercel.app" />
        <meta name="twitter:title" content="D&D5e Solid App" />
        <meta
          name="twitter:description"
          content="Solid App for Dungeons & Dragons 5th edition"
        />
        <meta
          name="twitter:image"
          content="https://dnd5e.vercel.app/icons/app/icons8-dungeons-and-dragons-192.png"
        />
        <meta name="twitter:creator" content="@megoth" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="D&D5e Solid App" />
        <meta
          property="og:description"
          content="Solid App for Dungeons & Dragons 5th edition"
        />
        <meta property="og:site_name" content="D&D5e Solid App" />
        <meta property="og:url" content="https://dnd5e.vercel.app" />
        <meta
          property="og:image"
          content="https://dnd5e.vercel.app/icons/app/icons8-dungeons-and-dragons-192.png"
        />
      </Head>
      <SessionProvider sessionId="dnd5e-app">
        <AppConfig appIndexURL={APP_INDEX_URL} appVocabURL={APP_VOCAB_URL}>
          <Component {...pageProps} />
        </AppConfig>
      </SessionProvider>
    </>
  );
}
