import React from "react";
import * as mockRouter from "next-router-mock";
import Link from "next/link";
import NavItem from "./index";
import mockAppHook from "../../__testUtils/mockAppHook";
import useApp from "../../src/hooks/useApp";
import renderApp from "../../__testUtils/renderApp";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("next/link");
const mockedLinkComponent = Link as jest.Mock;

jest.mock("next/router", () => mockRouter);

describe("NavItem", () => {
  let app;

  beforeEach(() => {
    app = mockAppHook(mockedAppHook);
  });
  beforeEach(() => {
    mockedLinkComponent.mockImplementation(({ children }) => children);
  });

  it("renders", () => {
    const { asFragment } = renderApp(
      app,
      <NavItem href="/href" translationId="translationId" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders for selected items", () => {
    mockRouter.default.setCurrentUrl("/href");
    const { asFragment } = renderApp(
      app,
      <NavItem href="/href" translationId="translationId" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders for selected child items", () => {
    mockRouter.default.setCurrentUrl("/href/test");
    const { asFragment } = renderApp(
      app,
      <NavItem href="/href" translationId="translationId" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
