import React, { ReactNode } from "react";
import AppConfigProvider from "../src/contexts/appConfig";
import mockAppConfig from "./mockAppConfig";

interface Props {
  children: ReactNode;
}

export default function AppConfigWrapper({ children }: Props) {
  const { solidBase } = mockAppConfig();
  return (
    <AppConfigProvider solidBase={solidBase}>{children}</AppConfigProvider>
  );
}
