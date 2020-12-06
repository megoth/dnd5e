import React from "react";
import { render } from "@testing-library/react";
import useAppLoader from "../../src/hooks/useAppLoader";
import AppConfig from "./index";
import mockAppLoader from "../../__testUtils/mockAppLoader";
import { TESTID_ERROR } from "../errorMessage";
import useApp from "../../src/hooks/useApp";
import mockApp from "../../__testUtils/mockApp";
import { TESTID_LOADING } from "../loading";
import {
  appIndexURL,
  appVocabURL,
} from "../../__testUtils/mockAppIndexDataset";
import mockAppHook from "../../__testUtils/mockAppHook";

jest.mock("../../src/hooks/useAppLoader");
const mockedAppLoaderHook = useAppLoader as jest.Mock;

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

const app = mockApp();

describe("AppConfig", () => {
  beforeEach(() => mockAppHook(mockedAppHook));

  it("loads resources and renders", () => {
    mockAppLoader(mockedAppLoaderHook, {
      data: app,
    });
    const { asFragment } = render(
      <AppConfig appIndexURL={appIndexURL} appVocabURL={appVocabURL}>
        test
      </AppConfig>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(mockedAppLoaderHook).toHaveBeenCalledWith(
      "global",
      appIndexURL,
      appVocabURL
    );
  });

  it("displays error if it fails to load app", () => {
    mockAppHook(mockedAppHook, null);
    mockAppLoader(mockedAppLoaderHook, {
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

  it("displays loading while app is loading", () => {
    mockAppLoader(mockedAppLoaderHook, {
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
