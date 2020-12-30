import React from "react";
import { render } from "@testing-library/react";
import * as solidUIReactFns from "@inrupt/solid-ui-react";
import { createRouter } from "next/router";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import HomePage from "./index";
import useDataset from "../../src/hooks/useDataset";
import { mockProfileDataset } from "../../__testUtils/mockProfileDataset";
import { mockUnauthenticatedSession } from "../../__testUtils/mockSession";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("../../src/hooks/useDataset");
const mockedUseDataset = useDataset as jest.Mock;

describe("HomePage", () => {
  // @ts-ignore
  const router = createRouter("", {}, "", {});

  beforeEach(() => mockAppHook(mockedAppHook));

  it("renders dashboard for authenticated session", () => {
    mockedUseDataset.mockReturnValue(mockProfileDataset());
    const { asFragment } = render(
      <RouterContext.Provider value={router}>
        <HomePage />
      </RouterContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders splash page for unauthenticated session", () => {
    jest
      .spyOn(solidUIReactFns, "useSession")
      .mockImplementation(() => mockUnauthenticatedSession());
    const { asFragment } = render(
      <RouterContext.Provider value={router}>
        <HomePage />
      </RouterContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
