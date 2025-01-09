import React from "react";
import clsx from "clsx";
import Layout from "../layout";
import Logo from "../logo";
import Translation from "../translation";
import { getProviders } from "../../utils/provider";
import LoginButton from "../loginButton";
import Content from "../content";
import PageHeader from "../pageHeader";
import WarningMessage from "../warningMessage";
import { NavLink } from "react-router-dom";
import { bem } from "../../utils/bem";
import PageFooter from "../pageFooter";
import Markdown from "react-markdown";
import readme from "./README.md?raw";

export default function SplashPage() {
  return (
    <Layout full header={false}>
      <section className="hero">
        <div className="flex-1 flex flex-col justify-center items-center leading-normal bg-gradient-to-t from-white dark:from-gray-800 to-white dark:to-gray-800 via-transparent dark:via-transparent relative">
          <PageHeader className="w-full" />
          <div className="px-4 flex-1 text-center">
            <div className="my-4 px-4 py-2 bg-white dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-80 rounded-lg md:rounded-xl max-w-lg shadow-md">
              <Logo />
              <Content>
                <h1>
                  <Translation id="appName" />
                </h1>
                <p>
                  <Translation id="appPitch" />
                </p>
                <WarningMessage>
                  <Translation id="workInProgress" />
                </WarningMessage>
                <Markdown>{readme}</Markdown>
                <p>
                  Pages of interest: <NavLink to="/classes">classes</NavLink>,{" "}
                  <NavLink to="/races">races</NavLink>,{" "}
                  <NavLink to="/spells">spells</NavLink>,{" "}
                  <NavLink to="/equipment">equipment</NavLink>, and{" "}
                  <NavLink to="/weapons">weapons</NavLink>.
                </p>
              </Content>
              <NavLink
                to="/about"
                className="link block my-2 max-w-prose text-center"
              >
                <Translation id="learnMore" />
              </NavLink>
            </div>
            <div className="my-4 px-4 py-2 bg-white dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-80 rounded-lg md:rounded-xl max-w-lg shadow-md">
              <div className="text-center flex flex-col sm:flex-row max-w-prose mx-auto">
                <Content
                  className="flex-1 flex flex-col justify-center"
                  hyphens={false}
                >
                  <img
                    src="/logos/solid-emblem.svg"
                    alt={"solidLogo"}
                    className="mx-auto"
                    style={{ maxHeight: 175, maxWidth: 200 }}
                  />
                  <p className="px-4 font-bold text-xl">
                    <Translation id="loginPitch" />
                  </p>
                </Content>
                <div className="flex-1 flex flex-col justify-center">
                  <Content className="mb-4">
                    <h2>
                      <Translation id="loginPageTitle" />
                    </h2>
                    <p>
                      <Translation id="authenticationGuidance" />
                    </p>
                  </Content>
                  <ul className="flex flex-col space-y-2 xs:max-w-xs md:max-w-full mx-auto">
                    {getProviders().map(({ label, loginIri }) => (
                      <li key={loginIri} className="flex-1">
                        <LoginButton
                          loginIri={loginIri}
                          className={clsx(
                            bem("button", "solid"),
                            "block w-full",
                          )}
                        >
                          {label}
                        </LoginButton>
                      </li>
                    ))}
                    <li className="flex-1">
                      <NavLink
                        to="/login?idp"
                        className={clsx(bem("button", "solid"), "block w-full")}
                      >
                        <Translation id="provideIdP" />
                      </NavLink>
                    </li>
                  </ul>
                  <Content className="mt-4">
                    <NavLink to="/signup">
                      <Translation id="signupGuidance" />
                    </NavLink>
                  </Content>
                </div>
              </div>
            </div>
            <PageFooter className="mb-8" />
            <p className="text-xs text-gray-600 absolute bottom-1 right-2">
              Photo by{" "}
              <a
                className={bem("link", "subtle")}
                href="https://unsplash.com/@steve_j?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
              >
                Steve Johnson
              </a>{" "}
              on{" "}
              <a
                className={bem("link", "subtle")}
                href="https://unsplash.com/s/photos/pen-and-paper?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
              >
                Unsplash
              </a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
