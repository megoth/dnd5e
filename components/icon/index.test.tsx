import React from "react";
import { render } from "@testing-library/react";
import Icon from "./index";

describe("Icon", () => {
  it("renders icons", () => {
    expect(render(<Icon name="close" />).asFragment()).toMatchSnapshot();
    expect(render(<Icon name="menu" />).asFragment()).toMatchSnapshot();
  });
});
