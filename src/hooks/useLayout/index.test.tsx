import React from "react";
import { render } from "@testing-library/react";
import useLayout from "./index";
import LayoutProvider from "../../contexts/layout";

function ChildComponent() {
  const { setSubMenuOpen } = useLayout();
  setSubMenuOpen(true);
  return null;
}

describe("useLayout", () => {
  it("passes setSubMenuOpen", () => {
    const setSubMenuOpen = jest.fn();
    render(
      <LayoutProvider setSubMenuOpen={setSubMenuOpen}>
        <ChildComponent />
      </LayoutProvider>
    );
    expect(setSubMenuOpen).toHaveBeenCalledWith(true);
  });
});
