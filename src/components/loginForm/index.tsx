import React, { HTMLAttributes, useState } from "react";
import clsx from "clsx";
import Translation from "../translation";
import ErrorMessage from "../errorMessage";
import { onIdPSelected } from "../../utils/session";
import { getRedirectURL } from "../../utils/windowHelpers";
import { useSolidAuth } from "@ldo/solid-react";
import { NavLink, useSearchParams } from "react-router-dom";
import SolidLogo from "../solidLogo";

export const TESTID_LOGIN_FORM_IDP_FIELD = "login-form-idp-field";
export const TESTID_LOGIN_FORM_REMEMBER_CHECKBOX =
  "login-form-remember-checkbox";
export const TESTID_LOGIN_FORM_BUTTON = "login-form-button";

interface Props extends HTMLAttributes<HTMLFormElement> {
  className?: string;
  hideLogo?: boolean;
  redirectURL?: string;
}

export default function LoginForm({
  className,
  hideLogo,
  redirectURL = getRedirectURL(""),
  ...props
}: Props) {
  const [searchParams] = useSearchParams();
  const queryIdP: string = Array.isArray(searchParams.get("idp"))
    ? searchParams.get("idp")[0]
    : searchParams.get("idp");
  const [providerIri, setProviderIri] = useState<string>(
    queryIdP || localStorage.getItem("idp") || "",
  );
  const [rememberIdp, setRememberIdP] = useState<boolean>(
    localStorage.getItem("rememberIdP") === true.toString(),
  );
  const [loginError] = useState<Error | null>(null);
  const { login } = useSolidAuth();

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
    await onIdPSelected(
      providerIri,
      login,
      (event) => event.preventDefault(), // FIX
      redirectURL,
    );
  };
  return (
    <form
      onSubmit={onSubmit}
      className={clsx("text-left", className)}
      {...props}
    >
      {!hideLogo && <SolidLogo className="mx-auto" />}
      <label htmlFor="idp" className="label">
        <Translation id="solidIdP" />
        <input
          id="idp"
          type="url"
          onChange={(event) => setProviderIri(event.target.value)}
          className="input"
          value={providerIri}
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
        <Translation id="login" />
      </button>
      <div className="mt-4">
        <NavLink to="/signup" className="link">
          <Translation id="signupSolidPrompt" />
        </NavLink>
      </div>
    </form>
  );
}
