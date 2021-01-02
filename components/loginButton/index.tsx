import React, { HTMLAttributes, ReactNode, SyntheticEvent } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import useApp from "../../src/hooks/useApp";
import { onIdPSelected } from "../../src/models/session";
import { getRedirectURL } from "../../src/windowHelpers";

export const TESTID_LOGIN_BUTTON = "login-button";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loginIri: string;
  onError?: (event: SyntheticEvent<HTMLButtonElement, Event>) => void;
  redirectURL?: string;
}

export default function LoginButton({
  children,
  loginIri,
  onError,
  redirectURL,
  ...props
}: Props) {
  const app = useApp();
  const { login } = useSession();

  return (
    <button
      type="button"
      onClick={() => onIdPSelected(app, loginIri, login, onError, redirectURL)}
      data-testid={TESTID_LOGIN_BUTTON}
      {...props}
    >
      {children}
    </button>
  );
}

LoginButton.defaultProps = {
  onError: () => {},
  redirectURL: getRedirectURL(""),
};
