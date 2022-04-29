import React from "react";
import * as mockRouter from "next-router-mock";
import userEvent from "@testing-library/user-event";
import SubMenuNav, { TESTID_SUB_MENU_NAV_CLOSE_BUTTON } from "./index";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import useLayout from "../../src/hooks/useLayout";
import renderApp from "../../__testUtils/renderApp";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("../../src/hooks/useLayout");
const mockedLayoutHook = useLayout as jest.Mock;

jest.mock("next/router", () => mockRouter);

describe("SubMenuNav", () => {
  let app;
  let setLeftOpen;

  beforeEach(() => {
    app = mockAppHook(mockedAppHook);
  });
  beforeEach(() => {
    mockRouter.default.setCurrentUrl("/rules");
  });
  beforeEach(() => {
    setLeftOpen = jest.fn();
    mockedLayoutHook.mockReturnValue({ setLeftOpen });
  });

  it("renders", () => {
    const { asFragment } = renderApp(app, <SubMenuNav />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders a button that closes the sub menu", () => {
    const { getByTestId } = renderApp(app, <SubMenuNav />);
    userEvent.click(getByTestId(TESTID_SUB_MENU_NAV_CLOSE_BUTTON));
    expect(setLeftOpen).toHaveBeenCalledWith(false);
  });

  it("adds an event listener to escape key", () => {
    const { getByTestId } = renderApp(app, <SubMenuNav />);
    userEvent.type(getByTestId(TESTID_SUB_MENU_NAV_CLOSE_BUTTON), "{esc}");
    expect(setLeftOpen).toHaveBeenCalledWith(false);
  });
});
