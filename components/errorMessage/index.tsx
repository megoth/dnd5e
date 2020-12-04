import React from "react";
import { Localized } from "@fluent/react";
import NestedError from "nested-error-stacks";
import useResourceBundle from "../../src/hooks/useResourceBundle";
import { getTranslationId } from "../../src/models/translation";
import { getErrorTranslationURL } from "../../src/models/error";

interface Props {
  error: NestedError;
}

export const TESTID_ERROR = "error";
export const TESTID_ERROR_TITLE = "error-title";

export default function ErrorMessage({ error }: Props) {
  const { resourceBundle } = useResourceBundle();
  const { message: errorURL } = error;
  const translationURL = resourceBundle
    ? getErrorTranslationURL(errorURL, resourceBundle)
    : null;
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
