import { render } from "@testing-library/react";
import React from "react";
import { createRouter } from "next/router";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import Dashboard from "./index";
import useDataset from "../../src/hooks/useDataset";
import mockDatasetHook from "../../__testUtils/mockDatasetHook";
import { mockProfileDataset } from "../../__testUtils/mockProfileDataset";
import { authenticatedWebId } from "../../__testUtils/mockSession";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("../../src/hooks/useDataset");
const mockedDatasetHook = useDataset as jest.Mock;

describe("Dashboard", () => {
  // @ts-ignore
  const router = createRouter("", {}, "", {});

  it("renders", () => {
    mockAppHook(mockedAppHook);
    mockDatasetHook(mockedDatasetHook, {
      data: mockProfileDataset(authenticatedWebId),
    });
    const { asFragment } = render(
      <RouterContext.Provider value={router}>
        <Dashboard />
      </RouterContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
