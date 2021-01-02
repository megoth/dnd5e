import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as solidUIReactFns from "@inrupt/solid-ui-react";
import * as routerFns from "next/router";
import Unauthenticated from "./index";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import { TESTID_LOGIN_BUTTON } from "../loginButton";
import { appName } from "../../__testUtils/mockApp";
import { getProviders } from "../../src/models/provider";
import { mockUnauthenticatedSession } from "../../__testUtils/mockSession";
import mockRouter from "../../__testUtils/mockRouter";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

describe("Unauthenticated", () => {
  let unauthenticatedSession;

  beforeEach(() => {
    jest.spyOn(routerFns, "useRouter").mockReturnValue(mockRouter());
  });
  beforeEach(() => {
    unauthenticatedSession = mockUnauthenticatedSession();
    jest
      .spyOn(solidUIReactFns, "useSession")
      .mockReturnValue(unauthenticatedSession);
  });
  beforeEach(() => mockAppHook(mockedAppHook));

  it("renders", async () => {
    const { asFragment } = render(<Unauthenticated />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders a list of predefined IdPs", () => {
    const { getAllByTestId } = render(<Unauthenticated />);
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
