import React from "react";
import { render } from "@testing-library/react";
import NestedError from "nested-error-stacks";
import ErrorMessage, { TESTID_ERROR_STACK, TESTID_ERROR_TITLE } from "./index";

describe("ErrorMessage", () => {
  it("renders", () => {
    const error1 = new Error("error1");
    const error2 = new NestedError("error2", error1);
    const { asFragment, getByTestId } = render(<ErrorMessage error={error2} />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId(TESTID_ERROR_TITLE).innerHTML).toContain("error2");
    expect(getByTestId(TESTID_ERROR_STACK).innerHTML).toContain("error1");
    expect(getByTestId(TESTID_ERROR_STACK).innerHTML).toContain("error2");
  });
});
