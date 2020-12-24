import React, { useState } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import Link from "next/link";
import clsx from "clsx";
import Layout from "../layout";
import useApp from "../../src/hooks/useApp";
import { getMessage } from "../../src/models/translation";
import { getRedirectURL } from "../../src/windowHelpers";
import Translation from "../translation";
import ErrorMessage from "../errorMessage";
import FAQ from "../faq";
import Content from "../content";
import { bem } from "../../src/utils";
import { getProviders } from "../../src/models/provider";

export const TESTID_LOGIN_PAGE_IDP_FIELD = "login-page-idp-field";
export const TESTID_LOGIN_PAGE_REMEMBER_CHECKBOX =
  "login-page-remember-checkbox";
export const TESTID_LOGIN_PAGE_BUTTON = "login-page-button";
export const TESTID_LOGIN_PAGE_PREDEFINED_IDP = "login-page-predefined-idp";

export default function LoginPage() {
  const app = useApp();
  const [providerIri, setProviderIri] = useState<string>(
    localStorage.getItem("idp") || ""
  );
  const [rememberIdp, setRememberIdP] = useState<boolean>(
    localStorage.getItem("rememberIdP") === "true" || false
  );
  const [loginError, setLoginError] = useState<Error | null>(null);
  const { login } = useSession();

  if (loginError) {
    return <ErrorMessage error={loginError} />;
  }

  const providers = getProviders();

  const onRememberChange = () => {
    const value = !rememberIdp;
    setRememberIdP(value);
    localStorage.setItem("rememberIdP", value.toString());
  };

  const onIdPSelected = async (oidcIssuer) => {
    try {
      await login({
        oidcIssuer,
        redirectUrl: getRedirectURL(""),
        clientName: getMessage(app, "appName"),
      });
    } catch (error) {
      // TODO: Doesn't throw errors yet
      setLoginError(error);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (rememberIdp) {
      localStorage.setItem("idp", providerIri);
    } else {
      localStorage.removeItem("idp");
    }
    await onIdPSelected(providerIri);
  };

  return (
    <>
      <Layout full>
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
            <p className="font-bold">
              <Translation id="authenticationGuidance" />
            </p>
            <ul className="list-disc ml-5">
              {providers.map(({ loginIri, label }) => (
                <li key={loginIri}>
                  <button
                    type="button"
                    className="link"
                    onClick={() => onIdPSelected(loginIri)}
                    data-testid={TESTID_LOGIN_PAGE_PREDEFINED_IDP}
                  >
                    {label}
                  </button>
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
