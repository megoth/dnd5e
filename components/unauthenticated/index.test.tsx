import React from "react";
import { render } from "@testing-library/react";
import Unauthenticated, { setupLoginSubmit } from "./index";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

describe("Unauthenticated", () => {
  it("renders a login form", async () => {
    mockAppHook(mockedAppHook);
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
