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
import PageFooter from "../pageFooter";

export default function LoginPage() {
  const providers = getProviders();
  const redirectURL = getRedirectURL("");
  return (
    <Layout full pageName={"loginPageTitle"}>
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
        <LoginForm className="border p-2 rounded" redirectURL={redirectURL} />
      </div>
      <aside className={clsx(bem("main-container", "content"), "my-16")}>
        <FAQ id="whyLogInWithSolid" variant="small" />
        <FAQ id="whatIsSolid" variant="small" />
        <FAQ id="whatIsPod" variant="small" />
      </aside>
      <PageFooter className="main-container" />
    </Layout>
  );
}
