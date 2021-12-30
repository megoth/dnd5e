import React, { useEffect } from "react";
import { act, render } from "@testing-library/react";
import swipeableFns from "react-swipeable";
import { SwipeableHandlers } from "react-swipeable/src/types";
import userEvent from "@testing-library/user-event";
import * as routerFns from "next/router";
import Layout, { TESTID_LAYOUT_FADE } from "./index";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import useDataset from "../../src/hooks/useDataset";
import mockDatasetHook from "../../__testUtils/mockDatasetHook";
import { mockProfileDataset } from "../../__testUtils/mockProfileDataset";
import { authenticatedWebId } from "../../__testUtils/mockSession";
import useLayout from "../../src/hooks/useLayout";
import { SetMenuOpen } from "../../src/contexts/layout";
import mockRouter from "../../__testUtils/mockRouter";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("../../src/hooks/useDataset");
const mockedDatasetHook = useDataset as jest.Mock;

interface Props {
  setLeftOpen: SetMenuOpen;
  setRightOpen: SetMenuOpen;
}

function ChildComponent({ setLeftOpen, setRightOpen }: Props) {
  const { leftOpen, rightOpen } = useLayout();
  useEffect(() => {
    setLeftOpen(leftOpen);
    setRightOpen(rightOpen);
  }, [leftOpen, rightOpen, setLeftOpen, setRightOpen]);
  return null;
}

describe("Layout", () => {
  let mockedSwipeableHook;
  let mockedRouterHook;

  beforeEach(() => mockAppHook(mockedAppHook));
  beforeEach(() => {
    mockedSwipeableHook = jest
      .spyOn(swipeableFns, "useSwipeable")
      .mockReturnValue({} as SwipeableHandlers);
  });
  beforeEach(() => {
    mockDatasetHook(mockedDatasetHook, {
      data: mockProfileDataset(authenticatedWebId),
    });
  });
  beforeEach(() => {
    mockedRouterHook = jest
      .spyOn(routerFns, "useRouter")
      .mockReturnValue(mockRouter());
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
    const setLeftOpen = jest.fn();
    const setRightOpen = jest.fn();
    const { getByTestId } = render(
      <Layout>
        <ChildComponent setLeftOpen={setLeftOpen} setRightOpen={setRightOpen} />
      </Layout>
    );
    expect(mockedSwipeableHook).toHaveBeenCalledWith({
      onSwipedLeft: expect.any(Function),
      onSwipedRight: expect.any(Function),
    });
    act(() => mockedSwipeableHook.mock.calls[0][0].onSwipedRight());
    expect(setLeftOpen.mock.calls[1][0]).toBe(true);
    expect(setRightOpen.mock.calls[1][0]).toBe(false);
    act(() => mockedSwipeableHook.mock.calls[0][0].onSwipedLeft());
    expect(setLeftOpen.mock.calls[2][0]).toBe(false);
    expect(setRightOpen.mock.calls[2][0]).toBe(true);
    userEvent.click(getByTestId(TESTID_LAYOUT_FADE));
  });

  it("renders a fade as backdrop for the menus", () => {
    const setLeftOpen = jest.fn();
    const setRightOpen = jest.fn();
    const { getByTestId } = render(
      <Layout>
        <ChildComponent setLeftOpen={setLeftOpen} setRightOpen={setRightOpen} />
      </Layout>
    );
    act(() => mockedSwipeableHook.mock.calls[0][0].onSwipedRight());
    const fade = getByTestId(TESTID_LAYOUT_FADE);
    expect(fade).not.toBeNull();
    userEvent.click(fade);
    expect(setLeftOpen.mock.calls[2][0]).toBe(false);
    expect(setRightOpen.mock.calls[2][0]).toBe(false);
  });

  it("closes menus when router change", () => {
    const setLeftOpen = jest.fn();
    const setRightOpen = jest.fn();
    const { rerender } = render(
      <Layout>
        <ChildComponent setLeftOpen={setLeftOpen} setRightOpen={setRightOpen} />
      </Layout>
    );
    mockedRouterHook.mockReturnValue(mockRouter({ asPath: "/#test" }));
    rerender(<Layout full>test</Layout>);
    expect(setLeftOpen).toHaveBeenCalledWith(false);
    expect(setRightOpen).toHaveBeenCalledWith(false);
    localStorage.setItem("right-menu-open", "true");
    rerender(<Layout full={false}>test</Layout>);
    expect(setLeftOpen).toHaveBeenCalledWith(false);
    expect(setRightOpen).toHaveBeenCalledWith(false);
  });
});
