import React from "react";
import ReactMarkdown from "react-markdown";
import { asUrl } from "@inrupt/solid-client";
import { Localized } from "@fluent/react";
import Layout from "../layout";
import useApp from "../../src/hooks/useApp";
import {
  getFAQAll,
  getFAQDescriptionURL,
  getFAQLabelId,
} from "../../src/models/faq";
import Translation from "../translation";
import { getMessage } from "../../src/models/translation";

export default function FAQPage() {
  const { app } = useApp();
  const faqs = getFAQAll(app);
  return (
    <Layout>
      <h1>
        <Translation id="faqTitle" />
      </h1>
      {faqs.map((faq) => {
        const description = getMessage(app, getFAQDescriptionURL(faq, app));
        return (
          <section key={asUrl(faq)}>
            <h2>
              <Localized id={getFAQLabelId(faq, app)} />
            </h2>
            <ReactMarkdown>{description}</ReactMarkdown>
          </section>
        );
      })}
    </Layout>
  );
}
