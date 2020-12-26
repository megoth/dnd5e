import React from "react";
import Link from "next/link";
import useApp from "../../src/hooks/useApp";
import Layout from "../layout";
import Logo from "../logo";
import Translation from "../translation";
import { bem } from "../../src/utils";
import { getProviders } from "../../src/models/provider";
import LoginButton from "../loginButton";
import { getMessage } from "../../src/models/translation";
import PageFooter from "../pageFooter";

export default function SplashPage() {
  const app = useApp();
  return (
    <Layout full header={false} footer={false} className="bg-black">
      <section className="hero">
        <div className="h-screen text-white flex flex-col justify-center items-center leading-normal px-4 bg-gradient-to-t from-black relative text-center">
          <Logo />
          <h1 className="text-3xl my-1 font-serif">
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
      <section className="bg-black text-white text-center my-16">
        <h2 className="text-2xl font-serif px-8">
          <Translation id="logInPitch" />
        </h2>
        <ul className="flex overflow-x-auto overscroll-x-contain md:justify-center px-2 my-8">
          {getProviders().map(({ label, logoSrc, loginIri }) => (
            <li key={loginIri} className="p-2 flex">
              <LoginButton
                loginIri={loginIri}
                className="p-4 bg-purple-100 rounded-xl self-center text-black focus:outline-none focus:ring-2 focus:ring-purple-600 hover:bg-purple-300 hover:shadow-inner"
              >
                <img
                  src={logoSrc}
                  alt={getMessage(app, "serviceLogo")}
                  className="mx-auto"
                  style={{ maxHeight: 175, maxWidth: 200 }}
                />
                <span>{label}</span>
              </LoginButton>
            </li>
          ))}
          <li className="p-2 flex" style={{ maxWidth: 200 }}>
            <Link href="/login?idp">
              <a
                className="p-4 bg-purple-100 rounded-xl self-center text-black focus:outline-none focus:ring-2 focus:ring-purple-600 hover:bg-purple-300 hover:shadow-inner"
                style={{ minHeight: 175 }}
              >
                <img
                  src="/logos/solid-emblem.svg"
                  alt={getMessage(app, "solidLogo")}
                  className="mx-auto"
                  style={{ maxHeight: 175, maxWidth: 200 }}
                />
                <Translation id="provideIdP" />
              </a>
            </Link>
          </li>
        </ul>
      </section>
      <PageFooter />
    </Layout>
  );
}
