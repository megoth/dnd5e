import React from "react";
import { act, render } from "@testing-library/react";
import { NextRouter } from "next/router";
import * as routerFns from "next/router";
import swipeableFns from "react-swipeable";
import { SwipeableHandlers } from "react-swipeable/src/types";
import userEvent from "@testing-library/user-event";
import Layout, { TESTID_LAYOUT_FADE, TESTID_LAYOUT_SUB_MENU } from "./index";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

describe("Layout", () => {
  let mockedSwipeableHook;

  beforeEach(() => mockAppHook(mockedAppHook));
  beforeEach(() => {
    jest
      .spyOn(routerFns, "useRouter")
      .mockReturnValue({ asPath: "/" } as NextRouter);
  });
  beforeEach(() => {
    mockedSwipeableHook = jest
      .spyOn(swipeableFns, "useSwipeable")
      .mockReturnValue({} as SwipeableHandlers);
  });

  it("renders as non-home by default", () => {
    const { asFragment } = render(<Layout>test</Layout>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("can be rendered as home", () => {
    const { asFragment } = render(<Layout full>test</Layout>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("adds event listeners to swipe left and right, which shows and hides sub menu", () => {
    const { getByTestId } = render(<Layout>test</Layout>);
    const subMenu = getByTestId(TESTID_LAYOUT_SUB_MENU);
    expect(mockedSwipeableHook).toHaveBeenCalledWith({
      onSwipedLeft: expect.any(Function),
      onSwipedRight: expect.any(Function),
    });
    expect(subMenu.classList.contains("hidden")).toBeTruthy();
    act(() => mockedSwipeableHook.mock.calls[0][0].onSwipedRight());
    expect(subMenu.classList.contains("hidden")).toBeFalsy();
    act(() => mockedSwipeableHook.mock.calls[0][0].onSwipedLeft());
    expect(subMenu.classList.contains("hidden")).toBeTruthy();
  });

  it("renders a fade as backdrop for sub menu", () => {
    const { getByTestId } = render(<Layout>test</Layout>);
    const subMenu = getByTestId(TESTID_LAYOUT_SUB_MENU);
    const fade = getByTestId(TESTID_LAYOUT_FADE);
    act(() => mockedSwipeableHook.mock.calls[0][0].onSwipedRight());
    expect(subMenu.classList.contains("hidden")).toBeFalsy();
    expect(fade).toBeDefined();
    userEvent.click(fade);
    expect(subMenu.classList.contains("hidden")).toBeTruthy();
  });
});
