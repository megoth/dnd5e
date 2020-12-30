import React from "react";
import { render } from "@testing-library/react";
import * as routerFns from "next/router";
import { NextRouter } from "next/router";
import solidUIReactFns from "@inrupt/solid-ui-react";
import { Session } from "@inrupt/solid-client-authn-browser";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import MainNav, { TESTID_MAIN_NAV_LIST_ITEM } from "./index";
import { mockAuthenticatedSession } from "../../__testUtils/mockSession";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

describe("MainNav", () => {
  let mockedSessionHook;

  beforeEach(() => mockAppHook(mockedAppHook));
  beforeEach(() => {
    jest
      .spyOn(routerFns, "useRouter")
      .mockReturnValue({ asPath: "/" } as NextRouter);
  });
  beforeEach(() => {
    mockedSessionHook = jest.spyOn(solidUIReactFns, "useSession");
  });

  it("renders", () => {
    const { asFragment, getAllByTestId } = render(<MainNav />);
    expect(asFragment()).toMatchSnapshot();
    expect(getAllByTestId(TESTID_MAIN_NAV_LIST_ITEM)).toHaveLength(2);
  });

  it("renders an extra item for admin", () => {
    mockedSessionHook.mockReturnValue(
      mockAuthenticatedSession({
        session: {
          info: {
            isLoggedIn: true,
            sessionId: "some-authenticated-session-id",
            webId: "https://dnd5e.inrupt.net/profile/card#me", // hacky as hell for now
          },
        } as Session,
      })
    );
    const { asFragment, getAllByTestId } = render(<MainNav />);
    expect(asFragment()).toMatchSnapshot();
    expect(getAllByTestId(TESTID_MAIN_NAV_LIST_ITEM)).toHaveLength(3);
  });
});
