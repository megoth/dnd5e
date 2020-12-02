import { LocalizationProvider, ReactLocalization } from "@fluent/react";
import React from "react";
import Translation from "./index";
import mockFluentBundle from "../../__testUtils/mockFluentBundle";
import renderWithConfig from "../../__testUtils/renderWithConfig";
import mockResourceBundle from "../../__testUtils/mockResourceBundle";
import useResourceBundle from "../../src/hooks/useResourceBundle";
import mockResourceBundleHook from "../../__testUtils/mockResourceBundleHook";

jest.mock("../../src/hooks/useResourceBundle");
const mockedResourceBundleHook = useResourceBundle as jest.Mock;

describe("Translation", () => {
  it("renders translated message", () => {
    const id = "test";
    const message = `This is a test`;
    const { translationsUrl } = mockResourceBundle();
    const fluentBundle = mockFluentBundle(translationsUrl, {
      [id]: message,
    });
    const resourceBundle = mockResourceBundle({
      translationBundles: [fluentBundle],
    });
    mockResourceBundleHook(mockedResourceBundleHook, resourceBundle);

    const l10n = new ReactLocalization([fluentBundle]);
    const { asFragment, getByText } = renderWithConfig(
      <LocalizationProvider l10n={l10n}>
        <Translation id={id} />
      </LocalizationProvider>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByText(message)).toBeDefined();
  });
});
