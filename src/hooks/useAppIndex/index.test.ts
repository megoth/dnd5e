import { renderHook } from "@testing-library/react-hooks";
import useSWR from "swr";
import * as solidClientFns from "@inrupt/solid-client";
import { mockSWRAsPromise } from "../../../__testUtils/mockSWR";
import useAppIndex from "./index";
import mockAppIndexDataset, {
  appIndexURL,
  appVocabURL,
} from "../../../__testUtils/mockAppIndexDataset";
import { packageAppIndex } from "../../models/appIndex";
import { getPath } from "../../utils";
import { currentLocales } from "../../models/translation";

jest.mock("swr");
const mockedSWRHook = useSWR as jest.Mock;

const appIndexDataset = mockAppIndexDataset();

describe("useAppIndex", () => {
  let mockedGetSolidDataset;

  beforeEach(() => {
    mockSWRAsPromise(mockedSWRHook);
    mockedGetSolidDataset = jest
      .spyOn(solidClientFns, "getSolidDataset")
      .mockResolvedValue(appIndexDataset);
  });

  it("caches with SWR", () => {
    renderHook(() => useAppIndex(currentLocales, appIndexURL, appVocabURL));
    expect(mockedSWRHook).toHaveBeenCalledWith(
      "appIndex",
      expect.any(Function)
    );
  });

  it("uses getSolidDataset to fetch appIndex", async () => {
    const { result } = renderHook(() =>
      useAppIndex(currentLocales, appIndexURL, appVocabURL)
    );
    await expect(result.current).resolves.toEqual(
      packageAppIndex(appIndexDataset, appIndexURL, currentLocales, appVocabURL)
    );
    expect(mockedGetSolidDataset).toHaveBeenCalledWith(getPath(appIndexURL));
  });
});
