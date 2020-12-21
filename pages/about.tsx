import React from "react";
import { getMarkdownData } from "../lib/markdown";
import AboutPage from "../components/aboutPage";

export type MarkdownData = {
  markdown: string;
  id: string;
};

interface Props {
  data: MarkdownData;
}

export default function About({ data }: Props) {
  return <AboutPage markdown={data.markdown} />;
}

export async function getStaticProps() {
  const data = await getMarkdownData("README");
  return {
    props: {
      data,
    },
  };
}
