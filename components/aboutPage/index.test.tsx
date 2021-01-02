import React from "react";
import { render } from "@testing-library/react";
import * as routerFns from "next/router";
import AboutPage, { TESTID_ABOUT_PAGE_LANGUAGE_WARNING } from "./index";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import { mockNorwegianApp } from "../../__testUtils/mockApp";
import { mockProfileDataset } from "../../__testUtils/mockProfileDataset";
import useDataset from "../../src/hooks/useDataset";
import mockRouter from "../../__testUtils/mockRouter";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("../../src/hooks/useDataset");
const mockedUseDataset = useDataset as jest.Mock;

describe("AboutPage", () => {
  beforeEach(() => {
    jest
      .spyOn(routerFns, "useRouter")
      .mockReturnValue(mockRouter({ asPath: "/admin" }));
  });
  beforeEach(() => mockedUseDataset.mockReturnValue(mockProfileDataset()));

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
