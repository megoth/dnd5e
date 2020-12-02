import React from "react";
import Unauthenticated, { setupLoginSubmit } from "./index";
import { TESTID_LOADING } from "../loading";
import { TESTID_ERROR } from "../errorMessage";
import renderWithConfig from "../../__testUtils/renderWithConfig";
import useResourceBundle from "../../src/hooks/useResourceBundle";
import mockResourceBundle from "../../__testUtils/mockResourceBundle";

jest.mock("../../src/hooks/useResourceBundle");
const mockedResourceBundleHook = useResourceBundle as jest.Mock;

describe("Unauthenticated", () => {
  it("renders a login form", async () => {
    mockedResourceBundleHook.mockReturnValue({ bundle: mockResourceBundle() });
    const { asFragment } = renderWithConfig(<Unauthenticated />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders loading when translations are not loaded yet", () => {
    mockedResourceBundleHook.mockReturnValue({});
    const { asFragment, getByTestId } = renderWithConfig(<Unauthenticated />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId(TESTID_LOADING)).toBeDefined();
  });

  it("renders an error message if something goes wrong", () => {
    mockedResourceBundleHook.mockReturnValue({
      error: new Error("error"),
    });
    const { asFragment, getByTestId } = renderWithConfig(<Unauthenticated />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId(TESTID_ERROR)).toBeDefined();
  });
});

describe("setupLoginSubmit", () => {
  it("handles login", () => {
    const login = jest.fn();
    const event = { preventDefault: jest.fn() };
    expect(setupLoginSubmit(login)(event)).toBeUndefined();
    expect(event.preventDefault).toHaveBeenCalledWith();
    expect(login).toHaveBeenCalledWith({});
  });
});
