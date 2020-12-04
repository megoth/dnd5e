import React, { useState } from "react";
import { LoginButton, useSession } from "@inrupt/solid-ui-react";
import { generateRedirectURL } from "../../src/windowHelpers";
import Translation from "../translation";
import { getMessage } from "../../src/models/translation";
import useResourceBundle from "../../src/hooks/useResourceBundle";

export function setupLoginSubmit(login) {
  return (event) => {
    event.preventDefault();
    login({});
  };
}

export default function Unauthenticated() {
  const { resourceBundle } = useResourceBundle();
  const [providerIri] = useState("https://inrupt.net");
  const { login } = useSession();
  const authOptions = {
    clientName: getMessage(resourceBundle, "appName"),
  };

  const handleLoginSubmit = setupLoginSubmit(login);

  return (
    <form onSubmit={handleLoginSubmit}>
      <p>
        <Translation id="loggedOut" />
      </p>
      <LoginButton
        oidcIssuer={providerIri}
        redirectUrl={generateRedirectURL("")}
        authOptions={authOptions}
      >
        <button type="submit">
          <Translation id="logIn" />
        </button>
      </LoginButton>
    </form>
  );
}
