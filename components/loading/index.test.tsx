import React from "react";
import { render } from "@testing-library/react";
import Loading from "./index";

describe("Loading", () => {
  it("renders", () => {
    const { asFragment } = render(<Loading />);
    expect(asFragment()).toMatchSnapshot();
  });
});
