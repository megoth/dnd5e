import React from "react";
import { render } from "@testing-library/react";
import Layout from "./index";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

describe("Layout", () => {
  beforeEach(() => mockAppHook(mockedAppHook));

  it("renders as non-home by default", () => {
    const { asFragment } = render(<Layout>test</Layout>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("can be rendered as home", () => {
    const { asFragment } = render(<Layout home>test</Layout>);
    expect(asFragment()).toMatchSnapshot();
  });
});
