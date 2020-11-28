import { renderHook } from "@testing-library/react-hooks";
import useSWR from "swr";
import useTranslations from "./index";
import * as translationFns from "../../models/translation";

jest.mock("swr");
const mockedSWRHook = useSWR as jest.Mock;

describe("useTranslations", () => {
  it("caches with SWR", () => {
    mockedSWRHook.mockReturnValue(42);
    const { result } = renderHook(() => useTranslations());
    expect(result.current).toBe(42);
    expect(mockedSWRHook).toHaveBeenCalledWith(
      "translations",
      expect.any(Function)
    );
  });

  it("uses getTranslationBundleAll to fetch translations", async () => {
    const bundles = [];
    const mockedGetSolidDataset = jest
      .spyOn(translationFns, "getTranslationBundleAll")
      .mockResolvedValue(bundles);
    renderHook(() => useTranslations());
    await expect(mockedSWRHook.mock.calls[0][1]()).resolves.toEqual(bundles);
    expect(mockedGetSolidDataset).toHaveBeenCalledWith([
      ...navigator.languages,
    ]);
  });
});
