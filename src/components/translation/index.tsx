import React from "react";
import { Localized } from "@fluent/react";
import { type FluentVariable } from "@fluent/bundle";
import useApp from "../../hooks/useApp";

interface Props {
  id?: string;
  bundle?: string;
  url?: string;
  vars?: Record<string, FluentVariable>;
}

export default function Translation({
  id,
  bundle = "global",
  url,
  vars = {},
}: Props) {
  const { currentLocale } = useApp();
  return (
    <Localized id={`${bundle}-${id}-${currentLocale}`} vars={vars}>
      <span>
        Failed Message: {id}-{bundle}-{url}
      </span>
    </Localized>
  );
}
