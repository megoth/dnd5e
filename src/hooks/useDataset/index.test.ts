import { renderHook } from "@testing-library/react-hooks";
import * as solidClientFns from "@inrupt/solid-client";
import useSWR from "swr";
import NestedError from "nested-error-stacks";
import { mockedDataset } from "../../../__testUtils/mockDataset";
import useDataset from "./index";
import { mockSWRAsPromise } from "../../../__testUtils/mockSWR";
import useApp from "../useApp";
import mockApp from "../../../__testUtils/mockApp";
import { getError } from "../../models/error";
import mockAppHook from "../../../__testUtils/mockAppHook";

jest.mock("swr");
const mockedSWRHook = useSWR as jest.Mock;

jest.mock("../useApp");
const mockedAppHook = useApp as jest.Mock;

const app = mockApp();

describe("useDataset", () => {
  const url = "http://example.com";
  let mockedGetSolidDataset;

  beforeEach(() => {
    mockedGetSolidDataset = jest
      .spyOn(solidClientFns, "getSolidDataset")
      .mockResolvedValue(mockedDataset);
    mockSWRAsPromise(mockedSWRHook);
    mockAppHook(mockedAppHook, app);
  });

  it("caches with SWR", () => {
    const config = {};
    renderHook(() => useDataset(url, "test", config));
    expect(mockedSWRHook).toHaveBeenCalledWith(
      [url, "dataset", "test"],
      expect.any(Function),
      config
    );
  });

  it("returns datasets for valid URLs", async () => {
    const { result } = renderHook(() => useDataset(url));
    await expect(result.current).resolves.toEqual(mockedDataset);
  });

  it("returns null for invalid URLS", async () => {
    const { result } = renderHook(() => useDataset(null));
    await expect(result.current).resolves.toBeNull();
  });

  it("throws a translated error", async () => {
    const error = new Error("failed");
    mockedGetSolidDataset.mockRejectedValue(error);
    const { result } = renderHook(() => useDataset(url));
    await expect(result.current).rejects.toEqual(
      getError("datasetLoadFailed", app, error)
    );
  });

  it("throws an untranslated error if app is not available when it fails", async () => {
    mockAppHook(mockedAppHook, null);
    const error = new Error("failed");
    mockedGetSolidDataset.mockRejectedValue(error);
    const { result } = renderHook(() => useDataset(url));
    await expect(result.current).rejects.toEqual(
      new NestedError("Failed to load dataset", error)
    );
  });
});
