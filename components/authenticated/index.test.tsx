import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as solidUIReactFns from "@inrupt/solid-ui-react";
import Authenticated, { TESTID_AUTHENTICATED_LOGOUT_BUTTON } from "./index";
import { mockProfileDataset } from "../../__testUtils/mockProfileDataset";
import mockDatasetHook from "../../__testUtils/mockDatasetHook";
import useDataset from "../../src/hooks/useDataset";
import { TESTID_LOADING } from "../loading";
import { TESTID_ERROR } from "../errorMessage";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import {
  authenticatedWebId,
  mockAuthenticatedSession,
} from "../../__testUtils/mockSession";
import renderApp from "../../__testUtils/renderApp";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("../../src/hooks/useDataset");
const mockedDatasetHook = useDataset as jest.Mock;

describe("Authenticated", () => {
  const data = mockProfileDataset(authenticatedWebId);
  const authenticatedSession = mockAuthenticatedSession();

  let app;

  beforeEach(() => {
    app = mockAppHook(mockedAppHook);
  });
  beforeEach(() => {
    jest
      .spyOn(solidUIReactFns, "useSession")
      .mockReturnValue(authenticatedSession);
  });

  it("renders info about the user and a log out button", () => {
    mockDatasetHook(mockedDatasetHook, { data });
    const { asFragment, queryByTestId } = renderApp(app, <Authenticated />);
    expect(asFragment()).toMatchSnapshot();
    expect(queryByTestId(TESTID_LOADING)).toBeNull();
    expect(queryByTestId(TESTID_ERROR)).toBeNull();
  });

  it("renders loading while fetching profile", () => {
    mockDatasetHook(mockedDatasetHook, { data: null });
    const { asFragment, getByTestId } = renderApp(app, <Authenticated />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId(TESTID_LOADING)).toBeDefined();
  });

  it("renders error if fetching profile fails", () => {
    mockDatasetHook(mockedDatasetHook, { error: new Error() });
    const { asFragment, getByTestId } = renderApp(app, <Authenticated />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId(TESTID_ERROR)).toBeDefined();
  });

  it("renders a logout button", () => {
    mockDatasetHook(mockedDatasetHook, { data });
    const { logout } = authenticatedSession;
    const { getByTestId } = renderApp(app, <Authenticated />);
    userEvent.click(getByTestId(TESTID_AUTHENTICATED_LOGOUT_BUTTON));
    expect(logout).toHaveBeenCalledWith();
  });
});
