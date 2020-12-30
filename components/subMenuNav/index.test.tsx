import React from "react";
import { render } from "@testing-library/react";
import * as routerFns from "next/router";
import { NextRouter } from "next/router";
import userEvent from "@testing-library/user-event";
import SubMenuNav, { TESTID_SUB_MENU_NAV_CLOSE_BUTTON } from "./index";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import useLayout from "../../src/hooks/useLayout";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("../../src/hooks/useLayout");
const mockedLayoutHook = useLayout as jest.Mock;

describe("SubMenuNav", () => {
  let setSubMenuOpen;
  let mockedRouterHook;

  beforeEach(() => mockAppHook(mockedAppHook));
  beforeEach(() => {
    mockedRouterHook = jest
      .spyOn(routerFns, "useRouter")
      .mockReturnValue({ asPath: "/admin" } as NextRouter);
  });
  beforeEach(() => {
    setSubMenuOpen = jest.fn();
    mockedLayoutHook.mockReturnValue({ setSubMenuOpen });
  });

  it("renders", () => {
    const { asFragment } = render(<SubMenuNav />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders nothing when there are no pages", () => {
    mockedRouterHook.mockReturnValue({
      asPath: "/",
    });
    const { asFragment } = render(<SubMenuNav />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders a button that closes the sub menu", () => {
    const { getByTestId } = render(<SubMenuNav />);
    userEvent.click(getByTestId(TESTID_SUB_MENU_NAV_CLOSE_BUTTON));
    expect(setSubMenuOpen).toHaveBeenCalledWith(false);
  });

  it("adds an event listener to escape key", () => {
    const { getByTestId } = render(<SubMenuNav />);
    userEvent.type(getByTestId(TESTID_SUB_MENU_NAV_CLOSE_BUTTON), "{esc}");
    expect(setSubMenuOpen).toHaveBeenCalledWith(false);
  });
});
