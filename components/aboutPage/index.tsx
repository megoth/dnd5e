import React from "react";
import ReactMarkdown from "react-markdown";
import { HeadingRenderer } from "../../src/markdown";
import Layout from "../layout";
import Content from "../content";
import useApp from "../../src/hooks/useApp";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import { getMessage } from "../../src/models/translation";

export const TESTID_ABOUT_PAGE_LANGUAGE_WARNING = "about-page-language-warning";

interface Props {
  markdown: string;
}

export default function AboutPage({ markdown }: Props) {
  const app = useApp();
  const renderers = {
    heading: HeadingRenderer,
  };
  return (
    <Layout pageName={getMessage(app, "aboutPageTitle")}>
      {app.currentLocale !== "en-US" && (
        <WarningMessage data-testid={TESTID_ABOUT_PAGE_LANGUAGE_WARNING}>
          <Translation id="onlyAvailableInEnglish" />
        </WarningMessage>
      )}
      <Content>
        <ReactMarkdown renderers={renderers}>{markdown}</ReactMarkdown>
      </Content>
    </Layout>
  );
}
