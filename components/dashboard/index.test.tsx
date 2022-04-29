import React from "react";
import * as mockRouter from "next-router-mock";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import Dashboard from "./index";
import useDataset from "../../src/hooks/useDataset";
import mockDatasetHook from "../../__testUtils/mockDatasetHook";
import { mockProfileDataset } from "../../__testUtils/mockProfileDataset";
import { authenticatedWebId } from "../../__testUtils/mockSession";
import renderApp from "../../__testUtils/renderApp";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("../../src/hooks/useDataset");
const mockedDatasetHook = useDataset as jest.Mock;

jest.mock("next/router", () => mockRouter);

describe("Dashboard", () => {
  beforeEach(() => {
    mockRouter.default.setCurrentUrl(`/signup`);
  });

  it("renders", () => {
    const app = mockAppHook(mockedAppHook);
    mockDatasetHook(mockedDatasetHook, {
      data: mockProfileDataset(authenticatedWebId),
    });
    const { asFragment } = renderApp(app, <Dashboard />);
    expect(asFragment()).toMatchSnapshot();
  });
});
