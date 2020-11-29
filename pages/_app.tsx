import React from "react";
import { AppProps } from "next/app";
import "../styles/global.css";
import { SessionProvider } from "@inrupt/solid-ui-react";
import AppConfigProvider from "../src/contexts/appConfig";

const errorsUrl = process.env.NEXT_PUBLIC_ERRORS_URL || "";
const solidBaseUrl = process.env.NEXT_PUBLIC_SOLID_BASE_URL || "";
const translationsUrl = process.env.NEXT_PUBLIC_TRANSLATIONS_URL || "";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppConfigProvider
      appConfig={{
        errorsUrl,
        solidBaseUrl,
        translationsUrl,
      }}
    >
      <SessionProvider sessionId="dnd5e-app">
        <Component {...pageProps} />
      </SessionProvider>
    </AppConfigProvider>
  );
}
