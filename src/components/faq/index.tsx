import ReactMarkdown from "react-markdown";
import React from "react";
import Content from "../content";
import { getHash, isUrl } from "../../utils/url";
import { useLdo } from "@ldo/solid-react";
import { FAQShapeType } from "../../ldo/app.shapeTypes";
import Translation from "../translation";
import { useLocalization } from "@fluent/react";
import ErrorMessage from "../errorMessage";
import { bem } from "../../utils/bem";
import useApp from "../../hooks/useApp";

export const TESTID_FAQ_LABEL = "faq-label";
export const TESTID_FAQ_DESCRIPTION = "faq-description";

interface Props {
  bundle?: string;
  id: string;
  variant?: "small";
}

export default function FAQ({ bundle = "global", id, variant }: Props) {
  const { currentLocale } = useApp();
  const { l10n } = useLocalization();
  const { getSubject } = useLdo();
  const url = isUrl(id) ? id : `https://dnd5e.app/translations/${bundle}#${id}`;
  const faq = getSubject(FAQShapeType, url);
  if (!faq.faqLabel || !faq.faqDescription) {
    return <ErrorMessage error={new Error(`FAQ not found: ${id}`)} />;
  }
  const label = getHash(faq.faqLabel["@id"]);
  const description = l10n.getString(
    `global-${getHash(faq.faqDescription["@id"])}-${currentLocale}`,
  );
  return (
    <Content className={bem("content", variant)}>
      <h2 id={id} data-testid={TESTID_FAQ_LABEL}>
        <Translation id={label} bundle={bundle} />
      </h2>
      <div data-testid={TESTID_FAQ_DESCRIPTION}>
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
    </Content>
  );
}
