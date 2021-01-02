import React from "react";
import { render } from "@testing-library/react";
import * as routerFns from "next/router";
import useAppCore from "../../src/hooks/useAppCore";
import AppConfig from "./index";
import mockAppCoreHook from "../../__testUtils/mockAppCoreHook";
import { TESTID_ERROR } from "../errorMessage";
import mockApp, {
  mockNorwegianApp,
  mockUnloadedApp,
} from "../../__testUtils/mockApp";
import {
  appIndexURL,
  appVocabURL,
} from "../../__testUtils/mockAppIndexDataset";
import useApp from "../../src/hooks/useApp";
import { TESTID_LOADING } from "../loading";
import mockRouter from "../../__testUtils/mockRouter";

jest.mock("../../src/hooks/useAppCore");
const mockedAppCoreHook = useAppCore as jest.Mock;

const app = mockApp();

const TESTID_LOCALE = "locale";

function ChildComponent() {
  const { currentLocale } = useApp();
  return <div data-testid={TESTID_LOCALE}>{currentLocale}</div>;
}

describe("AppConfig", () => {
  let mockedRouterHook;

  beforeEach(() => {
    mockedRouterHook = jest
      .spyOn(routerFns, "useRouter")
      .mockReturnValue(mockRouter());
  });

  it("loads resources and renders", () => {
    mockAppCoreHook(mockedAppCoreHook);
    const { getByTestId } = render(
      <AppConfig appIndexURL={appIndexURL} appVocabURL={appVocabURL}>
        <ChildComponent />
      </AppConfig>
    );
    expect(mockedAppCoreHook).toHaveBeenCalledWith(
      appVocabURL,
      appIndexURL,
      app.currentLocale
    );
    expect(getByTestId(TESTID_LOCALE).innerHTML).toEqual(app.currentLocale);
  });

  it("processes locale from router query", () => {
    const locale = "nb-NO";
    mockedRouterHook.mockReturnValue(mockRouter({ query: { locale } }));
    mockAppCoreHook(mockedAppCoreHook, {
      app: mockNorwegianApp({
        currentLocale: "en-US",
      }),
    });
    const { getByTestId } = render(
      <AppConfig appIndexURL={appIndexURL} appVocabURL={appVocabURL}>
        <ChildComponent />
      </AppConfig>
    );
    expect(getByTestId(TESTID_LOCALE).innerHTML).toEqual(locale);
  });

  it("displays error if it fails to load app", () => {
    mockAppCoreHook(mockedAppCoreHook, { error: new Error() });
    const { getByTestId } = render(
      <AppConfig appIndexURL={appIndexURL} appVocabURL={appVocabURL}>
        <ChildComponent />
      </AppConfig>
    );
    expect(getByTestId(TESTID_ERROR)).toBeDefined();
  });

  it("displays loading while appCore is loading", () => {
    mockAppCoreHook(mockedAppCoreHook, { app: null });
    const { getByTestId } = render(
      <AppConfig appIndexURL={appIndexURL} appVocabURL={appVocabURL}>
        <ChildComponent />
      </AppConfig>
    );
    expect(getByTestId(TESTID_LOADING)).toBeDefined();
  });

  it("displays loading while resourceBundles are loading", () => {
    mockAppCoreHook(mockedAppCoreHook, { app: mockUnloadedApp() });
    const { getByTestId } = render(
      <AppConfig appIndexURL={appIndexURL} appVocabURL={appVocabURL}>
        <ChildComponent />
      </AppConfig>
    );
    expect(getByTestId(TESTID_LOADING)).toBeDefined();
  });
});
