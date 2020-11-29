import { renderHook } from "@testing-library/react-hooks";
import * as solidClientFns from "@inrupt/solid-client";
import useSWR from "swr";
import NestedError from "nested-error-stacks";
import { mockedDataset } from "../../../__testUtils/mockDataset";
import useDataset from "./index";
import mockSWR, {
  createSWRErrorResponse,
  createSWRResponse,
} from "../../../__testUtils/mockSWR";
import { generateErrorUrl } from "../../models/error";

jest.mock("swr");
const mockedSWRHook = useSWR as jest.Mock;

describe("useDataset", () => {
  const url = "http://example.com";
  let mockedGetSolidDataset;

  beforeEach(() => {
    mockedGetSolidDataset = jest
      .spyOn(solidClientFns, "getSolidDataset")
      .mockResolvedValue(mockedDataset);
    mockSWR(mockedSWRHook);
  });

  it("caches with SWR", () => {
    renderHook(() => useDataset(url));
    expect(mockedSWRHook).toHaveBeenCalledWith(
      [url, "dataset"],
      expect.any(Function)
    );
  });

  it("returns the fetched datasets", async () => {
    const { result } = renderHook(() => useDataset(url));
    await expect(result.current).resolves.toEqual(
      createSWRResponse(mockedDataset)
    );
  });

  it("throws a custom error if it fails", async () => {
    const error = new Error("failed");
    mockedGetSolidDataset.mockRejectedValue(error);
    const { result } = renderHook(() => useDataset(url));
    await expect(result.current).resolves.toEqual(
      createSWRErrorResponse(
        new NestedError(generateErrorUrl("datasetLoadFailed"), error)
      )
    );
  });
});