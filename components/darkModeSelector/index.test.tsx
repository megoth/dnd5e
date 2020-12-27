import { render } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import { afterEach } from "@jest/globals";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import DarkModeSelector, { TESTID_DARK_MODE_SELECTOR_BUTTON } from "./index";
import * as windowFns from "../../src/windowHelpers";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

describe("DarkModeSelector", () => {
  let mockedPrefersDarkModeSchema;

  beforeEach(() => mockAppHook(mockedAppHook));
  beforeEach(() => {
    mockedPrefersDarkModeSchema = jest
      .spyOn(windowFns, "prefersDarkModeScheme")
      .mockReturnValue(false);
  });

  it("renders", () => {
    const { asFragment } = render(<DarkModeSelector />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders for dark mode", () => {
    mockedPrefersDarkModeSchema.mockReturnValue(true);
    const { asFragment } = render(<DarkModeSelector />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("allows setting dark mode explicitly", () => {
    const { getByTestId } = render(<DarkModeSelector />);
    const button = getByTestId(TESTID_DARK_MODE_SELECTOR_BUTTON);

    userEvent.click(button);
    expect(
      document.querySelector("html").classList.contains("dark")
    ).toBeTruthy();
    expect(localStorage.getItem("darkMode")).toBe("true");

    userEvent.click(button);
    expect(
      document.querySelector("html").classList.contains("dark")
    ).toBeFalsy();
    expect(localStorage.getItem("darkMode")).toBe("false");
  });
});
