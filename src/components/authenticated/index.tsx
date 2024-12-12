import React, { ReactElement } from "react";
import Translation from "../translation";
import Loading from "../loading";
import { useSolidAuth } from "@ldo/solid-react";
import Content from "../content";

export const TESTID_AUTHENTICATED_LOGOUT_BUTTON = "authenticated-logout-button";

export default function Authenticated(): ReactElement {
  const {
    logout,
    session: { webId },
  } = useSolidAuth();

  if (!webId) {
    return <Loading />;
  }

  return (
    <Content>
      <p>
        <Translation id="loggedIn" vars={{ name: webId }} />
      </p>
      <button
        className="button w-full"
        type="button"
        onClick={() => logout()}
        data-testid={TESTID_AUTHENTICATED_LOGOUT_BUTTON}
      >
        <Translation id="logOut" />
      </button>
    </Content>
  );
}
