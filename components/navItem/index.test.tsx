import * as routerFns from "next/router";
import { render } from "@testing-library/react";
import React from "react";
import Link from "next/link";
import NavItem from "./index";
import mockAppHook from "../../__testUtils/mockAppHook";
import useApp from "../../src/hooks/useApp";
import renderApp from "../../__testUtils/renderApp";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("next/link");
const mockedLinkComponent = Link as jest.Mock;

describe("NavItem", () => {
  let app;
  let mockedRouterHook;

  beforeEach(() => {
    app = mockAppHook(mockedAppHook);
  });
  beforeEach(() => {
    mockedRouterHook = jest.spyOn(routerFns, "useRouter");
  });
  beforeEach(() => {
    mockedLinkComponent.mockImplementation(({ children }) => children);
  });

  it("renders", () => {
    mockedRouterHook.mockReturnValue({ asPath: "/" });
    const { asFragment } = renderApp(
      app,
      <NavItem href="/href" translationId="translationId" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders for selected items", () => {
    mockedRouterHook.mockReturnValue({ asPath: "/href" });
    const { asFragment } = renderApp(
      app,
      <NavItem href="/href" translationId="translationId" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders for selected child items", () => {
    mockedRouterHook.mockReturnValue({ asPath: "/href/test" });
    const { asFragment } = renderApp(
      app,
      <NavItem href="/href" translationId="translationId" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
