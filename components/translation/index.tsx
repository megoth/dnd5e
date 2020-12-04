import React from "react";
import { Localized } from "@fluent/react";
import {
  generateTranslationURL,
  getTranslationId,
} from "../../src/models/translation";
import useResourceBundle from "../../src/hooks/useResourceBundle";

interface Props {
  id: string;
  vars?: Record<string, string>;
}

export default function Translation({ id, vars }: Props) {
  const { resourceBundle } = useResourceBundle();
  const url = generateTranslationURL(id, resourceBundle);
  return (
    <span resource={url}>
      <Localized id={getTranslationId(url)} vars={vars} />
    </span>
  );
}

Translation.defaultProps = {
  vars: {},
};
