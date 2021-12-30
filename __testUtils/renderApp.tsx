import React from "react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { LocalizationProvider, ReactLocalization } from "@fluent/react";
import { getFluentBundles } from "../src/models/language";
import { AppModel } from "../src/models/app";

export default function renderApp(
  app: AppModel,
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
): RenderResult {
  function rerender() {
    return render(
      <LocalizationProvider l10n={new ReactLocalization(getFluentBundles(app))}>
        {ui}
      </LocalizationProvider>,
      options
    );
  }
  const renderResult = rerender();
  return { ...renderResult, rerender };
}
