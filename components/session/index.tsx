import React, { useState } from "react";
import {
  CombinedDataProvider,
  LoginButton,
  LogoutButton,
  Text,
  useSession,
} from "@inrupt/solid-ui-react";
import { vcard } from "rdf-namespaces";
import { generateRedirectUrl } from "../../src/windowHelpers";

export function setupLoginSubmit(login) {
  return (event) => {
    event.preventDefault();
    login({});
  };
}

export default function Session() {
  const { login, session } = useSession();
  const { webId } = session.info;
  const [providerIri] = useState("https://inrupt.net");

  const authOptions = {
    clientName: "Inrupt PodBrowser",
  };

  const handleLoginSubmit = setupLoginSubmit(login);

  return session.info.isLoggedIn ? (
    <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
      <p>
        Logged in as <Text property={vcard.fn} />
      </p>
      <LogoutButton>
        <button type="button">Log out</button>
      </LogoutButton>
    </CombinedDataProvider>
  ) : (
    <form onSubmit={handleLoginSubmit}>
      <p>Not logged in.</p>
      <LoginButton
        oidcIssuer={providerIri}
        redirectUrl={generateRedirectUrl("")}
        authOptions={authOptions}
      >
        <button type="submit">Log In</button>
      </LoginButton>
    </form>
  );
}
