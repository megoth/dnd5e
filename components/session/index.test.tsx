import React from "react";
import { render } from "@testing-library/react";
import * as solidUIReactFns from "@inrupt/solid-ui-react";
import Session from "./index";
import { mockUnauthenticatedSession } from "../../__testUtils/mockSession";
import { mockProfileDataset } from "../../__testUtils/mockProfileDataset";
import useDataset from "../../src/hooks/useDataset";

jest.mock("../../src/hooks/useDataset");
const mockedUseDataset = useDataset as jest.Mock;

describe("Session", () => {
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
