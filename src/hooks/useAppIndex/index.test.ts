import { renderHook } from "@testing-library/react-hooks";
import useSWR from "swr";
import * as solidClientFns from "@inrupt/solid-client";
import { mockSWRAsPromise } from "../../../__testUtils/mockSWR";
import AppConfigWrapper from "../../../__testUtils/appConfigWrapper";
import mockAppConfig from "../../../__testUtils/mockAppConfig";
import useAppIndex from "./index";
import mockAppIndex from "../../../__testUtils/mockAppIndex";
import { createLocalResponse, getPath } from "../../utils";
import appIndexTurtle from "../../../public/data/index.ttl";

jest.mock("swr");
const mockedSWRHook = useSWR as jest.Mock;

const appConfig = mockAppConfig();
const { solidBase } = appConfig;
const solidBaseUrl = getPath(solidBase);

describe("useAppIndex", () => {
  beforeEach(() => mockSWRAsPromise(mockedSWRHook));

  it("caches with SWR", () => {
    renderHook(() => useAppIndex(), {
      wrapper: AppConfigWrapper,
    });
    expect(mockedSWRHook).toHaveBeenCalledWith(
      "appIndex",
      expect.any(Function)
    );
  });

  it("uses getSolidDataset to fetch appIndex", async () => {
    const appIndex = mockAppIndex();
    const mockedGetSolidDataset = jest
      .spyOn(solidClientFns, "getSolidDataset")
      .mockResolvedValue(appIndex);
    const { result } = renderHook(() => useAppIndex(), {
      wrapper: AppConfigWrapper,
    });
    await expect(result.current).resolves.toEqual(appIndex);
    expect(mockedGetSolidDataset).toHaveBeenCalledWith(
      solidBaseUrl,
      expect.any(Object)
    );
    await expect(
      mockedGetSolidDataset.mock.calls[0][1].fetch(solidBase)
    ).resolves.toEqual(createLocalResponse(appIndexTurtle));
  });
});
