import React from "react";
import { render } from "@testing-library/react";
import * as solidUIReactFns from "@inrupt/solid-ui-react";
import Session, { setupLoginSubmit } from "./index";
import { mockUnauthenticatedSession } from "../../__testUtils/mockSession";

describe("Session", () => {
  it("renders for authententicated state", () => {
    const { asFragment } = render(<Session />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders for unauthententicated state", () => {
    jest
      .spyOn(solidUIReactFns, "useSession")
      .mockImplementation(() => mockUnauthenticatedSession());
    const { asFragment } = render(<Session />);
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
