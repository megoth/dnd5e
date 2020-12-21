import React from "react";
import { render } from "@testing-library/react";
import AboutPage from "./index";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

describe("AboutPage", () => {
  it("renders", () => {
    mockAppHook(mockedAppHook);
    const { asFragment } = render(<AboutPage markdown="# test" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
