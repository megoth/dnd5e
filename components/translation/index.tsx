import React from "react";
import { Localized } from "@fluent/react";
import {
  getTranslationURL,
  getTranslationId,
} from "../../src/models/translation";
import useResourceBundle from "../../src/hooks/useResourceBundle";

interface Props {
  id: string;
  vars?: Record<string, string>;
}

export default function Translation({ id, vars }: Props) {
  const { resourceBundle } = useResourceBundle();
  const url = getTranslationURL(id, resourceBundle);
  return (
    <span resource={url}>
      <Localized id={getTranslationId(url)} vars={vars} />
    </span>
  );
}

Translation.defaultProps = {
  vars: {},
};
