import React, { useEffect } from "react";
import { AppProps } from "next/app";
import "../styles/globals.scss";
import { SessionProvider } from "@inrupt/solid-ui-react";
import AppConfig from "../components/appConfig";
import { ensureAbsoluteURL, prefersDarkModeScheme } from "../src/windowHelpers";

const APP_INDEX_URL = ensureAbsoluteURL(
  process.env.NEXT_PUBLIC_APP_INDEX_URL || ""
);
const APP_VOCAB_URL = ensureAbsoluteURL(
  process.env.NEXT_PUBLIC_APP_VOCAB_URL || ""
);

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document
      .querySelector("html")
      .classList.toggle("dark", prefersDarkModeScheme());
  });
  return (
    <SessionProvider sessionId="dnd5e-app">
      <AppConfig appIndexURL={APP_INDEX_URL} appVocabURL={APP_VOCAB_URL}>
        <Component {...pageProps} />
      </AppConfig>
    </SessionProvider>
  );
}
