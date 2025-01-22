import React from "react";
import clsx from "clsx";
import Layout from "../layout";
import Translation from "../translation";
import FAQ from "../faq";
import Content from "../content";
import { getProviders } from "../../utils/provider";
import LoginButton from "../loginButton";
import LoggedInAlreadyWarning from "../loggedInAlreadyWarning";
import LoginForm from "../loginForm";
import { getRedirectURL } from "../../utils/windowHelpers";
import { bem } from "../../utils/bem";

export default function LoginPage() {
  const providers = getProviders();
  const redirectURL = getRedirectURL("");
  return (
    <Layout full>
      <LoggedInAlreadyWarning className={bem("main-container", "content")} />
      <div className="main-container px-4 lg:px-0 md:grid grid-cols-2 gap-4 max-w-3xl place-items-center">
        <div>
          <Content>
            <h1>
              <Translation id="loginPageTitle" />
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
                  redirectURL={redirectURL}
                  className={clsx(bem("button", "solid"), "w-full")}
                >
                  {label}
                </LoginButton>
              </li>
            ))}
          </ul>
        </div>
        <LoginForm
          className="p-2 bg-gray-100 border border-gray-200 shadow dark:bg-gray-700 dark:border-gray-600"
          redirectURL={redirectURL}
        />
      </div>
      <aside className="my-16 px-4 lg:px-0 mx-auto max-w-prose">
        <FAQ id="whyLogInWithSolid" variant="small" />
        <FAQ id="whatIsSolid" variant="small" />
        <FAQ id="whatIsPod" variant="small" />
      </aside>
    </Layout>
  );
}
