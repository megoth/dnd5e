import { LocalizationProvider, ReactLocalization } from "@fluent/react";
import { render } from "@testing-library/react";
import React from "react";
import Translation from "./index";
import mockFluentBundle from "../../__testUtils/mockFluentBundle";

describe("Translation", () => {
  it("renders translated message", () => {
    const id = "test";
    const message = `This is a test`;
    const bundle = mockFluentBundle({
      [id]: message,
    });
    const l10n = new ReactLocalization([bundle]);
    const { asFragment, getByText } = render(
      <LocalizationProvider l10n={l10n}>
        <Translation id={id} />
      </LocalizationProvider>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByText(message)).toBeDefined();
  });
});
