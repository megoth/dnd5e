import React from "react";
import * as solidUIReactFns from "@inrupt/solid-ui-react";
import * as mockRouter from "next-router-mock";
import useApp from "../../src/hooks/useApp";
import mockApp from "../../__testUtils/mockApp";
import mockResourceBundleMap from "../../__testUtils/mockResourceBundleMap";
import mockFAQsDataset from "../../__testUtils/mockFAQsDataset";
import mockFAQThing from "../../__testUtils/mockFAQThing";
import mockAppHook from "../../__testUtils/mockAppHook";
import SignupPage from "./index";
import useDataset from "../../src/hooks/useDataset";
import mockDatasetHook from "../../__testUtils/mockDatasetHook";
import { mockProfileDataset } from "../../__testUtils/mockProfileDataset";
import {
  authenticatedWebId,
  mockAuthenticatedSession,
  mockUnauthenticatedSession,
} from "../../__testUtils/mockSession";
import { TESTID_LOGGED_IN_ALREADY_WARNING } from "../loggedInAlreadyWarning";
import renderApp from "../../__testUtils/renderApp";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("../../src/hooks/useDataset");
const mockedDatasetHook = useDataset as jest.Mock;

jest.mock("next/router", () => mockRouter);

const app = mockApp({
  resourceBundles: mockResourceBundleMap({
    data: {
      faqs: mockFAQsDataset([
        mockFAQThing("whatIsIdP"),
        mockFAQThing("whatIsPod"),
      ]),
    },
  }),
});

describe("SignupPage", () => {
  let mockedSessionHook;

  beforeEach(() => mockAppHook(mockedAppHook, app));
  beforeEach(() => {
    mockedSessionHook = jest
      .spyOn(solidUIReactFns, "useSession")
      .mockReturnValue(mockUnauthenticatedSession());
  });
  beforeEach(() =>
    mockDatasetHook(mockedDatasetHook, {
      data: mockProfileDataset(authenticatedWebId),
    })
  );
  beforeEach(() => {
    mockRouter.default.setCurrentUrl("/signup");
  });

  it("renders", () => {
    const { asFragment } = renderApp(app, <SignupPage />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders a warning when authenticated", () => {
    mockedSessionHook.mockReturnValue(mockAuthenticatedSession());

    const { asFragment, getByTestId } = renderApp(app, <SignupPage />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId(TESTID_LOGGED_IN_ALREADY_WARNING)).toBeDefined();
  });
});
