import React from "react";
import userEvent from "@testing-library/user-event";
import * as solidUIReactFns from "@inrupt/solid-ui-react";
import * as mockRouter from "next-router-mock";
import Unauthenticated from "./index";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import { TESTID_LOGIN_BUTTON } from "../loginButton";
import { appName } from "../../__testUtils/mockApp";
import { getProviders } from "../../src/models/provider";
import { mockUnauthenticatedSession } from "../../__testUtils/mockSession";
import renderApp from "../../__testUtils/renderApp";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("next/router", () => mockRouter);

describe("Unauthenticated", () => {
  let app;
  let unauthenticatedSession;

  beforeEach(() => {
    unauthenticatedSession = mockUnauthenticatedSession();
    jest
      .spyOn(solidUIReactFns, "useSession")
      .mockReturnValue(unauthenticatedSession);
  });
  beforeEach(() => {
    app = mockAppHook(mockedAppHook);
  });

  it("renders", async () => {
    const { asFragment } = renderApp(app, <Unauthenticated />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders a list of predefined IdPs", () => {
    const { getAllByTestId } = renderApp(app, <Unauthenticated />);
    const predefinedIdpButton = getAllByTestId(TESTID_LOGIN_BUTTON)[0];
    userEvent.click(predefinedIdpButton);
    const { login } = unauthenticatedSession;
    expect(login).toHaveBeenCalledWith({
      clientName: appName,
      oidcIssuer: getProviders()[0].loginIri,
      redirectUrl: window.location.href,
    });
  });
});
