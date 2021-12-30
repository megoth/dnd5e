import { LocalizationProvider, ReactLocalization } from "@fluent/react";
import React from "react";
import { render } from "@testing-library/react";
import Translation from "./index";
import mockFluentBundle from "../../__testUtils/mockFluentBundle";
import mockApp, {
  globalTranslationsURL,
  translations,
} from "../../__testUtils/mockApp";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import { defaultLocale } from "../../__testUtils/mockLanguage";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

describe("Translation", () => {
  it("renders translated message", () => {
    const id = "test";
    const message = `This is a test`;
    const fluentBundle = mockFluentBundle({
      ...translations,
      [`${globalTranslationsURL}#${id}`]: message,
    });
    mockAppHook(
      mockedAppHook,
      mockApp({
        fluentBundles: {
          [defaultLocale]: fluentBundle,
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
