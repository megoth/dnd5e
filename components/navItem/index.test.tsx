import * as routerFns from "next/router";
import { render } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import Link from "next/link";
import NavItem, { TESTID_NAV_ITEM_LINK } from "./index";
import mockAppHook from "../../__testUtils/mockAppHook";
import useApp from "../../src/hooks/useApp";
import LayoutProvider from "../../src/contexts/layout";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("next/link");
const mockedLinkComponent = Link as jest.Mock;

describe("NavItem", () => {
  let mockedRouterHook;

  beforeEach(() => mockAppHook(mockedAppHook));
  beforeEach(() => {
    mockedRouterHook = jest.spyOn(routerFns, "useRouter");
  });
  beforeEach(() => {
    mockedLinkComponent.mockImplementation(({ children }) => children);
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

  it("closes the left menu when a link is clicked", () => {
    mockedRouterHook.mockReturnValue({
      asPath: "/href/test",
    });
    const setLeftOpen = jest.fn();
    const { getByTestId } = render(
      <LayoutProvider setLeftOpen={setLeftOpen}>
        <NavItem href="/href" translationId="translationId" />
      </LayoutProvider>
    );
    userEvent.click(getByTestId(TESTID_NAV_ITEM_LINK));
    expect(setLeftOpen).toHaveBeenCalledWith(false);
  });
});
