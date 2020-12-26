import { useSession } from "@inrupt/solid-ui-react";
import React, { HTMLAttributes } from "react";
import { getThing } from "@inrupt/solid-client";
import WarningMessage from "../warningMessage";
import Translation from "../translation";
import useDataset from "../../src/hooks/useDataset";
import ErrorMessage from "../errorMessage";
import Loading from "../loading";
import getProfileName from "../../src/models/profile";

export const TESTID_LOGGED_IN_ALREADY_WARNING = "logged-in-already-warning";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function LoggedInAlreadyWarning({ ...props }: Props) {
  const { session } = useSession();
  const { isLoggedIn, webId } = session.info;
  const { data: profileDataset, error } = useDataset(webId);

  if (!isLoggedIn) {
    return null;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!profileDataset) {
    return <Loading />;
  }

  const profile = getThing(profileDataset, webId);
  const name = getProfileName(profile);

  return (
    isLoggedIn && (
      <div data-testid={TESTID_LOGGED_IN_ALREADY_WARNING} {...props}>
        <WarningMessage>
          <Translation id="LoggedInAlready" vars={{ name }} />
        </WarningMessage>
      </div>
    )
  );
}
