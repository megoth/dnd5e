import React from "react";
import useApp from "../../src/hooks/useApp";
import LocaleSelector, { TESTID_LOCALE_SELECTOR_LANGUAGE } from "./index";
import mockAppHook from "../../__testUtils/mockAppHook";
import { mockNorwegianApp } from "../../__testUtils/mockApp";
import renderApp from "../../__testUtils/renderApp";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

describe("LocaleSelector", () => {
  it("renders nothing when only one language is given", () => {
    const app = mockAppHook(mockedAppHook);
    const { asFragment, queryAllByTestId } = renderApp(app, <LocaleSelector />);
    expect(asFragment()).toMatchSnapshot();
    expect(queryAllByTestId(TESTID_LOCALE_SELECTOR_LANGUAGE)).toHaveLength(0);
  });

  it("renders controls to select other languages if multiple languages are given", () => {
    const app = mockAppHook(mockedAppHook, mockNorwegianApp());
    const { asFragment, queryAllByTestId } = renderApp(app, <LocaleSelector />);
    expect(asFragment()).toMatchSnapshot();
    expect(queryAllByTestId(TESTID_LOCALE_SELECTOR_LANGUAGE)).toHaveLength(1);
  });
});
