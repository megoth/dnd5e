import React from "react";
import Layout from "./index";
import { TESTID_LOADING } from "../loading";
import { TESTID_ERROR } from "../errorMessage";
import renderWithConfig from "../../__testUtils/renderWithConfig";
import useResourceBundle from "../../src/hooks/useResourceBundle";
import mockResourceBundleHook from "../../__testUtils/mockResourceBundleHook";

jest.mock("../../src/hooks/useResourceBundle");
const mockedResourceBundleHook = useResourceBundle as jest.Mock;

describe("Layout", () => {
  beforeEach(() => mockResourceBundleHook(mockedResourceBundleHook));

  it("renders as non-home by default", () => {
    const { asFragment } = renderWithConfig(<Layout>test</Layout>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("can be rendered as home", () => {
    const { asFragment } = renderWithConfig(<Layout home>test</Layout>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders loading while fetching resource bundle", () => {
    mockedResourceBundleHook.mockReturnValue({});
    const { asFragment, getByTestId } = renderWithConfig(<Layout>test</Layout>);
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId(TESTID_LOADING)).toBeDefined();
  });

  it("renders error if something goes wrong", () => {
    mockedResourceBundleHook.mockReturnValue({ error: new Error() });
    const { asFragment, getByTestId } = renderWithConfig(<Layout>test</Layout>);
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId(TESTID_ERROR)).toBeDefined();
  });
});
