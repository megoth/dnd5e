import React from "react";
import ReactMarkdown from "react-markdown";
import Layout from "../layout";
import Content from "../content";
import useApp from "../../hooks/useApp";
import WarningMessage from "../warningMessage";
import Translation from "../translation";
import readmeMarkdown from "../../../README.md?raw";
import {
  transformMarkdownHeader,
  transformMarkdownLink,
} from "../../utils/markdown";

export const TESTID_ABOUT_PAGE_LANGUAGE_WARNING = "about-page-language-warning";

export default function AboutPage() {
  const { currentLocale } = useApp();

  return (
    <Layout>
      {currentLocale !== "en-US" && (
        <WarningMessage data-testid={TESTID_ABOUT_PAGE_LANGUAGE_WARNING}>
          <Translation id="onlyAvailableInEnglish" />
        </WarningMessage>
      )}
      <Content>
        <ReactMarkdown
          components={{
            a: transformMarkdownLink,
            h2: transformMarkdownHeader("h2"),
            h3: transformMarkdownHeader("h3"),
            h4: transformMarkdownHeader("h4"),
          }}
        >
          {readmeMarkdown}
        </ReactMarkdown>
      </Content>
    </Layout>
  );
}
