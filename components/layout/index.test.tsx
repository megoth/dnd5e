import React from "react";
import { render } from "@testing-library/react";
import Layout from "./index";

describe("Layout", () => {
  it("renders as non-home by default", () => {
    const { asFragment } = render(<Layout>test</Layout>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("can be rendered as home", () => {
    const { asFragment } = render(<Layout home>test</Layout>);
    expect(asFragment()).toMatchSnapshot();
  });
});
