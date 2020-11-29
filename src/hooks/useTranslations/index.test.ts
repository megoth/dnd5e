import { renderHook } from "@testing-library/react-hooks";
import useSWR from "swr";
import useTranslations from "./index";
import * as translationFns from "../../models/translation";
import mockSWR, { createSWRResponse } from "../../../__testUtils/mockSWR";
import AppConfigWrapper from "../../../__testUtils/appConfigWrapper";
import mockAppConfig from "../../../__testUtils/mockAppConfig";

jest.mock("swr");
const mockedSWRHook = useSWR as jest.Mock;

const appConfig = mockAppConfig();

describe("useTranslations", () => {
  beforeEach(() => mockSWR(mockedSWRHook));

  it("caches with SWR", () => {
    renderHook(() => useTranslations(), {
      wrapper: AppConfigWrapper,
    });
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
    const { result } = renderHook(() => useTranslations(), {
      wrapper: AppConfigWrapper,
    });
    await expect(result.current).resolves.toEqual(createSWRResponse(bundles));
    expect(mockedGetSolidDataset).toHaveBeenCalledWith(
      [...navigator.languages],
      appConfig
    );
  });
});
