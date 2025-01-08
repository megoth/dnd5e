import React, { useMemo } from "react";
import Layout from "../layout";
import Translation from "../translation";
import Content from "../content";
import { useLdo } from "@ldo/solid-react";
import { rdf } from "rdf-namespaces";
import { namedNode } from "@rdfjs/data-model";
import FAQ from "../faq";

export const TESTID_FAQ_ITEM = "faq-item";

export default function FAQPage() {
  const { dataset } = useLdo();

  const faqs = useMemo(
    () =>
      dataset
        .match(
          null,
          namedNode(rdf.type),
          namedNode("https://dnd5e.app/vocab/app#FAQ"),
        )
        .toArray()
        .map(({ subject }) => subject.value),
    [dataset],
  );

  return (
    <Layout>
      <Content>
        <h1>
          <Translation id="faqPageTitle" />
        </h1>
      </Content>
      {faqs.map((faq) => (
        <section key={faq} data-testid={TESTID_FAQ_ITEM}>
          <FAQ id={faq} />
        </section>
      ))}
    </Layout>
  );
}
