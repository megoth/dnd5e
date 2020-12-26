import { render } from "@testing-library/react";
import React from "react";
import * as solidUIReactFns from "@inrupt/solid-ui-react";
import userEvent from "@testing-library/user-event";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import LoginButton, { TESTID_LOGIN_BUTTON } from "./index";
import { mockUnauthenticatedSession } from "../../__testUtils/mockSession";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

describe("LoginButton", () => {
  const loginIri = "http://example.com";

  let error;
  let login;

  beforeEach(() => mockAppHook(mockedAppHook));
  beforeEach(() => {
    error = new Error();
    login = jest.fn().mockImplementation(() => {
      throw error;
    });
    const unauthenticatedSession = mockUnauthenticatedSession({ login });
    jest
      .spyOn(solidUIReactFns, "useSession")
      .mockImplementation(() => unauthenticatedSession);
  });

  it("renders", () => {
    const { asFragment } = render(
      <LoginButton loginIri={loginIri} className="test">
        test
      </LoginButton>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("logs in via session.login", () => {
    const { getByTestId } = render(
      <LoginButton loginIri={loginIri} className="test">
        test
      </LoginButton>
    );
    userEvent.click(getByTestId(TESTID_LOGIN_BUTTON));
    expect(login).toHaveBeenCalledWith({
      clientName: "Test App",
      oidcIssuer: loginIri,
      redirectUrl: "http://localhost/",
    });
  });

  it("provides an optional onError parameter", () => {
    const onError = jest.fn();
    const { getByTestId } = render(
      <LoginButton loginIri={loginIri} onError={onError}>
        test
      </LoginButton>
    );
    userEvent.click(getByTestId(TESTID_LOGIN_BUTTON));
    expect(onError).toHaveBeenCalledWith(error);
  });
});
