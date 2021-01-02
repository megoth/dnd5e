import React from "react";
import { render } from "@testing-library/react";
import * as solidUIReactFns from "@inrupt/solid-ui-react";
import userEvent from "@testing-library/user-event";
import * as routerFns from "next/router";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import LoginPage from "./index";
import mockApp, { appName } from "../../__testUtils/mockApp";
import mockResourceBundleMap from "../../__testUtils/mockResourceBundleMap";
import mockFAQsDataset from "../../__testUtils/mockFAQsDataset";
import mockFAQThing from "../../__testUtils/mockFAQThing";
import { getProviders } from "../../src/models/provider";
import {
  authenticatedWebId,
  mockAuthenticatedSession,
  mockUnauthenticatedSession,
} from "../../__testUtils/mockSession";
import { TESTID_LOGGED_IN_ALREADY_WARNING } from "../loggedInAlreadyWarning";
import { TESTID_LOGIN_BUTTON } from "../loginButton";
import useDataset from "../../src/hooks/useDataset";
import mockDatasetHook from "../../__testUtils/mockDatasetHook";
import { mockProfileDataset } from "../../__testUtils/mockProfileDataset";
import mockRouter from "../../__testUtils/mockRouter";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("../../src/hooks/useDataset");
const mockedDatasetHook = useDataset as jest.Mock;

const app = mockApp({
  resourceBundles: mockResourceBundleMap({
    data: {
      faqs: mockFAQsDataset([
        mockFAQThing("whyLogInWithSolid"),
        mockFAQThing("whatIsSolid"),
        mockFAQThing("whatIsPod"),
      ]),
    },
  }),
});

describe("LoginPage", () => {
  let unauthenticatedSession;
  let mockedSessionHook;

  beforeEach(() => mockAppHook(mockedAppHook, app));
  beforeEach(() => {
    unauthenticatedSession = mockUnauthenticatedSession();
    mockedSessionHook = jest
      .spyOn(solidUIReactFns, "useSession")
      .mockReturnValue(unauthenticatedSession);
  });
  beforeEach(() =>
    mockDatasetHook(mockedDatasetHook, {
      data: mockProfileDataset(authenticatedWebId),
    })
  );
  beforeEach(() => {
    jest
      .spyOn(routerFns, "useRouter")
      .mockReturnValue(mockRouter({ asPath: "/login" }));
  });

  it("renders", () => {
    const { asFragment } = render(<LoginPage />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders a list of predefined IdPs", () => {
    const { getAllByTestId } = render(<LoginPage />);
    const predefinedIdpButton = getAllByTestId(TESTID_LOGIN_BUTTON)[0];
    userEvent.click(predefinedIdpButton);
    const { login } = unauthenticatedSession;
    expect(login).toHaveBeenCalledWith({
      clientName: appName,
      oidcIssuer: getProviders()[0].loginIri,
      redirectUrl: "http://localhost/",
    });
  });

  it("renders a warning when authenticated", () => {
    mockedSessionHook.mockReturnValue(mockAuthenticatedSession());

    const { asFragment, getByTestId } = render(<LoginPage />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId(TESTID_LOGGED_IN_ALREADY_WARNING)).toBeDefined();
  });
});
