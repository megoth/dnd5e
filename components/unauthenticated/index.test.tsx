import React from "react";
import { render } from "@testing-library/react";
import Unauthenticated, { setupLoginSubmit } from "./index";
import useResourceBundle from "../../src/hooks/useResourceBundle";
import mockResourceBundleHook from "../../__testUtils/mockResourceBundleHook";

jest.mock("../../src/hooks/useResourceBundle");
const mockedResourceBundleHook = useResourceBundle as jest.Mock;

describe("Unauthenticated", () => {
  it("renders a login form", async () => {
    mockResourceBundleHook(mockedResourceBundleHook);
    const { asFragment } = render(<Unauthenticated />);
    expect(asFragment()).toMatchSnapshot();
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
