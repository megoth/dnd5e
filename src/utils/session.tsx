import { getLocationHref } from "./windowHelpers";
import { SessionInfo, type SolidAuthFunctions } from "@ldo/solid-react";
import { SyntheticEvent } from "react";

export function userIsAdmin(session: SessionInfo): boolean {
  // TODO: Replace with proper check - hacky for now
  return session.webId === "https://dnd5e.solidcommunity.net/profile/card#me";
}

export async function onIdPSelected(
  oidcIssuer: string,
  login: SolidAuthFunctions["login"],
  onError: (event: SyntheticEvent<HTMLButtonElement, Event>) => void,
  redirectUrl: string = getLocationHref(),
) {
  try {
    await login(oidcIssuer, {
      redirectUrl,
      clientName: "D&D5e Solid App",
    });
  } catch (error) {
    // TODO: Doesn't throw errors yet
    onError(error);
  }
}
