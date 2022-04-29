import React from "react";
import * as mockRouter from "next-router-mock";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import useDataset from "../../src/hooks/useDataset";
import { mockProfileDataset } from "../../__testUtils/mockProfileDataset";
import SplashPage from "./index";
import renderApp from "../../__testUtils/renderApp";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("../../src/hooks/useDataset");
const mockedUseDataset = useDataset as jest.Mock;

jest.mock("next/router", () => mockRouter);

describe("SplashPage", () => {
  it("renders", () => {
    const app = mockAppHook(mockedAppHook);
    mockedUseDataset.mockReturnValue(mockProfileDataset());
    const { asFragment } = renderApp(app, <SplashPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
