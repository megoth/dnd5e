import React from "react";
import ReactMarkdown from "react-markdown";
import Layout from "../components/layout";
import { getMarkdownData } from "../lib/markdown";
import { HeadingRenderer } from "../src/markdown";

export type MarkdownData = {
  markdown: string;
  id: string;
};

interface Props {
  data: MarkdownData;
}

export default function About({ data }: Props) {
  const renderers = {
    heading: HeadingRenderer,
  };
  return (
    <Layout>
      <ReactMarkdown renderers={renderers}>{data.markdown}</ReactMarkdown>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await getMarkdownData("README");
  return {
    props: {
      data,
    },
  };
}
