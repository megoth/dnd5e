import React, { useState } from "react";
import { LoginButton, useSession } from "@inrupt/solid-ui-react";
import { generateRedirectUrl } from "../../src/windowHelpers";
import Translation from "../translation";
import {
  getDefaultTranslationBundle,
  getMessage,
} from "../../src/models/translation";
import Loading from "../loading";
import ErrorMessage from "../errorMessage";
import useResourceBundle from "../../src/hooks/useResourceBundle";

export function setupLoginSubmit(login) {
  return (event) => {
    event.preventDefault();
    login({});
  };
}

export default function Unauthenticated() {
  const [providerIri] = useState("https://inrupt.net");
  const { login } = useSession();
  const { data: resourceBundle, error } = useResourceBundle("global");

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!resourceBundle) {
    return <Loading />;
  }

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
        redirectUrl={generateRedirectUrl("")}
        authOptions={authOptions}
      >
        <button type="submit">
          <Translation id="logIn" />
        </button>
      </LoginButton>
    </form>
  );
}
