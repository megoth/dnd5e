import { renderHook } from "@testing-library/react-hooks";
import useSWR from "swr";
import NestedError from "nested-error-stacks";
import useAppIndex from "../useAppIndex";
import mockAppIndex from "../../../__testUtils/mockAppIndex";
import useResourceBundle from "./index";
import * as resourceBundleFns from "../../models/resourceBundle";
import mockResourceBundle from "../../../__testUtils/mockResourceBundle";
import {
  createSWRErrorResponse,
  createSWRResponse,
  mockSWRAsPromise,
} from "../../../__testUtils/mockSWR";
import AppConfigWrapper from "../../../__testUtils/appConfigWrapper";

jest.mock("swr");
const mockedSWRHook = useSWR as jest.Mock;

jest.mock("../useAppIndex");
const mockedAppIndexHook = useAppIndex as jest.Mock;

const bundleName = "global";

describe("useResourceBundle", () => {
  const mockedResourceBundle = mockResourceBundle();
  let mockedAppIndex;

  beforeEach(() => {
    mockSWRAsPromise(mockedSWRHook);
    mockedAppIndex = mockAppIndex();
    mockedAppIndexHook.mockReturnValue(createSWRResponse(mockedAppIndex));
    jest
      .spyOn(resourceBundleFns, "loadResourceBundle")
      .mockResolvedValue(mockedResourceBundle);
  });

  it("caches with SWR", async () => {
    renderHook(() => useResourceBundle(bundleName), {
      wrapper: AppConfigWrapper,
    });
    expect(mockedSWRHook).toHaveBeenCalledWith(
      [bundleName, "resourceBundle", mockedAppIndex],
      expect.any(Function)
    );
  });

  it("returns a resource bundle", async () => {
    const { result } = renderHook(() => useResourceBundle(bundleName), {
      wrapper: AppConfigWrapper,
    });
    await expect(result.current).resolves.toEqual(mockedResourceBundle);
  });

  it("handles when appIndex is not loaded yet", async () => {
    mockedAppIndexHook.mockResolvedValue(createSWRResponse(null));
    const { result } = renderHook(() => useResourceBundle(bundleName), {
      wrapper: AppConfigWrapper,
    });
    await expect(result.current).resolves.toBe(null);
  });

  it("handles when appIndex fails to load", async () => {
    const error = new Error();
    mockedAppIndexHook.mockReturnValue(createSWRErrorResponse(error));
    const { result } = renderHook(() => useResourceBundle(bundleName), {
      wrapper: AppConfigWrapper,
    });
    await expect(result.current).rejects.toBe(error);
  });

  it("handles when no bundle is found", async () => {
    const { result } = renderHook(() => useResourceBundle("noBundle"), {
      wrapper: AppConfigWrapper,
    });
    await expect(result.current).rejects.toEqual(
      new NestedError("Unable to load bundle")
    );
  });
});
