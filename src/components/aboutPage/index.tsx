import React from "react";
import ReactMarkdown from "react-markdown";
import Layout from "../layout";
import Content from "../content";
import useApp from "../../hooks/useApp";
import WarningMessage from "../warningMessage";
import Translation from "../translation";

export const TESTID_ABOUT_PAGE_LANGUAGE_WARNING = "about-page-language-warning";

export default function AboutPage() {
  const { currentLocale } = useApp();

  return (
    <Layout pageName={"aboutPageTitle"}>
      {currentLocale !== "en-US" && (
        <WarningMessage data-testid={TESTID_ABOUT_PAGE_LANGUAGE_WARNING}>
          <Translation id="onlyAvailableInEnglish" />
        </WarningMessage>
      )}
      <Content>
        <ReactMarkdown>TEST</ReactMarkdown>
      </Content>
    </Layout>
  );
}
