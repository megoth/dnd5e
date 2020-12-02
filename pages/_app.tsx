import React from "react";
import { AppProps } from "next/app";
import "../styles/global.css";
import { SessionProvider } from "@inrupt/solid-ui-react";
import AppConfigProvider from "../src/contexts/appConfig";

const solidBase = process.env.NEXT_PUBLIC_SOLID_BASE || "";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppConfigProvider solidBase={solidBase}>
      <SessionProvider sessionId="dnd5e-app">
        <Component {...pageProps} />
      </SessionProvider>
    </AppConfigProvider>
  );
}
