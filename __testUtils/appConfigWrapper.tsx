import React, { ReactNode } from "react";
import AppConfigProvider from "../src/contexts/appConfig";
import mockAppConfig from "./mockAppConfig";

interface Props {
  children: ReactNode;
}

export default function AppConfigWrapper({ children }: Props) {
  const { errorsUrl, translationsUrl } = mockAppConfig();
  return (
    <AppConfigProvider errorsUrl={errorsUrl} translationsUrl={translationsUrl}>
      {children}
    </AppConfigProvider>
  );
}
