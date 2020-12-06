import React from "react";
import { render } from "@testing-library/react";
import NestedError from "nested-error-stacks";
import {
  mockSolidDatasetFrom,
  mockThingFrom,
  setThing,
  setUrl,
} from "@inrupt/solid-client";
import { LocalizationProvider, ReactLocalization } from "@fluent/react";
import ErrorMessage, { TESTID_ERROR_TITLE } from "./index";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import mockApp, {
  errorsIndexURL,
  translationsIndexURL,
} from "../../__testUtils/mockApp";
import { createSWRResponse } from "../../__testUtils/mockSWR";
import { chain } from "../../src/utils";
import { getErrorURL } from "../../src/models/error";
import { getAppTerm } from "../../src/models/appIndex";
import { getTranslationURL } from "../../src/models/translation";
import mockFluentBundle from "../../__testUtils/mockFluentBundle";
import { appVocabURL } from "../../__testUtils/mockAppIndexDataset";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

describe("ErrorMessage", () => {
  it("renders", () => {
    const errorURL = getErrorURL("error", {
      errorsIndexURL: { global: errorsIndexURL },
    });
    const translationURL = getTranslationURL("translation", {
      translationsIndexURL: { global: translationsIndexURL },
    });
    const translatedErrorMessage = "Translated error message";
    const fluentBundles = [
      mockFluentBundle({
        translation: translatedErrorMessage,
      }),
    ];
    mockAppHook(
      mockedAppHook,
      mockApp({
        errorsIndexSWR: {
          global: createSWRResponse(
            chain(mockSolidDatasetFrom(errorsIndexURL), (d) =>
              setThing(
                d,
                chain(mockThingFrom(errorURL), (t) =>
                  setUrl(
                    t,
                    getAppTerm("translation", { appVocabURL }),
                    translationURL
                  )
                )
              )
            )
          ),
        },
        fluentBundles: {
          global: fluentBundles,
        },
      })
    );
    const error = new NestedError(errorURL);
    const l10n = new ReactLocalization(fluentBundles);
    const { asFragment, getByTestId } = render(
      <LocalizationProvider l10n={l10n}>
        <ErrorMessage error={error} />
      </LocalizationProvider>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId(TESTID_ERROR_TITLE).innerHTML).toContain(
      translatedErrorMessage
    );
  });

  it("render a fallback when app is not available", () => {
    mockAppHook(mockedAppHook, null);
    const error1 = new Error("error1");
    const error2 = new NestedError("error2", error1);
    const { asFragment, getByTestId } = render(<ErrorMessage error={error2} />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId(TESTID_ERROR_TITLE).innerHTML).toContain("error2");
  });
});
