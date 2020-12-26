import { Thing } from "@inrupt/solid-client";
import ReactMarkdown from "react-markdown";
import React from "react";
import { getFAQ, getFAQDetails } from "../../src/models/faq";
import useApp from "../../src/hooks/useApp";
import Content from "../content";
import { bem } from "../../src/utils";

export const TESTID_FAQ_LABEL = "faq-label";
export const TESTID_FAQ_DESCRIPTION = "faq-description";

interface Props {
  bundle?: string;
  faq?: Thing;
  id?: string;
  variant?: "small";
}

export default function FAQ({ bundle, faq, id, variant }: Props) {
  const app = useApp();
  const { label, description } = faq
    ? getFAQDetails(faq, app)
    : getFAQ(id, app, bundle);
  return (
    <Content className={bem("content", variant)}>
      <h2 data-testid={TESTID_FAQ_LABEL}>{label}</h2>
      <div data-testid={TESTID_FAQ_DESCRIPTION}>
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
    </Content>
  );
}

FAQ.defaultProps = {
  faq: null,
  id: null,
  bundle: "global",
  variant: null,
};
