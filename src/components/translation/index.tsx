import React from "react";
import { Localized } from "@fluent/react";
import { type FluentVariable } from "@fluent/bundle";

interface Props {
  id?: string;
  url?: string;
  vars?: Record<string, FluentVariable>;
}

export default function Translation({ id, url, vars = {} }: Props) {
  return (
    <Localized id={id} vars={vars}>
      <span>
        Failed Message: {id} [{url}]
      </span>
    </Localized>
  );
}
