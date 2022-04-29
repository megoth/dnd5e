import React from "react";
import * as mockRouter from "next-router-mock";
import AboutPage, { TESTID_ABOUT_PAGE_LANGUAGE_WARNING } from "./index";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import { mockNorwegianApp } from "../../__testUtils/mockApp";
import { mockProfileDataset } from "../../__testUtils/mockProfileDataset";
import useDataset from "../../src/hooks/useDataset";
import renderApp from "../../__testUtils/renderApp";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("../../src/hooks/useDataset");
const mockedUseDataset = useDataset as jest.Mock;

jest.mock("next/router", () => mockRouter);

describe("AboutPage", () => {
  beforeEach(() => {
    mockRouter.default.setCurrentUrl("/about");
  });
  beforeEach(() => mockedUseDataset.mockReturnValue(mockProfileDataset()));

  it("renders", () => {
    const app = mockAppHook(mockedAppHook);
    const { asFragment } = renderApp(app, <AboutPage markdown="# test" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("shows a warning on non-english pages", () => {
    const app = mockAppHook(mockedAppHook, mockNorwegianApp());
    const { asFragment, getByTestId } = renderApp(
      app,
      <AboutPage markdown="# test" />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId(TESTID_ABOUT_PAGE_LANGUAGE_WARNING)).toBeDefined();
  });
});
