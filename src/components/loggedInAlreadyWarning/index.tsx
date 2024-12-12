import React, { HTMLAttributes } from "react";
import WarningMessage from "../warningMessage";
import Translation from "../translation";
import Loading from "../loading";
import { useSolidAuth, useSubject } from "@ldo/solid-react";
import { SolidProfileShapeType } from "../../ldo/solidProfile.shapeTypes";

export const TESTID_LOGGED_IN_ALREADY_WARNING = "logged-in-already-warning";

export default function LoggedInAlreadyWarning({
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { session } = useSolidAuth();
  const { isLoggedIn, webId } = session;
  const profile = useSubject(SolidProfileShapeType, webId);

  if (!isLoggedIn) {
    return null;
  }

  if (!profile) {
    return <Loading />;
  }

  return (
    isLoggedIn && (
      <div data-testid={TESTID_LOGGED_IN_ALREADY_WARNING} {...props}>
        <WarningMessage>
          <Translation id="LoggedInAlready" vars={{ name: profile.name }} />
        </WarningMessage>
      </div>
    )
  );
}
