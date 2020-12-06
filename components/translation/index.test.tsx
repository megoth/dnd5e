import { LocalizationProvider, ReactLocalization } from "@fluent/react";
import React from "react";
import { render } from "@testing-library/react";
import Translation from "./index";
import mockFluentBundle from "../../__testUtils/mockFluentBundle";
import mockApp from "../../__testUtils/mockApp";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

describe("Translation", () => {
  it("renders translated message", () => {
    const id = "test";
    const message = `This is a test`;
    const fluentBundle = mockFluentBundle({
      [id]: message,
    });
    mockAppHook(
      mockedAppHook,
      mockApp({
        fluentBundles: {
          global: [fluentBundle],
        },
      })
    );

    const l10n = new ReactLocalization([fluentBundle]);
    const { asFragment, getByText } = render(
      <LocalizationProvider l10n={l10n}>
        <Translation id={id} />
      </LocalizationProvider>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByText(message)).toBeDefined();
  });
});
