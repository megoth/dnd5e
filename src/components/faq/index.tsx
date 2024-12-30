import ReactMarkdown from "react-markdown";
import React from "react";
import Content from "../content";
import { hash, isUrl } from "../../utils/url";
import { useLdo } from "@ldo/solid-react";
import { FAQShapeType } from "../../ldo/app.shapeTypes";
import Translation from "../translation";
import { useLocalization } from "@fluent/react";
import ErrorMessage from "../errorMessage";
import { bem } from "../../utils/bem";

export const TESTID_FAQ_LABEL = "faq-label";
export const TESTID_FAQ_DESCRIPTION = "faq-description";

interface Props {
  id: string;
  variant?: "small";
}

export default function FAQ({ id, variant }: Props) {
  const { l10n } = useLocalization();
  const { getSubject } = useLdo();
  const url = isUrl(id) ? id : `https://dnd5e.app/faqs#${id}`;
  const faq = getSubject(FAQShapeType, url);
  if (!faq.faqLabel || !faq.faqDescription) {
    return <ErrorMessage error={new Error(`FAQ not found: ${id}`)} />;
  }
  const label = hash(faq.faqLabel["@id"]);
  const description = l10n.getString(hash(faq.faqDescription["@id"]));
  return (
    <Content className={bem("content", variant)}>
      <h2 id={id} data-testid={TESTID_FAQ_LABEL}>
        <Translation id={label} />
      </h2>
      <div data-testid={TESTID_FAQ_DESCRIPTION}>
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
    </Content>
  );
}
