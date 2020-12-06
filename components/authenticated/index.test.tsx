import React from "react";
import { render } from "@testing-library/react";
import { useSession } from "@inrupt/solid-ui-react";
import Authenticated from "./index";
import { mockProfileDataset } from "../../__testUtils/mockProfileDataset";
import mockDatasetHook from "../../__testUtils/mockDatasetHook";
import useDataset from "../../src/hooks/useDataset";
import { TESTID_LOADING } from "../loading";
import { TESTID_ERROR } from "../errorMessage";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("../../src/hooks/useDataset");
const mockedDatasetHook = useDataset as jest.Mock;

describe("Authenticated", () => {
  beforeEach(() => mockAppHook(mockedAppHook));

  it("renders info about the user and a log out button", () => {
    const { session } = useSession();
    const { webId } = session.info;
    mockDatasetHook(mockedDatasetHook, { data: mockProfileDataset(webId) });
    const { asFragment } = render(<Authenticated />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders loading while fetching profile", () => {
    mockDatasetHook(mockedDatasetHook, { data: null });
    const { asFragment, getByTestId } = render(<Authenticated />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId(TESTID_LOADING)).toBeDefined();
  });

  it("renders error if fetching profile fails", () => {
    mockDatasetHook(mockedDatasetHook, { error: new Error() });
    const { asFragment, getByTestId } = render(<Authenticated />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId(TESTID_ERROR)).toBeDefined();
  });
});
