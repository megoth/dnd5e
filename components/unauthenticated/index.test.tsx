import React from "react";
import { render } from "@testing-library/react";
import Unauthenticated, { setupLoginSubmit } from "./index";
import { TESTID_LOADING } from "../loading";
import { TESTID_ERROR } from "../errorMessage";
import mockTranslationsHook from "../../__testUtils/mockTranslationsHook";
import useTranslations from "../../src/hooks/useTranslations";

jest.mock("../../src/hooks/useTranslations");
const mockedTranslationsHook = useTranslations as jest.Mock;

describe("Unauthenticated", () => {
  it("renders a login form", async () => {
    mockTranslationsHook(mockedTranslationsHook);
    const { asFragment } = render(<Unauthenticated />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders loading when translations are not loaded yet", () => {
    mockTranslationsHook(mockedTranslationsHook, { data: null });
    const { asFragment, getByTestId } = render(<Unauthenticated />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId(TESTID_LOADING)).toBeDefined();
  });

  it("renders an error message if something goes wrong", () => {
    mockTranslationsHook(mockedTranslationsHook, {
      error: new Error("error"),
    });
    const { asFragment, getByTestId } = render(<Unauthenticated />);
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
