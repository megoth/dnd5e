import React from "react";
import { render } from "@testing-library/react";
import AboutPage, { TESTID_ABOUT_PAGE_LANGUAGE_WARNING } from "./index";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import { mockNorwegianApp } from "../../__testUtils/mockApp";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

describe("AboutPage", () => {
  it("renders", () => {
    mockAppHook(mockedAppHook);
    const { asFragment } = render(<AboutPage markdown="# test" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("shows a warning on non-english pages", () => {
    mockAppHook(mockedAppHook, mockNorwegianApp());
    const { asFragment, getByTestId } = render(<AboutPage markdown="# test" />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId(TESTID_ABOUT_PAGE_LANGUAGE_WARNING)).toBeDefined();
  });
});
