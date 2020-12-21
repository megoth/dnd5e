import React from "react";
import ReactMarkdown from "react-markdown";
import { asUrl } from "@inrupt/solid-client";
import Layout from "../layout";
import useApp from "../../src/hooks/useApp";
import {
  getFAQAll,
  getFAQDescriptionURL,
  getFAQLabelUrl,
} from "../../src/models/faq";
import Translation from "../translation";
import { getMessage } from "../../src/models/translation";

export const TESTID_FAQ_ITEM = "faq-item";

export default function FAQPage() {
  const app = useApp();
  const faqs = getFAQAll(app);
  return (
    <Layout>
      <h1>
        <Translation id="faqTitle" />
      </h1>
      {faqs.map((faq) => (
        <section key={asUrl(faq)} data-testid={TESTID_FAQ_ITEM}>
          <h2>
            <Translation url={getFAQLabelUrl(faq, app)} />
          </h2>
          <ReactMarkdown>
            {getMessage(app, getFAQDescriptionURL(faq, app))}
          </ReactMarkdown>
        </section>
      ))}
    </Layout>
  );
}
