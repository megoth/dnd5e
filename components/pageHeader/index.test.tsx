import React from "react";
import { render } from "@testing-library/react";
import * as routerFns from "next/router";
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
import mockRouter from "../../__testUtils/mockRouter";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("../../src/hooks/useLayout");
const mockedLayoutHook = useLayout as jest.Mock;

describe("PageHeader", () => {
  const authenticatedSession = mockAuthenticatedSession();

  let setLeftOpen;
  let setRightOpen;
  let mockedSessionHook;
  let mockedRouterHook;

  beforeEach(() => mockAppHook(mockedAppHook));
  beforeEach(() => {
    jest
      .spyOn(routerFns, "useRouter")
      .mockReturnValue(mockRouter({ asPath: "/" }));
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
  beforeEach(() => {
    mockedRouterHook = jest.spyOn(routerFns, "useRouter");
  });

  it("renders", () => {
    const { asFragment } = render(<PageHeader />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders button that opens the right menu", () => {
    const { getByTestId } = render(<PageHeader />);
    userEvent.click(getByTestId(TESTID_PAGE_HEADER_RIGHT_MENU_BUTTON));
    expect(setRightOpen).toHaveBeenCalledWith(true);
  });

  it("renders different icon when unauthenticated", () => {
    mockedSessionHook.mockReturnValue(mockUnauthenticatedSession());
    const { asFragment } = render(<PageHeader />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders button that opens the left menu", () => {
    mockedRouterHook.mockReturnValue({ asPath: "/href/test" });
    const { getByTestId } = render(<PageHeader />);
    userEvent.click(getByTestId(TESTID_PAGE_HEADER_LEFT_MENU_BUTTON));
    expect(setLeftOpen).toHaveBeenCalledWith(true);
  });
});
