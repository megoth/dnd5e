import React from "react";
import { render } from "@testing-library/react";
import Layout from "./index";
import mockTranslationsHook from "../../__testUtils/mockTranslationsHook";
import useTranslations from "../../src/hooks/useTranslations";
import { TESTID_LOADING } from "../loading";
import { TESTID_ERROR } from "../errorMessage";

jest.mock("../../src/hooks/useTranslations");
const mockedTranslationsHook = useTranslations as jest.Mock;

describe("Layout", () => {
  beforeEach(() => mockTranslationsHook(mockedTranslationsHook));

  it("renders as non-home by default", () => {
    const { asFragment } = render(<Layout>test</Layout>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("can be rendered as home", () => {
    const { asFragment } = render(<Layout home>test</Layout>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders loading while fetching translations", () => {
    mockedTranslationsHook.mockReturnValue({ data: null });
    const { asFragment, getByTestId } = render(<Layout>test</Layout>);
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId(TESTID_LOADING)).toBeDefined();
  });

  it("renders error if something goes wrong", () => {
    mockedTranslationsHook.mockReturnValue({ error: new Error() });
    const { asFragment, getByTestId } = render(<Layout>test</Layout>);
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId(TESTID_ERROR)).toBeDefined();
  });
});
