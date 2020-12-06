import React from "react";
import { render } from "@testing-library/react";
import * as solidUIReactFns from "@inrupt/solid-ui-react";
import Session from "./index";
import { mockUnauthenticatedSession } from "../../__testUtils/mockSession";
import { mockProfileDataset } from "../../__testUtils/mockProfileDataset";
import useDataset from "../../src/hooks/useDataset";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";

jest.mock("../../src/hooks/useDataset");
const mockedUseDataset = useDataset as jest.Mock;

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

describe("Session", () => {
  beforeEach(() => mockAppHook(mockedAppHook));

  it("renders for authenticated state", () => {
    mockedUseDataset.mockReturnValue(mockProfileDataset());
    const { asFragment } = render(<Session />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders for unauthenticated state", () => {
    jest
      .spyOn(solidUIReactFns, "useSession")
      .mockImplementation(() => mockUnauthenticatedSession());
    const { asFragment } = render(<Session />);
    expect(asFragment()).toMatchSnapshot();
  });
});
