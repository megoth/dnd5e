import React from "react";
import { Localized } from "@fluent/react";
import NestedError from "nested-error-stacks";
import useApp from "../../src/hooks/useApp";
import { getTranslationId } from "../../src/models/translation";
import { getErrorTranslationURL } from "../../src/models/error";

interface Props {
  error: NestedError;
}

export const TESTID_ERROR = "error";
export const TESTID_ERROR_TITLE = "error-title";

export default function ErrorMessage({ error }: Props) {
  const app = useApp();
  const { message: errorURL } = error;
  const translationURL = app ? getErrorTranslationURL(errorURL, app) : null;
  return (
    <div data-testid={TESTID_ERROR}>
      <h1 data-testid={TESTID_ERROR_TITLE}>
        {translationURL ? (
          <Localized id={getTranslationId(translationURL)}>
            {errorURL}
          </Localized>
        ) : (
          errorURL
        )}
      </h1>
    </div>
  );
}
