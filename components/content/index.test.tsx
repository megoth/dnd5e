import React from "react";
import { render } from "@testing-library/react";
import Content from "./index";

describe("Content", () => {
  it("renders", () => {
    const { asFragment } = render(<Content>test</Content>);
    expect(asFragment()).toMatchSnapshot();
  });
});
