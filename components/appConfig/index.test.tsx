import React from "react";
import { render } from "@testing-library/react";
import useResourceBundleLoader from "../../src/hooks/useResourceBundleLoader";
import AppConfig from "./index";
import mockResourceBundleLoaderHook from "../../__testUtils/mockResourceBundleLoaderHook";
import { TESTID_ERROR } from "../errorMessage";
import useResourceBundle from "../../src/hooks/useResourceBundle";
import mockResourceBundle from "../../__testUtils/mockResourceBundle";
import { TESTID_LOADING } from "../loading";
import {
  appIndexURL,
  appVocabURL,
} from "../../__testUtils/mockAppIndexDataset";

jest.mock("../../src/hooks/useResourceBundleLoader");
const mockedResourceBundleLoaderHook = useResourceBundleLoader as jest.Mock;

jest.mock("../../src/hooks/useResourceBundle");
const mockedResourceBundleHook = useResourceBundle as jest.Mock;

const resourceBundle = mockResourceBundle();

describe("AppConfig", () => {
  beforeEach(() =>
    mockedResourceBundleHook.mockReturnValue({ resourceBundle })
  );

  it("loads resources and renders", () => {
    mockResourceBundleLoaderHook(mockedResourceBundleLoaderHook, {
      data: resourceBundle,
    });
    const { asFragment } = render(
      <AppConfig appIndexURL={appIndexURL} appVocabURL={appVocabURL}>
        test
      </AppConfig>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(mockedResourceBundleLoaderHook).toHaveBeenCalledWith(
      "global",
      appIndexURL,
      appVocabURL
    );
  });

  it("displays error if it fails to load resourceBundles", () => {
    mockResourceBundleLoaderHook(mockedResourceBundleLoaderHook, {
      error: new Error(),
    });
    const { asFragment, getByTestId } = render(
      <AppConfig appIndexURL={appIndexURL} appVocabURL={appVocabURL}>
        test
      </AppConfig>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId(TESTID_ERROR)).toBeDefined();
  });

  it("displays loading while resourceBundles are loading", () => {
    mockResourceBundleLoaderHook(mockedResourceBundleLoaderHook, {
      data: null,
    });
    const { asFragment, getByTestId } = render(
      <AppConfig appIndexURL={appIndexURL} appVocabURL={appVocabURL}>
        test
      </AppConfig>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId(TESTID_LOADING)).toBeDefined();
  });
});
