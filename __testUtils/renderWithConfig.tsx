import React from "react";
import { render } from "@testing-library/react";
import AppConfigProvider from "../src/contexts/appConfig";
import mockAppConfig from "./mockAppConfig";

export default function renderWithConfig(ui) {
  const appConfig = mockAppConfig();
  return render(
    <AppConfigProvider appConfig={appConfig}>{ui}</AppConfigProvider>
  );
}
