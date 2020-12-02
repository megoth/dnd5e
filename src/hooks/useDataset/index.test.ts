import { renderHook } from "@testing-library/react-hooks";
import * as solidClientFns from "@inrupt/solid-client";
import useSWR from "swr";
import { mockedDataset } from "../../../__testUtils/mockDataset";
import useDataset from "./index";
import { mockSWRAsPromise } from "../../../__testUtils/mockSWR";
import AppConfigWrapper from "../../../__testUtils/appConfigWrapper";
import useResourceBundle from "../useResourceBundle";
import mockResourceBundle from "../../../__testUtils/mockResourceBundle";
import { getError } from "../../models/resourceBundle";

jest.mock("swr");
const mockedSWRHook = useSWR as jest.Mock;

jest.mock("../useResourceBundle");
const mockedResourceBundleHook = useResourceBundle as jest.Mock;

describe("useDataset", () => {
  const url = "http://example.com";
  let mockedGetSolidDataset;

  beforeEach(() => {
    mockedGetSolidDataset = jest
      .spyOn(solidClientFns, "getSolidDataset")
      .mockResolvedValue(mockedDataset);
    mockSWRAsPromise(mockedSWRHook);
    mockedResourceBundleHook.mockReturnValue({
      data: { bundle: mockResourceBundle() },
    });
  });

  it("caches with SWR", () => {
    renderHook(() => useDataset(url, "test"), {
      wrapper: AppConfigWrapper,
    });
    expect(mockedSWRHook).toHaveBeenCalledWith(
      [url, "dataset", "test"],
      expect.any(Function)
    );
  });

  it("returns the fetched datasets", async () => {
    const { result } = renderHook(() => useDataset(url), {
      wrapper: AppConfigWrapper,
    });
    await expect(result.current).resolves.toEqual(mockedDataset);
  });

  it("throws a custom error if it fails", async () => {
    const error = new Error("failed");
    mockedGetSolidDataset.mockRejectedValue(error);
    const bundle = mockResourceBundle();
    mockedResourceBundleHook.mockReturnValue({ data: bundle });
    const { result } = renderHook(() => useDataset(url), {
      wrapper: AppConfigWrapper,
    });
    await expect(result.current).rejects.toEqual(
      getError("datasetLoadFailed", bundle, error)
    );
  });
});
