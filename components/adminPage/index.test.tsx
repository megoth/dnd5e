import React from "react";
import { render } from "@testing-library/react";
import * as routerFns from "next/router";
import AdminPage from "./index";
import mockAppHook from "../../__testUtils/mockAppHook";
import useApp from "../../src/hooks/useApp";
import useDataset from "../../src/hooks/useDataset";
import { mockProfileDataset } from "../../__testUtils/mockProfileDataset";
import mockRouter from "../../__testUtils/mockRouter";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("../../src/hooks/useDataset");
const mockedUseDataset = useDataset as jest.Mock;

describe("AdminPage", () => {
  beforeEach(() => {
    jest
      .spyOn(routerFns, "useRouter")
      .mockReturnValue(mockRouter({ asPath: "/admin" }));
  });
  beforeEach(() => mockedUseDataset.mockReturnValue(mockProfileDataset()));

  it("renders", () => {
    mockAppHook(mockedAppHook);
    const { asFragment } = render(<AdminPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
