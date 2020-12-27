import React from "react";
import Link from "next/link";
import clsx from "clsx";
import useApp from "../../src/hooks/useApp";
import Layout from "../layout";
import Logo from "../logo";
import Translation from "../translation";
import { bem } from "../../src/utils";
import { getProviders } from "../../src/models/provider";
import LoginButton from "../loginButton";
import { getMessage } from "../../src/models/translation";
import PageFooter from "../pageFooter";
import Content from "../content";

export default function SplashPage() {
  const app = useApp();
  return (
    <Layout full header={false} footer={false}>
      <section className="hero">
        <div className="h-screen flex flex-col justify-center items-center leading-normal px-4 bg-gradient-to-t from-white via-transparent dark:from-gray-800 relative text-center">
          <Logo />
          <h1 className="text-3xl xs:text-4xl sm:text-6xl my-2 font-serif">
            <Translation id="appName" />
          </h1>
          <p className="my-1 max-w-xl">
            <Translation id="appPitch" />
          </p>
          <Link href="/about">
            <a className="link my-1 max-w-prose">
              <Translation id="learnMore" />
            </a>
          </Link>
          <p className="text-2xl my-1">
            <Translation id="workInProgress" />
          </p>
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
      </section>
      <section className="text-center my-16 px-4 sm:px-0 flex flex-col sm:flex-row max-w-prose mx-auto">
        <Content
          className="flex-1 flex flex-col justify-center"
          hyphens={false}
        >
          <img
            src="/logos/solid-emblem.svg"
            alt={getMessage(app, "solidLogo")}
            className="mx-auto"
            style={{ maxHeight: 175, maxWidth: 200 }}
          />
          <h2 className="px-4">
            <Translation id="logInPitch" />
          </h2>
        </Content>
        <div className="flex-1 flex flex-col justify-center">
          <Content className="mb-4">
            <p>
              <Translation id="authenticationGuidance" />
            </p>
          </Content>
          <ul className="flex flex-col space-y-2 xs:max-w-xs md:max-w-full mx-auto">
            {getProviders().map(({ label, loginIri }) => (
              <li key={loginIri} className="flex-1">
                <LoginButton
                  loginIri={loginIri}
                  className={clsx(bem("button", "solid"), "block w-full")}
                >
                  {label}
                </LoginButton>
              </li>
            ))}
            <li className="flex-1">
              <Link href="/login?idp">
                <a className={clsx(bem("button", "solid"), "block w-full")}>
                  <Translation id="provideIdP" />
                </a>
              </Link>
            </li>
          </ul>
          <Content className="mt-4">
            <Link href="/signup">
              <a>
                <Translation id="signupGuidance" />
              </a>
            </Link>
          </Content>
        </div>
      </section>
      <PageFooter />
    </Layout>
  );
}
