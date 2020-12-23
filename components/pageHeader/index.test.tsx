import React from "react";
import { render } from "@testing-library/react";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import PageHeader from "./index";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

describe("PageHeader", () => {
  it("renders", () => {
    mockAppHook(mockedAppHook);
    const { asFragment } = render(<PageHeader />);
    expect(asFragment()).toMatchSnapshot();
  });
});
