import React from "react";
import { render } from "@testing-library/react";
import AdminPage from "./index";
import mockAppHook from "../../__testUtils/mockAppHook";
import useApp from "../../src/hooks/useApp";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

describe("AdminPage", () => {
  it("renders", () => {
    mockAppHook(mockedAppHook);
    const { asFragment } = render(<AdminPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
