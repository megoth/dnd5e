import * as routerFns from "next/router";
import { render } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import NavItem, { TESTID_NAV_ITEM_SUB_MENU_BUTTON } from "./index";
import mockAppHook from "../../__testUtils/mockAppHook";
import useApp from "../../src/hooks/useApp";
import useLayout from "../../src/hooks/useLayout";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("../../src/hooks/useLayout");
const mockedLayoutHook = useLayout as jest.Mock;

describe("NavItem", () => {
  let setSubMenuOpen;
  let mockedRouterHook;

  beforeEach(() => mockAppHook(mockedAppHook));
  beforeEach(() => {
    setSubMenuOpen = jest.fn();
    mockedLayoutHook.mockReturnValue({ setSubMenuOpen });
  });
  beforeEach(() => {
    mockedRouterHook = jest.spyOn(routerFns, "useRouter");
  });

  it("renders", () => {
    mockedRouterHook.mockReturnValue({ asPath: "/" });
    const { asFragment } = render(
      <NavItem href="/href" translationId="translationId" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders for selected items", () => {
    mockedRouterHook.mockReturnValue({ asPath: "/href" });
    const { asFragment } = render(
      <NavItem href="/href" translationId="translationId" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders for selected child items", () => {
    mockedRouterHook.mockReturnValue({ asPath: "/href/test" });
    const { asFragment } = render(
      <NavItem href="/href" translationId="translationId" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders button for opening the submenu (only for main menu)", () => {
    mockedRouterHook.mockReturnValue({ asPath: "/href/test" });
    const { getByTestId } = render(
      <NavItem href="/href" translationId="translationId" mainNav />
    );
    userEvent.click(getByTestId(TESTID_NAV_ITEM_SUB_MENU_BUTTON));
    expect(setSubMenuOpen).toHaveBeenCalledWith(true);
  });
});
