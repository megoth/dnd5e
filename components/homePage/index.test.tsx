import React from "react";
import * as solidUIReactFns from "@inrupt/solid-ui-react";
import * as mockRouter from "next-router-mock";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import HomePage from "./index";
import useDataset from "../../src/hooks/useDataset";
import { mockProfileDataset } from "../../__testUtils/mockProfileDataset";
import { mockUnauthenticatedSession } from "../../__testUtils/mockSession";
import renderApp from "../../__testUtils/renderApp";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("../../src/hooks/useDataset");
const mockedUseDataset = useDataset as jest.Mock;

jest.mock("next/router", () => mockRouter);

describe("HomePage", () => {
  let app;

  beforeEach(() => {
    app = mockAppHook(mockedAppHook);
  });

  it("renders dashboard for authenticated session", () => {
    mockedUseDataset.mockReturnValue(mockProfileDataset());
    const { asFragment } = renderApp(app, <HomePage />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders splash page for unauthenticated session", () => {
    jest
      .spyOn(solidUIReactFns, "useSession")
      .mockImplementation(() => mockUnauthenticatedSession());
    const { asFragment } = renderApp(app, <HomePage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
