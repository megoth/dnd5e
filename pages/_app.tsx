import { AppProps } from "next/app";
import "../styles/global.css";
import { SessionProvider } from "@inrupt/solid-ui-react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider sessionId="dnd5e-app">
      <Component {...pageProps} />
    </SessionProvider>
  );
}
