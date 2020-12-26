import { getRedirectURL } from "../../windowHelpers";
import { getMessage } from "../translation";
import { AppModel } from "../app";

// eslint-disable-next-line import/prefer-default-export
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
