import * as routerFns from "next/router";
import { render } from "@testing-library/react";
import React from "react";
import Link from "next/link";
import NavItem from "./index";
import mockAppHook from "../../__testUtils/mockAppHook";
import useApp from "../../src/hooks/useApp";

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
});
