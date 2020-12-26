import React from "react";
import { render } from "@testing-library/react";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import PageFooter from "./index";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

describe("PageFooter", () => {
  it("renders", () => {
    mockAppHook(mockedAppHook);
    const { asFragment } = render(<PageFooter />);
    expect(asFragment()).toMatchSnapshot();
  });
});
