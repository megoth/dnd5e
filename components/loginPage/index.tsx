import React, { createRef, useEffect, useState } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/router";
import Layout from "../layout";
import useApp from "../../src/hooks/useApp";
import { getMessage } from "../../src/models/translation";
import Translation from "../translation";
import ErrorMessage from "../errorMessage";
import FAQ from "../faq";
import Content from "../content";
import { bem } from "../../src/utils";
import { getProviders } from "../../src/models/provider";
import LoginButton from "../loginButton";
import { onIdPSelected } from "../../src/models/session";
import LoggedInAlreadyWarning from "../loggedInAlreadyWarning";

export const TESTID_LOGIN_PAGE_IDP_FIELD = "login-page-idp-field";
export const TESTID_LOGIN_PAGE_REMEMBER_CHECKBOX =
  "login-page-remember-checkbox";
export const TESTID_LOGIN_PAGE_BUTTON = "login-page-button";

export default function LoginPage() {
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

  const providers = getProviders();

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
    await onIdPSelected(app, providerIri, login, setLoginError);
  };

  return (
    <>
      <Layout full>
        <LoggedInAlreadyWarning className={bem("main-container", "content")} />
        <div className="main-container md:grid grid-cols-2 gap-4 max-w-3xl place-items-center">
          <div>
            <Content>
              <h1>
                <Translation id="logInWithSolid" />
              </h1>
              <p>
                <Translation id="authenticationPitch" />
              </p>
            </Content>
            <p className="font-bold mt-6">
              <Translation id="authenticationGuidance" />
            </p>
            <ul className="flex flex-col space-y-2 my-2">
              {providers.map(({ loginIri, label }) => (
                <li key={loginIri}>
                  <LoginButton
                    loginIri={loginIri}
                    className={clsx(bem("button", "solid"), "w-full")}
                  >
                    {label}
                  </LoginButton>
                </li>
              ))}
            </ul>
          </div>
          <form onSubmit={onSubmit} className="mt-2 md:mt-0 border p-2 rounded">
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
                data-testid={TESTID_LOGIN_PAGE_IDP_FIELD}
              />
            </label>
            <label htmlFor="rememberIdp" className="label">
              <input
                id="rememberIdp"
                type="checkbox"
                checked={rememberIdp}
                onChange={onRememberChange}
                className="checkbox"
                data-testid={TESTID_LOGIN_PAGE_REMEMBER_CHECKBOX}
              />
              <span className="label__text">
                <Translation id="rememberIdP" />
              </span>
            </label>
            <button
              className="button w-full"
              data-testid={TESTID_LOGIN_PAGE_BUTTON}
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
        </div>
        <aside className={clsx(bem("main-container", "content"), "my-16")}>
          <FAQ id="whyLogInWithSolid" variant="small" />
          <FAQ id="whatIsSolid" variant="small" />
          <FAQ id="whatIsPod" variant="small" />
        </aside>
      </Layout>
    </>
  );
}
