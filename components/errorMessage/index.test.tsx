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
  errorsURL,
  globalTranslationsURL,
  translations,
} from "../../__testUtils/mockApp";
import { chain } from "../../src/utils";
import { getErrorURL } from "../../src/models/error";
import { getAppTerm } from "../../src/models/appIndex";
import { getTranslationURL } from "../../src/models/translation";
import mockFluentBundle from "../../__testUtils/mockFluentBundle";
import { appVocabURL } from "../../__testUtils/mockAppIndexDataset";
import mockResourceBundleMap from "../../__testUtils/mockResourceBundleMap";
import { defaultLocale } from "../../__testUtils/mockLanguage";
import renderApp from "../../__testUtils/renderApp";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

describe("ErrorMessage", () => {
  it("renders", () => {
    const urls = {
      errors: errorsURL,
      translations: globalTranslationsURL,
    };
    const globalResourceBundle = mockResourceBundleMap({
      urls,
    });
    const errorURL = getErrorURL("error", {
      currentLocale: defaultLocale,
      resourceBundles: globalResourceBundle,
    });
    const translationURL = getTranslationURL("translation", {
      currentLocale: defaultLocale,
      resourceBundles: globalResourceBundle,
    });
    const translatedErrorMessage = "Translated error message";
    const fluentBundle = mockFluentBundle({
      ...translations,
      [translationURL]: translatedErrorMessage,
    });
    const app = mockApp({
      fluentBundles: {
        [defaultLocale]: fluentBundle,
      },
      resourceBundles: {
        ...mockResourceBundleMap({
          data: {
            errors: chain(mockSolidDatasetFrom(errorsURL), (d) =>
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
            ),
          },
          urls,
        }),
      },
    });
    mockAppHook(mockedAppHook, app);
    const error = new NestedError(errorURL);
    const { asFragment, getByTestId } = renderApp(
      app,
      <ErrorMessage error={error} />
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
