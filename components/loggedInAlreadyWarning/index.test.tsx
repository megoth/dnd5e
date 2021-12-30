import React from "react";
import * as solidUIReactFns from "@inrupt/solid-ui-react";
import LoggedInAlreadyWarning, {
  TESTID_LOGGED_IN_ALREADY_WARNING,
} from "./index";
import useDataset from "../../src/hooks/useDataset";
import mockDatasetHook from "../../__testUtils/mockDatasetHook";
import { mockProfileDataset } from "../../__testUtils/mockProfileDataset";
import {
  authenticatedWebId,
  mockUnauthenticatedSession,
} from "../../__testUtils/mockSession";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import { TESTID_ERROR } from "../errorMessage";
import { TESTID_LOADING } from "../loading";
import renderApp from "../../__testUtils/renderApp";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("../../src/hooks/useDataset");
const mockedDatasetHook = useDataset as jest.Mock;

describe("LoggedInAlreadyWarning", () => {
  let app;

  beforeEach(() => {
    app = mockAppHook(mockedAppHook);
  });
  beforeEach(() =>
    mockDatasetHook(mockedDatasetHook, {
      data: mockProfileDataset(authenticatedWebId),
    })
  );

  it("renders", () => {
    const { asFragment, getByTestId } = renderApp(
      app,
      <LoggedInAlreadyWarning />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId(TESTID_LOGGED_IN_ALREADY_WARNING)).toBeDefined();
  });

  it("renders nothing if unauthenticated", () => {
    jest
      .spyOn(solidUIReactFns, "useSession")
      .mockReturnValue(mockUnauthenticatedSession());
    const { asFragment } = renderApp(app, <LoggedInAlreadyWarning />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders error if it fails to load profile", () => {
    mockDatasetHook(mockedDatasetHook, {
      data: null,
      error: new Error(),
    });
    const { getByTestId } = renderApp(app, <LoggedInAlreadyWarning />);
    expect(getByTestId(TESTID_ERROR)).toBeDefined();
  });

  it("renders error if it fails to load profile", () => {
    mockDatasetHook(mockedDatasetHook, {
      data: null,
      error: new Error(),
    });
    const { getByTestId } = renderApp(app, <LoggedInAlreadyWarning />);
    expect(getByTestId(TESTID_ERROR)).toBeDefined();
  });

  it("renders loading when fetching profile", () => {
    mockDatasetHook(mockedDatasetHook, {
      data: null,
    });
    const { getByTestId } = renderApp(app, <LoggedInAlreadyWarning />);
    expect(getByTestId(TESTID_LOADING)).toBeDefined();
  });
});
