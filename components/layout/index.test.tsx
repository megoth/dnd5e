import React from "react";
import { render } from "@testing-library/react";
import Layout from "./index";
import useResourceBundle from "../../src/hooks/useResourceBundle";
import mockResourceBundleHook from "../../__testUtils/mockResourceBundleHook";

jest.mock("../../src/hooks/useResourceBundle");
const mockedResourceBundleHook = useResourceBundle as jest.Mock;

describe("Layout", () => {
  beforeEach(() => mockResourceBundleHook(mockedResourceBundleHook));

  it("renders as non-home by default", () => {
    const { asFragment } = render(<Layout>test</Layout>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("can be rendered as home", () => {
    const { asFragment } = render(<Layout home>test</Layout>);
    expect(asFragment()).toMatchSnapshot();
  });
});
