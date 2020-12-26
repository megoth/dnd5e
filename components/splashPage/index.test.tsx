import React from "react";
import { render } from "@testing-library/react";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import useDataset from "../../src/hooks/useDataset";
import { mockProfileDataset } from "../../__testUtils/mockProfileDataset";
import SplashPage from "./index";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("../../src/hooks/useDataset");
const mockedUseDataset = useDataset as jest.Mock;

describe("SplashPage", () => {
  it("renders", () => {
    mockAppHook(mockedAppHook);
    mockedUseDataset.mockReturnValue(mockProfileDataset());
    const { asFragment } = render(<SplashPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
