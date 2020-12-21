import React from "react";
import ReactMarkdown from "react-markdown";
import { HeadingRenderer } from "../../src/markdown";
import Layout from "../layout";

interface Props {
  markdown: string;
}

export default function AboutPage({ markdown }: Props) {
  const renderers = {
    heading: HeadingRenderer,
  };
  return (
    <Layout>
      <ReactMarkdown renderers={renderers}>{markdown}</ReactMarkdown>
    </Layout>
  );
}
