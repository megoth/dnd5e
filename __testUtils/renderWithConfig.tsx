import React from "react";
import { render } from "@testing-library/react";
import AppConfigProvider from "../src/contexts/appConfig";
import mockAppConfig from "./mockAppConfig";

export default function renderWithConfig(ui) {
  const { solidBase } = mockAppConfig();
  return render(
    <AppConfigProvider solidBase={solidBase}>{ui}</AppConfigProvider>
  );
}
