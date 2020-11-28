import React from "react";
import { render } from "@testing-library/react";
import ErrorMessage from "./index";

describe("ErrorMessage", () => {
  it("renders", () => {
    const { asFragment } = render(
      <ErrorMessage error={new Error("test 1")}>test 2</ErrorMessage>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
