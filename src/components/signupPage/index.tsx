import React from "react";
import ReactMarkdown from "react-markdown";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import { getProviders } from "../../utils/provider";
import FAQ from "../faq";
import LoggedInAlreadyWarning from "../loggedInAlreadyWarning";
import { NavLink } from "react-router-dom";
import { useLocalization } from "@fluent/react";

export default function SignupPage() {
  const { l10n } = useLocalization();
  return (
    <Layout pageName={"signupPageTitle"}>
      <Content>
        <h1>
          <Translation id="signupPageTitle" />
        </h1>
        <LoggedInAlreadyWarning />
        <ReactMarkdown>{l10n.getString("signupPitch")}</ReactMarkdown>
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
                alt={"serviceLogo"}
                className="mx-auto max-h-20"
              />
              <span className="text-xl font-bold">{label}</span>
            </a>
          </li>
        ))}
      </ul>
      <Content>
        <p className="text-center">
          <NavLink to="/login">
            <Translation id="loginPrompt" />
          </NavLink>
        </p>
      </Content>
      <aside className="my-16">
        <FAQ id="whatIsIdP" variant="small" />
        <FAQ id="whatIsPod" variant="small" />
      </aside>
    </Layout>
  );
}
