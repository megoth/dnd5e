import { renderHook } from "@testing-library/react-hooks";
import useSWR from "swr";
import useTranslations from "./index";
import * as translationFns from "../../models/translation";
import mockSWR, { createSWRResponse } from "../../../__testUtils/mockSWR";

jest.mock("swr");
const mockedSWRHook = useSWR as jest.Mock;

describe("useTranslations", () => {
  beforeEach(() => mockSWR(mockedSWRHook));

  it("caches with SWR", () => {
    renderHook(() => useTranslations());
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
    const { result } = renderHook(() => useTranslations());
    await expect(result.current).resolves.toEqual(createSWRResponse(bundles));
    expect(mockedGetSolidDataset).toHaveBeenCalledWith([
      ...navigator.languages,
    ]);
  });
});
