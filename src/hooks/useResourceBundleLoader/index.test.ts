import { renderHook } from "@testing-library/react-hooks";
import useSWR from "swr";
import { mockSolidDatasetFrom } from "@inrupt/solid-client";
import NestedError from "nested-error-stacks";
import useAppIndex from "../useAppIndex";
import useResourceBundle, { swrConfig } from "./index";
import {
  errorsIndexURL,
  faqIndexURL,
  localizedIndexURL,
  translationsIndexURL,
} from "../../../__testUtils/mockResourceBundle";
import mockSWR, { createSWRResponse } from "../../../__testUtils/mockSWR";
import mockAppIndex from "../../../__testUtils/mockAppIndex";
import useDataset from "../useDataset";
import {
  appIndexURL,
  appVocabURL,
} from "../../../__testUtils/mockAppIndexDataset";
import useFluentBundles from "../useFluentBundles";
import mockFluentBundle from "../../../__testUtils/mockFluentBundle";

jest.mock("swr");
const mockedSWRHook = useSWR as jest.Mock;

jest.mock("../useAppIndex");
const mockedAppIndexHook = useAppIndex as jest.Mock;

jest.mock("../useDataset");
const mockedDatasetHook = useDataset as jest.Mock;

jest.mock("../useFluentBundles");
const mockedFluentBundlesHook = useFluentBundles as jest.Mock;

const bundleName = "global";
const fluentBundles = [mockFluentBundle()];

describe("useResourceBundle", () => {
  let appIndex;
  let resourceDatasetSWR;

  beforeEach(() => {
    mockSWR(mockedSWRHook);
    appIndex = mockAppIndex(bundleName, appIndexURL);
    mockedAppIndexHook.mockReturnValue(createSWRResponse(appIndex));
    resourceDatasetSWR = createSWRResponse(
      mockSolidDatasetFrom("https://example.com/#resource")
    );
    mockedDatasetHook.mockReturnValue(resourceDatasetSWR);
    mockedFluentBundlesHook.mockReturnValue(fluentBundles);
  });

  it("caches with SWR", () => {
    renderHook(() => useResourceBundle(bundleName, appIndexURL, appVocabURL));
    expect(mockedSWRHook).toHaveBeenCalledWith(
      [
        [],
        "global",
        {
          resourceBundleAll: [
            {
              errorsIndexURL: "https://example.com/errors.ttl",
              faqIndexURL: "https://example.com/faq.ttl",
              label: "global",
              localizedIndexURL: "https://example.com/translations.en-US.ttl",
              translationsIndexURL: "https://example.com/translations.ttl",
            },
          ],
        },
        resourceDatasetSWR,
        resourceDatasetSWR,
        resourceDatasetSWR,
        resourceDatasetSWR,
        fluentBundles,
      ],
      expect.any(Function),
      swrConfig
    );
  });

  it("returns a resource bundle", () => {
    const { result } = renderHook(() =>
      useResourceBundle(bundleName, appIndexURL, appVocabURL)
    );
    expect(result.current).toBeDefined();
    const { data: bundle } = result.current;
    expect(bundle.bundleNames).toEqual(["global"]);
    expect(bundle.currentLanguage).toEqual("en-US");
    expect(bundle.errorsIndexSWR.global).toEqual(resourceDatasetSWR);
    expect(bundle.errorsIndexURL.global).toEqual(errorsIndexURL);
    expect(bundle.faqIndexSWR.global).toEqual(resourceDatasetSWR);
    expect(bundle.faqIndexURL.global).toEqual(faqIndexURL);
    expect(bundle.fluentBundles.global).toEqual(fluentBundles);
    expect(bundle.localizedIndexSWR.global).toEqual(resourceDatasetSWR);
    expect(bundle.localizedIndexURL.global).toEqual(localizedIndexURL);
    expect(bundle.translationsIndexSWR.global).toEqual(resourceDatasetSWR);
    expect(bundle.translationsIndexURL.global).toEqual(translationsIndexURL);
  });

  it("throws custom error if appIndex fails", () => {
    const appIndexError = new Error("error");
    mockedAppIndexHook.mockReturnValue({ error: appIndexError });
    const { result } = renderHook(() =>
      useResourceBundle(bundleName, appIndexURL, appVocabURL)
    );
    expect(result.current.error).toEqual(
      new NestedError("Unable to load resource bundle", appIndexError)
    );
  });

  it("returns null if app index is not available", () => {
    mockedAppIndexHook.mockReturnValue({ data: null });
    mockedDatasetHook.mockReturnValue(null);
    mockedFluentBundlesHook.mockReturnValue(null);
    const { result } = renderHook(() =>
      useResourceBundle(bundleName, appIndexURL, appVocabURL)
    );
    expect(result.current.data).toBeNull();
  });

  it("returns null if fluent bundles is not available", () => {
    mockedFluentBundlesHook.mockReturnValue(null);
    const { result } = renderHook(() =>
      useResourceBundle(bundleName, appIndexURL, appVocabURL)
    );
    expect(result.current.data).toBeNull();
  });

  it("returns null if no resource bundles are available", () => {
    const dataset = mockSolidDatasetFrom(appIndexURL);
    mockedAppIndexHook.mockReturnValue({
      data: mockAppIndex("global", appIndexURL, dataset),
    });
    const { result } = renderHook(() =>
      useResourceBundle(bundleName, appIndexURL, appVocabURL)
    );
    expect(result.current.data).toBeNull();
  });
});
