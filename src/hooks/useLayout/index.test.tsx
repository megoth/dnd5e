import React from "react";
import { render } from "@testing-library/react";
import useLayout from "./index";
import LayoutProvider from "../../contexts/layout";

const TESTID_LEFT_OPEN = "left-open";
const TESTID_RIGHT_OPEN = "right-open";

function ChildComponent() {
  const { leftOpen, rightOpen, setLeftOpen, setRightOpen } = useLayout();
  setLeftOpen(leftOpen);
  setRightOpen(rightOpen);
  return (
    <>
      <div data-testid={TESTID_LEFT_OPEN}>{leftOpen.toString()}</div>
      <div data-testid={TESTID_RIGHT_OPEN}>{rightOpen.toString()}</div>
    </>
  );
}

describe("useLayout", () => {
  it("passes setSubMenuOpen", () => {
    const setLeftOpen = jest.fn();
    const setRightOpen = jest.fn();
    const { getByTestId } = render(
      <LayoutProvider
        leftOpen
        rightOpen
        setLeftOpen={setLeftOpen}
        setRightOpen={setRightOpen}
      >
        <ChildComponent />
      </LayoutProvider>
    );
    expect(setLeftOpen).toHaveBeenCalledWith(true);
    expect(setRightOpen).toHaveBeenCalledWith(true);
    expect(getByTestId(TESTID_LEFT_OPEN).innerHTML).toEqual("true");
    expect(getByTestId(TESTID_RIGHT_OPEN).innerHTML).toEqual("true");
  });
});
