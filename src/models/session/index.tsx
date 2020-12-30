import { Session } from "@inrupt/solid-client-authn-browser";
import { getRedirectURL } from "../../windowHelpers";
import { getMessage } from "../translation";
import { AppModel } from "../app";

export function userIsAdmin(session: Session): boolean {
  // TODO: Replace with proper check - hacky for now
  return session.info.webId === "https://dnd5e.inrupt.net/profile/card#me";
}

export async function onIdPSelected(
  app: AppModel,
  oidcIssuer: string,
  login: Function,
  onError: Function
) {
  try {
    await login({
      oidcIssuer,
      redirectUrl: getRedirectURL(""),
      clientName: getMessage(app, "appName"),
    });
  } catch (error) {
    // TODO: Doesn't throw errors yet
    onError(error);
  }
}
