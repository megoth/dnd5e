import { renderHook } from "@testing-library/react-hooks";
import * as solidClientFns from "@inrupt/solid-client";
import { useSession } from "@inrupt/solid-ui-react";
import useSWR from "swr";
import { mockedDataset } from "../../../__testUtils/mockDataset";
import useDataset from "./index";

jest.mock("swr");
const mockedSWRHook = useSWR as jest.Mock;

describe("useDataset", () => {
  const url = "http://example.com";

  it("caches with SWR", () => {
    mockedSWRHook.mockReturnValue(42);
    const { result } = renderHook(() => useDataset(url));
    expect(result.current).toBe(42);
    expect(mockedSWRHook).toHaveBeenCalledWith(
      [url, "dataset"],
      expect.any(Function)
    );
  });

  it("uses getSolidDataset to fetch datasets", async () => {
    const mockedGetSolidDataset = jest
      .spyOn(solidClientFns, "getSolidDataset")
      .mockResolvedValue(mockedDataset);
    const { fetch } = useSession();
    renderHook(() => useDataset(url));
    await expect(mockedSWRHook.mock.calls[0][1]()).resolves.toEqual(
      mockedDataset
    );
    expect(mockedGetSolidDataset).toHaveBeenCalledWith(url, { fetch });
  });
});
