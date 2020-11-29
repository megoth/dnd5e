import React from "react";
import { render } from "@testing-library/react";
import AppConfigProvider from "../src/contexts/appConfig";
import mockAppConfig from "./mockAppConfig";

export default function renderWithConfig(ui) {
  const { errorsUrl, translationsUrl } = mockAppConfig();
  return render(
    <AppConfigProvider errorsUrl={errorsUrl} translationsUrl={translationsUrl}>
      {ui}
    </AppConfigProvider>
  );
}
