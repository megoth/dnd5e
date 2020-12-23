import React from "react";
import ReactMarkdown from "react-markdown";
import { HeadingRenderer } from "../../src/markdown";
import Layout from "../layout";
import Content from "../content";
import useApp from "../../src/hooks/useApp";
import Translation from "../translation";

export const TESTID_ABOUT_PAGE_LANGUAGE_WARNING = "about-page-language-warning";

interface Props {
  markdown: string;
}

export default function AboutPage({ markdown }: Props) {
  const { currentLocale } = useApp();
  const renderers = {
    heading: HeadingRenderer,
  };
  return (
    <Layout>
      {currentLocale !== "en-US" && (
        <div
          className="bg-yellow-200 text-yellow-900 border-yellow-400 border px-2 py-1 rounded-sm mb-2"
          data-testid={TESTID_ABOUT_PAGE_LANGUAGE_WARNING}
        >
          <Translation id="onlyAvailableInEnglish" />
        </div>
      )}
      <Content>
        <ReactMarkdown renderers={renderers}>{markdown}</ReactMarkdown>
      </Content>
    </Layout>
  );
}
