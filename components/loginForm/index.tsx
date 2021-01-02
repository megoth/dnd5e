import Link from "next/link";
import React, { createRef, HTMLAttributes, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "@inrupt/solid-ui-react";
import clsx from "clsx";
import { getMessage } from "../../src/models/translation";
import Translation from "../translation";
import useApp from "../../src/hooks/useApp";
import ErrorMessage from "../errorMessage";
import { onIdPSelected } from "../../src/models/session";
import { getRedirectURL } from "../../src/windowHelpers";

export const TESTID_LOGIN_FORM_IDP_FIELD = "login-form-idp-field";
export const TESTID_LOGIN_FORM_REMEMBER_CHECKBOX =
  "login-form-remember-checkbox";
export const TESTID_LOGIN_FORM_BUTTON = "login-form-button";

interface Props extends HTMLAttributes<HTMLFormElement> {
  className?: string;
  redirectURL?: string;
}

export default function LoginForm({ className, redirectURL, ...props }: Props) {
  const app = useApp();
  const router = useRouter();
  const queryIdP: string = Array.isArray(router.query.idp)
    ? router.query.idp[0]
    : router.query.idp;
  const [providerIri, setProviderIri] = useState<string>(
    queryIdP || localStorage.getItem("idp") || ""
  );
  const [rememberIdp, setRememberIdP] = useState<boolean>(
    localStorage.getItem("rememberIdP") === "true" || false
  );
  const [loginError, setLoginError] = useState<Error | null>(null);
  const { login } = useSession();

  const providerFieldRef = createRef<HTMLInputElement>();

  useEffect(() => {
    if (!providerFieldRef || router.query.idp === undefined) return;
    providerFieldRef.current.focus();
  }, [providerFieldRef, router.query.idp]);

  if (loginError) {
    return <ErrorMessage error={loginError} />;
  }

  const onRememberChange = () => {
    const value = !rememberIdp;
    setRememberIdP(value);
    localStorage.setItem("rememberIdP", value.toString());
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (rememberIdp) {
      localStorage.setItem("idp", providerIri);
    } else {
      localStorage.removeItem("idp");
    }
    await onIdPSelected(app, providerIri, login, setLoginError, redirectURL);
  };
  return (
    <form
      onSubmit={onSubmit}
      className={clsx("mt-2 md:mt-0 text-left", className)}
      {...props}
    >
      <img
        src="/logos/solid-emblem.svg"
        alt={getMessage(app, "logInImage")}
        className="mx-auto hidden md:block"
        style={{ maxWidth: 200 }}
      />
      <label htmlFor="idp" className="label">
        <Translation id="solidIdP" />
        <input
          id="idp"
          type="url"
          onChange={(event) => setProviderIri(event.target.value)}
          className="input"
          value={providerIri}
          ref={providerFieldRef}
          required
          placeholder="https://"
          data-testid={TESTID_LOGIN_FORM_IDP_FIELD}
        />
      </label>
      <label htmlFor="rememberIdp" className="label">
        <input
          id="rememberIdp"
          type="checkbox"
          checked={rememberIdp}
          onChange={onRememberChange}
          className="checkbox"
          data-testid={TESTID_LOGIN_FORM_REMEMBER_CHECKBOX}
        />
        <span className="label__text">
          <Translation id="rememberIdP" />
        </span>
      </label>
      <button
        className="button w-full"
        data-testid={TESTID_LOGIN_FORM_BUTTON}
        type="submit"
      >
        <Translation id="logIn" />
      </button>
      <div className="mt-4">
        <Link href="/signup">
          <a className="link">
            <Translation id="signupSolidPrompt" />
          </a>
        </Link>
      </div>
    </form>
  );
}

LoginForm.defaultProps = {
  className: null,
  redirectURL: getRedirectURL(""),
};
