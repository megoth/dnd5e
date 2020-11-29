import { LocalizationProvider, ReactLocalization } from "@fluent/react";
import React from "react";
import Translation from "./index";
import mockFluentBundle from "../../__testUtils/mockFluentBundle";
import renderWithConfig from "../../__testUtils/renderWithConfig";
import mockAppConfig from "../../__testUtils/mockAppConfig";

describe("Translation", () => {
  it("renders translated message", () => {
    const { translationsUrl } = mockAppConfig();
    const id = "test";
    const message = `This is a test`;
    const bundle = mockFluentBundle(translationsUrl, {
      [id]: message,
    });
    const l10n = new ReactLocalization([bundle]);
    const { asFragment, getByText } = renderWithConfig(
      <LocalizationProvider l10n={l10n}>
        <Translation id={id} />
      </LocalizationProvider>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByText(message)).toBeDefined();
  });
});
