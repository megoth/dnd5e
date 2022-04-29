import React from "react";
import * as mockRouter from "next-router-mock";
import AdminPage from "./index";
import mockAppHook from "../../__testUtils/mockAppHook";
import useApp from "../../src/hooks/useApp";
import useDataset from "../../src/hooks/useDataset";
import { mockProfileDataset } from "../../__testUtils/mockProfileDataset";
import renderApp from "../../__testUtils/renderApp";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("../../src/hooks/useDataset");
const mockedUseDataset = useDataset as jest.Mock;

jest.mock("next/router", () => mockRouter);

describe("AdminPage", () => {
  beforeEach(() => {
    mockRouter.default.setCurrentUrl("/admin");
  });
  beforeEach(() => mockedUseDataset.mockReturnValue(mockProfileDataset()));

  it("renders", () => {
    const app = mockAppHook(mockedAppHook);
    const { asFragment } = renderApp(app, <AdminPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
