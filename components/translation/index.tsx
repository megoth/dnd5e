import React from "react";
import { Localized } from "@fluent/react";
import {
  getTranslationURL,
  getTranslationId,
  getFailedMessage,
} from "../../src/models/translation";
import useApp from "../../src/hooks/useApp";

interface Props {
  id?: string;
  bundle?: string;
  url?: string;
  vars?: Record<string, any>;
}

export default function Translation({ id, bundle, url, vars }: Props) {
  const app = useApp([bundle]);
  const translationURL = url || getTranslationURL(id, app, bundle);
  const translationId = getTranslationId(translationURL);
  return (
    <Localized id={translationId} vars={vars}>
      {getFailedMessage(translationURL)}
    </Localized>
  );
}

Translation.defaultProps = {
  id: null,
  bundle: "global",
  url: null,
  vars: {},
};
