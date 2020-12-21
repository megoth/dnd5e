import React from "react";
import { render } from "@testing-library/react";
import useApp from "../../src/hooks/useApp";
import LocaleSelector, { TESTID_LOCALE_SELECTOR_LANGUAGE } from "./index";
import mockAppHook from "../../__testUtils/mockAppHook";
import { mockNorwegianApp } from "../../__testUtils/mockApp";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

describe("LocaleSelector", () => {
  it("renders nothing when only one language is given", () => {
    mockAppHook(mockedAppHook);
    const { asFragment, queryAllByTestId } = render(<LocaleSelector />);
    expect(asFragment()).toMatchSnapshot();
    expect(queryAllByTestId(TESTID_LOCALE_SELECTOR_LANGUAGE)).toHaveLength(0);
  });

  it("renders controls to select other languages if multiple languages are given", () => {
    mockAppHook(mockedAppHook, mockNorwegianApp());
    const { asFragment, queryAllByTestId } = render(<LocaleSelector />);
    expect(asFragment()).toMatchSnapshot();
    expect(queryAllByTestId(TESTID_LOCALE_SELECTOR_LANGUAGE)).toHaveLength(2);
  });
});
