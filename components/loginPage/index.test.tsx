import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as solidUIReactFns from "@inrupt/solid-ui-react";
import { createRouter } from "next/router";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import LoginPage, {
  TESTID_LOGIN_PAGE_BUTTON,
  TESTID_LOGIN_PAGE_IDP_FIELD,
  TESTID_LOGIN_PAGE_REMEMBER_CHECKBOX,
} from "./index";
import mockApp, { appName } from "../../__testUtils/mockApp";
import mockResourceBundleMap from "../../__testUtils/mockResourceBundleMap";
import mockFAQsDataset from "../../__testUtils/mockFAQsDataset";
import mockFAQThing from "../../__testUtils/mockFAQThing";
import {
  authenticatedWebId,
  mockAuthenticatedSession,
  mockUnauthenticatedSession,
} from "../../__testUtils/mockSession";
import { TESTID_ERROR } from "../errorMessage";
import { getProviders } from "../../src/models/provider";
import { TESTID_LOGIN_BUTTON } from "../loginButton";
import { TESTID_LOGGED_IN_ALREADY_WARNING } from "../loggedInAlreadyWarning";
import useDataset from "../../src/hooks/useDataset";
import mockDatasetHook from "../../__testUtils/mockDatasetHook";
import { mockProfileDataset } from "../../__testUtils/mockProfileDataset";

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
  const idpUrl = "https://example.com";
  const idp1 = "http://example1.com";
  const idp2 = "http://example2.com";
  // @ts-ignore
  const router = createRouter("", {}, "", {});
  // @ts-ignore
  const routerWithIdp = createRouter("", { idp: [idp1, idp2] }, "", {});

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

  it("renders", () => {
    const { asFragment } = render(
      <RouterContext.Provider value={router}>
        <LoginPage />
      </RouterContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("offers a form to initiate authentication process", () => {
    const { getByTestId } = render(
      <RouterContext.Provider value={router}>
        <LoginPage />
      </RouterContext.Provider>
    );
    const idpField = getByTestId(TESTID_LOGIN_PAGE_IDP_FIELD);
    userEvent.type(idpField, `${idpUrl}{enter}`);
    const { login } = unauthenticatedSession;
    expect(login).toHaveBeenCalledWith({
      clientName: appName,
      oidcIssuer: idpUrl,
      redirectUrl: "http://localhost/",
    });
  });

  it("offers the option to remember the IdP for later", () => {
    const { getByTestId } = render(
      <RouterContext.Provider value={router}>
        <LoginPage />
      </RouterContext.Provider>
    );
    const rememberCheckbox = getByTestId(TESTID_LOGIN_PAGE_REMEMBER_CHECKBOX);
    userEvent.click(rememberCheckbox);
    const idpField = getByTestId(TESTID_LOGIN_PAGE_IDP_FIELD);
    userEvent.type(idpField, `${idpUrl}{enter}`);
    expect(localStorage.getItem("rememberIdP")).toEqual("true");
    expect(localStorage.getItem("idp")).toEqual(idpUrl);
  });

  it("restores states from localStorage if opted-in", () => {
    localStorage.setItem("rememberIdP", "true");
    localStorage.setItem("idp", idpUrl);
    const { getByTestId } = render(
      <RouterContext.Provider value={router}>
        <LoginPage />
      </RouterContext.Provider>
    );
    const rememberCheckbox = getByTestId(TESTID_LOGIN_PAGE_REMEMBER_CHECKBOX);
    expect(rememberCheckbox.getAttribute("checked")).toBeDefined();
    const idpField = getByTestId(TESTID_LOGIN_PAGE_IDP_FIELD);
    expect(idpField.getAttribute("value")).toEqual(idpUrl);
  });

  it("does not remember idp if remember me is not checked", () => {
    localStorage.setItem("rememberIdP", "true");
    localStorage.setItem("idp", idpUrl);
    const { getByTestId } = render(
      <RouterContext.Provider value={router}>
        <LoginPage />
      </RouterContext.Provider>
    );
    const rememberCheckbox = getByTestId(TESTID_LOGIN_PAGE_REMEMBER_CHECKBOX);
    userEvent.click(rememberCheckbox);
    const submitButton = getByTestId(TESTID_LOGIN_PAGE_BUTTON);
    userEvent.click(submitButton);
    expect(localStorage.getItem("rememberIdP")).toEqual("false");
    expect(localStorage.getItem("idp")).toBeNull();
  });

  it("renders an error if something goes wrong", () => {
    mockedSessionHook.mockReturnValue(
      mockUnauthenticatedSession({
        login: () => {
          throw new Error();
        },
      })
    );
    const { getByTestId } = render(
      <RouterContext.Provider value={router}>
        <LoginPage />
      </RouterContext.Provider>
    );
    const idpField = getByTestId(TESTID_LOGIN_PAGE_IDP_FIELD);
    userEvent.type(idpField, `${idpUrl}{enter}`);
    expect(getByTestId(TESTID_ERROR)).toBeDefined();
  });

  it("renders a list of predefined IdPs", () => {
    const { getAllByTestId } = render(
      <RouterContext.Provider value={router}>
        <LoginPage />
      </RouterContext.Provider>
    );
    const predefinedIdpButton = getAllByTestId(TESTID_LOGIN_BUTTON)[0];
    userEvent.click(predefinedIdpButton);
    const { login } = unauthenticatedSession;
    expect(login).toHaveBeenCalledWith({
      clientName: appName,
      oidcIssuer: getProviders()[0].loginIri,
      redirectUrl: "http://localhost/",
    });
  });

  it("can provide IdP via the query param", () => {
    const { getByTestId } = render(
      <RouterContext.Provider value={routerWithIdp}>
        <LoginPage />
      </RouterContext.Provider>
    );
    expect(
      getByTestId(TESTID_LOGIN_PAGE_IDP_FIELD).getAttribute("value")
    ).toEqual(idp1);
  });

  it("focuses on idp field if IdP query is given", () => {
    const { getByTestId } = render(
      <RouterContext.Provider value={routerWithIdp}>
        <LoginPage />
      </RouterContext.Provider>
    );
    expect(getByTestId(TESTID_LOGIN_PAGE_IDP_FIELD)).toEqual(
      document.activeElement
    );
  });

  it("renders a warning when authenticated", () => {
    mockedSessionHook.mockReturnValue(mockAuthenticatedSession());

    const { asFragment, getByTestId } = render(
      <RouterContext.Provider value={router}>
        <LoginPage />
      </RouterContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId(TESTID_LOGGED_IN_ALREADY_WARNING)).toBeDefined();
  });
});
