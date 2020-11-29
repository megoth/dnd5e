import React from "react";
import { Localized } from "@fluent/react";
import {
  getTranslationId,
  generateTranslationUrl,
} from "../../src/models/translation";
import { useAppConfig } from "../../src/contexts/appConfig";

interface Props {
  id: string;
  vars?: Record<string, string>;
}

export default function Translation({ id, vars }: Props) {
  const { translationsUrl } = useAppConfig();
  const url = generateTranslationUrl(id, translationsUrl);
  return (
    <span resource={url}>
      <Localized id={getTranslationId(url)} vars={vars} />
    </span>
  );
}

Translation.defaultProps = {
  vars: {},
};
