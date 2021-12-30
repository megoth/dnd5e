import React from "react";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import PageFooter from "./index";
import renderApp from "../../__testUtils/renderApp";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

describe("PageFooter", () => {
  it("renders", () => {
    const app = mockAppHook(mockedAppHook);
    const { asFragment } = renderApp(app, <PageFooter />);
    expect(asFragment()).toMatchSnapshot();
  });
});
