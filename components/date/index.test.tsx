import React from "react";
import { render } from "@testing-library/react";
import DateComponent from "./index";

describe("Date", () => {
  it("renders a date", () => {
    const date = new Date(2014, 6, 3);
    const { asFragment } = render(
      <DateComponent dateString={date.toISOString()} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
