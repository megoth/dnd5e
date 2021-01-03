import React from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import { getMessage } from "../../src/models/translation";
import useApp from "../../src/hooks/useApp";
import { getProviders } from "../../src/models/provider";
import FAQ from "../faq";
import LoggedInAlreadyWarning from "../loggedInAlreadyWarning";

export default function SignupPage() {
  const app = useApp();
  return (
    <Layout pageName={getMessage(app, "signupPageTitle")}>
      <Content>
        <h1>
          <Translation id="signupPageTitle" />
        </h1>
        <LoggedInAlreadyWarning />
        <ReactMarkdown>{getMessage(app, "signupPitch")}</ReactMarkdown>
      </Content>
      <ul className="flex flex-wrap justify-center my-8">
        {getProviders().map(({ label, logoSrc, signupIri }) => (
          <li key={signupIri} className="text-center m-2">
            <a
              href={signupIri}
              className="block bg-purple-100 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 hover:shadow-inner hover:bg-purple-300 text-gray-800 dark:text-gray-800"
            >
              <img
                src={logoSrc}
                alt={getMessage(app, "serviceLogo")}
                className="mx-auto max-h-20"
              />
              <span className="text-xl font-bold">{label}</span>
            </a>
          </li>
        ))}
      </ul>
      <Content>
        <p className="text-center">
          <Link href="/login">
            <a>
              <Translation id="loginPrompt" />
            </a>
          </Link>
        </p>
      </Content>
      <aside className="my-16">
        <FAQ id="whatIsIdP" variant="small" />
        <FAQ id="whatIsPod" variant="small" />
      </aside>
    </Layout>
  );
}
