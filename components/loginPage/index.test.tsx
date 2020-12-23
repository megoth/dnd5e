import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as solidUIReactFns from "@inrupt/solid-ui-react";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import LoginPage, {
  TESTID_LOGIN_PAGE_BUTTON,
  TESTID_LOGIN_PAGE_IDP_FIELD,
  TESTID_LOGIN_PAGE_PREDEFINED_IDP,
  TESTID_LOGIN_PAGE_REMEMBER_CHECKBOX,
} from "./index";
import mockApp, { appName } from "../../__testUtils/mockApp";
import mockResourceBundleMap from "../../__testUtils/mockResourceBundleMap";
import mockFAQsDataset from "../../__testUtils/mockFAQsDataset";
import mockFAQThing from "../../__testUtils/mockFAQThing";
import { mockUnauthenticatedSession } from "../../__testUtils/mockSession";
import { TESTID_ERROR } from "../errorMessage";
import { getProviders } from "../../src/models/provider";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

const app = mockApp({
  resourceBundles: mockResourceBundleMap({
    data: {
      faqs: mockFAQsDataset([
        mockFAQThing("whyLogInWithSolid"),
        mockFAQThing("whatIsSolid"),
        mockFAQThing("whatIsAPod"),
      ]),
    },
  }),
});

describe("LoginPage", () => {
  const idpUrl = "https://example.com";

  let unauthenticatedSession;
  let mockedSessionHook;

  beforeEach(() => mockAppHook(mockedAppHook, app));
  beforeEach(() => {
    unauthenticatedSession = mockUnauthenticatedSession();
    mockedSessionHook = jest
      .spyOn(solidUIReactFns, "useSession")
      .mockImplementation(() => unauthenticatedSession);
  });

  it("renders", () => {
    const { asFragment } = render(<LoginPage />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("offers a form to initiate authentication process", () => {
    const { getByTestId } = render(<LoginPage />);
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
    const { getByTestId } = render(<LoginPage />);
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
    const { getByTestId } = render(<LoginPage />);
    const rememberCheckbox = getByTestId(TESTID_LOGIN_PAGE_REMEMBER_CHECKBOX);
    expect(rememberCheckbox.getAttribute("checked")).toBeDefined();
    const idpField = getByTestId(TESTID_LOGIN_PAGE_IDP_FIELD);
    expect(idpField.getAttribute("value")).toEqual(idpUrl);
  });

  it("does not remember idp if remember me is not checked", () => {
    localStorage.setItem("rememberIdP", "true");
    localStorage.setItem("idp", idpUrl);
    const { getByTestId } = render(<LoginPage />);
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
    const { getByTestId } = render(<LoginPage />);
    const idpField = getByTestId(TESTID_LOGIN_PAGE_IDP_FIELD);
    userEvent.type(idpField, `${idpUrl}{enter}`);
    expect(getByTestId(TESTID_ERROR)).toBeDefined();
  });

  it("renders a list of predefined IdPs", () => {
    const { getAllByTestId } = render(<LoginPage />);
    const predefinedIdpButton = getAllByTestId(
      TESTID_LOGIN_PAGE_PREDEFINED_IDP
    )[0];
    userEvent.click(predefinedIdpButton);
    const { login } = unauthenticatedSession;
    expect(login).toHaveBeenCalledWith({
      clientName: appName,
      oidcIssuer: getProviders()[0].iri,
      redirectUrl: "http://localhost/",
    });
  });
});
