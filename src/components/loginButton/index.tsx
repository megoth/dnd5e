import React, { HTMLAttributes, ReactNode, SyntheticEvent } from "react";
import { onIdPSelected } from "../../utils/session";
import { getRedirectURL } from "../../utils/windowHelpers";
import { useSolidAuth } from "@ldo/solid-react";

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
  onError = () => {},
  redirectURL = getRedirectURL(""),
  ...props
}: Props) {
  const { login } = useSolidAuth();

  return (
    <button
      type="button"
      onClick={() => onIdPSelected(loginIri, login, onError, redirectURL)}
      data-testid={TESTID_LOGIN_BUTTON}
      {...props}
    >
      {children}
    </button>
  );
}
