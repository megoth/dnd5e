import React from "react";
import * as mockRouter from "next-router-mock";
import userEvent from "@testing-library/user-event";
import * as solidUIReactFns from "@inrupt/solid-ui-react";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import PageHeader, {
  TESTID_PAGE_HEADER_LEFT_MENU_BUTTON,
  TESTID_PAGE_HEADER_RIGHT_MENU_BUTTON,
} from "./index";
import useLayout from "../../src/hooks/useLayout";
import {
  mockAuthenticatedSession,
  mockUnauthenticatedSession,
} from "../../__testUtils/mockSession";
import renderApp from "../../__testUtils/renderApp";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("../../src/hooks/useLayout");
const mockedLayoutHook = useLayout as jest.Mock;

jest.mock("next/router", () => mockRouter);

describe("PageHeader", () => {
  const authenticatedSession = mockAuthenticatedSession();

  let app;
  let setLeftOpen;
  let setRightOpen;
  let mockedSessionHook;

  beforeEach(() => {
    app = mockAppHook(mockedAppHook);
  });
  beforeEach(() => {
    setLeftOpen = jest.fn();
    setRightOpen = jest.fn();
    mockedLayoutHook.mockReturnValue({ setLeftOpen, setRightOpen });
  });
  beforeEach(() => {
    mockedSessionHook = jest
      .spyOn(solidUIReactFns, "useSession")
      .mockReturnValue(authenticatedSession);
  });

  it("renders", () => {
    const { asFragment } = renderApp(app, <PageHeader />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders button that opens the right menu", () => {
    const { getByTestId } = renderApp(app, <PageHeader />);
    userEvent.click(getByTestId(TESTID_PAGE_HEADER_RIGHT_MENU_BUTTON));
    expect(setRightOpen).toHaveBeenCalledWith(true);
  });

  it("renders different icon when unauthenticated", () => {
    mockedSessionHook.mockReturnValue(mockUnauthenticatedSession());
    const { asFragment } = renderApp(app, <PageHeader />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders button that opens the left menu", () => {
    mockRouter.default.setCurrentUrl("/href/test");
    const { getByTestId } = renderApp(app, <PageHeader />);
    userEvent.click(getByTestId(TESTID_PAGE_HEADER_LEFT_MENU_BUTTON));
    expect(setLeftOpen).toHaveBeenCalledWith(true);
  });
});
