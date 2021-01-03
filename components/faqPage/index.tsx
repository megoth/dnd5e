import React from "react";
import { asUrl } from "@inrupt/solid-client";
import Layout from "../layout";
import useApp from "../../src/hooks/useApp";
import { getFAQAll } from "../../src/models/faq";
import Translation from "../translation";
import Content from "../content";
import FAQ from "../faq";
import { getMessage } from "../../src/models/translation";

export const TESTID_FAQ_ITEM = "faq-item";

export default function FAQPage() {
  const app = useApp();
  const faqs = getFAQAll(app);
  return (
    <Layout pageName={getMessage(app, "faqPageTitle")}>
      <Content>
        <h1>
          <Translation id="faqPageTitle" />
        </h1>
      </Content>
      {faqs.map((faq) => (
        <section key={asUrl(faq)} data-testid={TESTID_FAQ_ITEM}>
          <FAQ faq={faq} />
        </section>
      ))}
    </Layout>
  );
}
