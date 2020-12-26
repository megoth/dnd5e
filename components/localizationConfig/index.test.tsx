import React from "react";
import { render } from "@testing-library/react";
import LocalizationConfig, {
  TESTID_LOCALIZATION_CONFIG_NO_ERROR,
} from "./index";
import mockApp, { faqsURL } from "../../__testUtils/mockApp";
import mockResourceBundle, {
  defaultBundle,
} from "../../__testUtils/mockResourceBundle";
import mockDatasetHook from "../../__testUtils/mockDatasetHook";
import useDataset from "../../src/hooks/useDataset";
import { updateAppWithResourceBundle } from "../../src/models/resourceBundle";
import { TESTID_ERROR } from "../errorMessage";
import mockFAQsDataset from "../../__testUtils/mockFAQsDataset";

jest.mock("../../src/hooks/useDataset");
const mockedDatasetHook = useDataset as jest.Mock;

describe("LocalizationConfig", () => {
  const app = mockApp();

  let setApp;

  beforeEach(() => {
    setApp = jest.fn();
  });

  it("updates the app with the loaded data", () => {
    mockDatasetHook(mockedDatasetHook, {
      data: null,
    });
    const { label, locale, urls } = mockResourceBundle();
    const { getByTestId, rerender } = render(
      <LocalizationConfig app={app} bundle={defaultBundle} setApp={setApp} />
    );
    expect(setApp).toHaveBeenCalledWith(
      updateAppWithResourceBundle(app, {
        label,
        locale,
        urls,
        data: {
          errors: null,
          faqs: null,
          localizations: null,
          translations: null,
        },
      })
    );
    expect(getByTestId(TESTID_LOCALIZATION_CONFIG_NO_ERROR)).toBeDefined();
    rerender(
      <LocalizationConfig app={app} bundle={defaultBundle} setApp={setApp} />
    );
    expect(setApp).toHaveBeenCalledTimes(1);
  });

  it("displays an error if anything goes wrong", () => {
    mockDatasetHook(mockedDatasetHook, {
      error: new Error(),
    });
    const { getByTestId } = render(
      <LocalizationConfig app={app} bundle={defaultBundle} setApp={setApp} />
    );
    expect(getByTestId(TESTID_ERROR)).toBeDefined();
  });

  it("shows nothing while waiting for data", () => {
    mockDatasetHook(mockedDatasetHook, {
      data: undefined,
    });
    const { getByTestId } = render(
      <LocalizationConfig app={app} bundle={defaultBundle} setApp={setApp} />
    );
    expect(getByTestId(TESTID_LOCALIZATION_CONFIG_NO_ERROR)).toBeDefined();
    expect(setApp).not.toHaveBeenCalled();
  });
});
