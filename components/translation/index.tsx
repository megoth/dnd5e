import React from "react";
import { Localized } from "@fluent/react";
import {
  getTranslationId,
  getTranslationUrl,
} from "../../src/models/translation";

interface Props {
  id: string;
  vars?: Record<string, string>;
}

export default function Translation({ id, vars }: Props) {
  const url = getTranslationUrl(id);
  return <Localized id={getTranslationId(url)} vars={vars} />;
}

Translation.defaultProps = {
  vars: {},
};
