import React from "react";
import * as routerFns from "next/router";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import useDataset from "../../src/hooks/useDataset";
import { mockProfileDataset } from "../../__testUtils/mockProfileDataset";
import SplashPage from "./index";
import mockRouter from "../../__testUtils/mockRouter";
import renderApp from "../../__testUtils/renderApp";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("../../src/hooks/useDataset");
const mockedUseDataset = useDataset as jest.Mock;

describe("SplashPage", () => {
  beforeEach(() => {
    jest
      .spyOn(routerFns, "useRouter")
      .mockReturnValue(mockRouter({ asPath: "/" }));
  });

  it("renders", () => {
    const app = mockAppHook(mockedAppHook);
    mockedUseDataset.mockReturnValue(mockProfileDataset());
    const { asFragment } = renderApp(app, <SplashPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
