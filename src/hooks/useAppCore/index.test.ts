import { renderHook } from "@testing-library/react-hooks";
import useSWR from "swr";
import { mockSolidDatasetFrom } from "@inrupt/solid-client";
import NestedError from "nested-error-stacks";
import useAppIndex from "../useAppIndex";
import useAppCore from "./index";
import mockSWR, { createSWRResponse } from "../../../__testUtils/mockSWR";
import mockAppIndex from "../../../__testUtils/mockAppIndex";
import useDataset from "../useDataset";
import {
  appIndexURL,
  appVocabURL,
} from "../../../__testUtils/mockAppIndexDataset";
import { defaultLocale } from "../../../__testUtils/mockLanguage";
import { createApp } from "../../models/app";
import { mockEmptyApp } from "../../../__testUtils/mockApp";

jest.mock("swr");
const mockedSWRHook = useSWR as jest.Mock;

jest.mock("../useAppIndex");
const mockedAppIndexHook = useAppIndex as jest.Mock;

jest.mock("../useDataset");
const mockedDatasetHook = useDataset as jest.Mock;

const bundleName = "global";

describe("useAppCore", () => {
  let appIndex;

  beforeEach(() => {
    mockSWR(mockedSWRHook);
    appIndex = mockAppIndex();
    mockedAppIndexHook.mockReturnValue(createSWRResponse(appIndex));
  });

  it("caches with SWR", () => {
    renderHook(() => useAppCore(appVocabURL, appIndexURL, defaultLocale));
    expect(mockedSWRHook).toHaveBeenCalledWith(
      ["app", appIndex],
      expect.any(Function)
    );
  });

  it("returns an app model", () => {
    const { result } = renderHook(() =>
      useAppCore(appVocabURL, appIndexURL, defaultLocale)
    );
    expect(result.current).toBeDefined();
    const { app } = result.current;
    expect(app).toEqual(createApp(defaultLocale, appVocabURL, appIndex));
  });

  it("returns error if appIndex fails", () => {
    const appIndexError = new Error("error");
    mockedAppIndexHook.mockReturnValue({ error: appIndexError });
    const { result } = renderHook(() =>
      useAppCore(appVocabURL, appIndexURL, defaultLocale)
    );
    expect(result.current.error).toEqual(appIndexError);
  });

  it("returns an empty app if app index is not available", () => {
    mockedAppIndexHook.mockReturnValue({ data: null });
    const { result } = renderHook(() =>
      useAppCore(appVocabURL, appIndexURL, defaultLocale)
    );
    expect(result.current.app).toEqual(mockEmptyApp());
  });
});
