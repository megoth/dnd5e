import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as solidUIReactFns from "@inrupt/solid-ui-react";
import * as routerFns from "next/router";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import { appName } from "../../__testUtils/mockApp";
import { mockUnauthenticatedSession } from "../../__testUtils/mockSession";
import { TESTID_ERROR } from "../errorMessage";
import LoginForm, {
  TESTID_LOGIN_FORM_BUTTON,
  TESTID_LOGIN_FORM_IDP_FIELD,
  TESTID_LOGIN_FORM_REMEMBER_CHECKBOX,
} from "./index";
import mockRouter from "../../__testUtils/mockRouter";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

describe("LoginForm", () => {
  const idpUrl = "https://example.com";
  const idp1 = "http://example1.com";
  const idp2 = "http://example2.com";

  let unauthenticatedSession;
  let mockedSessionHook;
  let mockedRouterHook;

  beforeEach(() => mockAppHook(mockedAppHook));
  beforeEach(() => {
    unauthenticatedSession = mockUnauthenticatedSession();
    mockedSessionHook = jest
      .spyOn(solidUIReactFns, "useSession")
      .mockReturnValue(unauthenticatedSession);
  });
  beforeEach(() => {
    mockedRouterHook = jest
      .spyOn(routerFns, "useRouter")
      .mockReturnValue(mockRouter());
  });

  it("renders", () => {
    const { asFragment } = render(<LoginForm />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("offers a form to initiate authentication process", () => {
    const { getByTestId } = render(<LoginForm />);
    const idpField = getByTestId(TESTID_LOGIN_FORM_IDP_FIELD);
    userEvent.type(idpField, `${idpUrl}{enter}`);
    const { login } = unauthenticatedSession;
    expect(login).toHaveBeenCalledWith({
      clientName: appName,
      oidcIssuer: idpUrl,
      redirectUrl: "http://localhost/",
    });
  });

  it("offers the option to remember the IdP for later", () => {
    const { getByTestId } = render(<LoginForm />);
    const rememberCheckbox = getByTestId(TESTID_LOGIN_FORM_REMEMBER_CHECKBOX);
    userEvent.click(rememberCheckbox);
    const idpField = getByTestId(TESTID_LOGIN_FORM_IDP_FIELD);
    userEvent.type(idpField, `${idpUrl}{enter}`);
    expect(localStorage.getItem("rememberIdP")).toEqual("true");
    expect(localStorage.getItem("idp")).toEqual(idpUrl);
  });

  it("restores states from localStorage if opted-in", () => {
    localStorage.setItem("rememberIdP", "true");
    localStorage.setItem("idp", idpUrl);
    const { getByTestId } = render(<LoginForm />);
    const rememberCheckbox = getByTestId(TESTID_LOGIN_FORM_REMEMBER_CHECKBOX);
    expect(rememberCheckbox.getAttribute("checked")).toBeDefined();
    const idpField = getByTestId(TESTID_LOGIN_FORM_IDP_FIELD);
    expect(idpField.getAttribute("value")).toEqual(idpUrl);
  });

  it("does not remember idp if remember me is not checked", () => {
    localStorage.setItem("rememberIdP", "true");
    localStorage.setItem("idp", idpUrl);
    const { getByTestId } = render(<LoginForm />);
    const rememberCheckbox = getByTestId(TESTID_LOGIN_FORM_REMEMBER_CHECKBOX);
    userEvent.click(rememberCheckbox);
    const submitButton = getByTestId(TESTID_LOGIN_FORM_BUTTON);
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
    const { getByTestId } = render(<LoginForm />);
    const idpField = getByTestId(TESTID_LOGIN_FORM_IDP_FIELD);
    userEvent.type(idpField, `${idpUrl}{enter}`);
    expect(getByTestId(TESTID_ERROR)).toBeDefined();
  });

  it("can provide IdP via the query param", () => {
    mockedRouterHook.mockReturnValue({
      asPath: "/rules",
      query: { idp: idp1 },
    });
    const { getByTestId } = render(<LoginForm />);
    expect(
      getByTestId(TESTID_LOGIN_FORM_IDP_FIELD).getAttribute("value")
    ).toEqual(idp1);
  });

  it("also handles an array of IdPs", () => {
    mockedRouterHook.mockReturnValue({
      asPath: "/rules",
      query: { idp: [idp1, idp2] },
    });
    const { getByTestId } = render(<LoginForm />);
    expect(
      getByTestId(TESTID_LOGIN_FORM_IDP_FIELD).getAttribute("value")
    ).toEqual(idp1);
  });

  it("focuses on idp field if IdP query is given", () => {
    mockedRouterHook.mockReturnValue({
      asPath: "/rules",
      query: { idp: [idp1, idp2] },
    });
    const { getByTestId } = render(<LoginForm />);
    expect(getByTestId(TESTID_LOGIN_FORM_IDP_FIELD)).toEqual(
      document.activeElement
    );
  });
});
