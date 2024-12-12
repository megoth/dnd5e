import React from "react";
import NestedError from "nested-error-stacks";

interface Props {
  error: NestedError;
}

export const TESTID_ERROR = "error";
export const TESTID_ERROR_TITLE = "error-title";

export default function ErrorMessage({ error }: Props) {
  // const { message: errorURL } = error;
  return (
    <div data-testid={TESTID_ERROR}>
      <h1 data-testid={TESTID_ERROR_TITLE}>
        {/*{translationURL ? (*/}
        {/*  <Localized id={getTranslationId(translationURL)}>*/}
        {/*    {errorURL}*/}
        {/*  </Localized>*/}
        {/*) : (*/}
        {error.message}
        {/*)}*/}
      </h1>
    </div>
  );
}
