import React from "react";
import { Localized } from "@fluent/react";
import NestedError from "nested-error-stacks";
import { getErrorId } from "../../src/models/error";

interface Props {
  error: NestedError;
}

export const TESTID_ERROR = "error";
export const TESTID_ERROR_TITLE = "error-title";
export const TESTID_ERROR_STACK = "error-stack";

export default function ErrorMessage({ error }: Props) {
  const { message: errorUrl } = error;
  const errorId = getErrorId(errorUrl);
  return (
    <div data-testid={TESTID_ERROR}>
      <h1 data-testid={TESTID_ERROR_TITLE}>
        <Localized id={errorId}>{errorUrl}</Localized>
      </h1>
      <pre data-testid={TESTID_ERROR_STACK}>
        <h2>{error.message}</h2>
        <pre>{error.stack}</pre>
      </pre>
    </div>
  );
}
