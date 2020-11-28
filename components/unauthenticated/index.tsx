import React, { useState } from "react";
import { LoginButton, useSession } from "@inrupt/solid-ui-react";
import { generateRedirectUrl } from "../../src/windowHelpers";
import Translation from "../translation";
import useTranslations from "../../src/hooks/useTranslations";
import { getDefaultBundle, getMessage } from "../../src/models/translation";
import Loading from "../loading";
import ErrorMessage from "../errorMessage";

export function setupLoginSubmit(login) {
  return (event) => {
    event.preventDefault();
    login({});
  };
}

export default function Unauthenticated() {
  const [providerIri] = useState("https://inrupt.net");
  const { login } = useSession();
  const { data: bundles, error } = useTranslations();

  if (error) {
    return (
      <ErrorMessage error={error}>Failed loading translations</ErrorMessage>
    );
  }

  if (!bundles) {
    return <Loading />;
  }

  const bundle = getDefaultBundle(bundles);
  const authOptions = {
    clientName: getMessage(bundle, "appName"),
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
