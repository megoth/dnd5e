import React from "react";
import { Localized } from "@fluent/react";
import {
  getTranslationURL,
  getTranslationId,
} from "../../src/models/translation";
import useApp from "../../src/hooks/useApp";

interface Props {
  id: string;
  vars?: Record<string, string>;
}

export default function Translation({ id, vars }: Props) {
  const { app } = useApp();
  const url = getTranslationURL(id, app);
  return (
    <span resource={url}>
      <Localized id={getTranslationId(url)} vars={vars} />
    </span>
  );
}

Translation.defaultProps = {
  vars: {},
};
