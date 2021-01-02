import React from "react";
import { render } from "@testing-library/react";
import * as solidUIReactFns from "@inrupt/solid-ui-react";
import * as routerFns from "next/router";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import HomePage from "./index";
import useDataset from "../../src/hooks/useDataset";
import { mockProfileDataset } from "../../__testUtils/mockProfileDataset";
import { mockUnauthenticatedSession } from "../../__testUtils/mockSession";
import mockRouter from "../../__testUtils/mockRouter";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("../../src/hooks/useDataset");
const mockedUseDataset = useDataset as jest.Mock;

describe("HomePage", () => {
  beforeEach(() => mockAppHook(mockedAppHook));
  beforeEach(() => {
    jest
      .spyOn(routerFns, "useRouter")
      .mockReturnValue(mockRouter({ asPath: "/" }));
  });

  it("renders dashboard for authenticated session", () => {
    mockedUseDataset.mockReturnValue(mockProfileDataset());
    const { asFragment } = render(<HomePage />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders splash page for unauthenticated session", () => {
    jest
      .spyOn(solidUIReactFns, "useSession")
      .mockImplementation(() => mockUnauthenticatedSession());
    const { asFragment } = render(<HomePage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
