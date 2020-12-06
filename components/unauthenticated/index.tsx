import React, { useState } from "react";
import { LoginButton, useSession } from "@inrupt/solid-ui-react";
import { getRedirectURL } from "../../src/windowHelpers";
import Translation from "../translation";
import { getMessage } from "../../src/models/translation";
import useApp from "../../src/hooks/useApp";

export function setupLoginSubmit(login) {
  return (event) => {
    event.preventDefault();
    login({});
  };
}

export default function Unauthenticated() {
  const app = useApp();
  const [providerIri] = useState("https://inrupt.net");
  const { login } = useSession();
  const authOptions = {
    clientName: getMessage(app, "appName"),
  };

  const handleLoginSubmit = setupLoginSubmit(login);

  return (
    <form onSubmit={handleLoginSubmit}>
      <p>
        <Translation id="loggedOut" />
      </p>
      <LoginButton
        oidcIssuer={providerIri}
        redirectUrl={getRedirectURL("")}
        authOptions={authOptions}
      >
        <button type="submit">
          <Translation id="logIn" />
        </button>
      </LoginButton>
    </form>
  );
}
