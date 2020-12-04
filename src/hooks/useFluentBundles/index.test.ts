import { mockSolidDatasetFrom } from "@inrupt/solid-client";
import { renderHook } from "@testing-library/react-hooks";
import { localizedIndexURL } from "../../../__testUtils/mockResourceBundle";
import { createSWRResponse } from "../../../__testUtils/mockSWR";
import useFluentBundles from "./index";
import { currentLocales } from "../../models/translation";

describe("useFluentBundles", () => {
  it("returns an array of FluentBundles", () => {
    const dataset = mockSolidDatasetFrom(localizedIndexURL);
    const localizedIndexSWR = createSWRResponse(dataset);
    const { result } = renderHook(() =>
      useFluentBundles(localizedIndexSWR, currentLocales)
    );
    expect(result.current.map((bundle) => bundle.locales)).toEqual([
      currentLocales,
    ]);
  });

  it("returns null if localized SWR is not available", () => {
    const { result } = renderHook(() => useFluentBundles(null, currentLocales));
    expect(result.current).toBeNull();
  });

  it("returns null localized translations are not available", () => {
    const localizedIndexSWR = createSWRResponse(null);
    const { result } = renderHook(() =>
      useFluentBundles(localizedIndexSWR, currentLocales)
    );
    expect(result.current).toBeNull();
  });
});
