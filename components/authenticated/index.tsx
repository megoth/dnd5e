import { useSession } from "@inrupt/solid-ui-react";
import React, { ReactElement } from "react";
import { getThing } from "@inrupt/solid-client";
import useDataset from "../../src/hooks/useDataset";
import Translation from "../translation";
import Loading from "../loading";
import ErrorMessage from "../errorMessage";
import getProfileName from "../../src/models/profile";

export const TESTID_AUTHENTICATED_LOGOUT_BUTTON = "authenticated-logout-button";

export default function Authenticated(): ReactElement {
  const { logout, session } = useSession();
  const { webId } = session.info;
  const { data: profileDataset, error } = useDataset(webId);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!profileDataset) {
    return <Loading />;
  }

  const profile = getThing(profileDataset, webId);
  const name = getProfileName(profile);

  return (
    <>
      <p>
        <Translation id="loggedIn" vars={{ name }} />
      </p>
      <button
        className="button w-full"
        type="button"
        onClick={() => logout()}
        data-testid={TESTID_AUTHENTICATED_LOGOUT_BUTTON}
      >
        <Translation id="logOut" />
      </button>
    </>
  );
}
