import { getFluentBundles, getLanguages } from "./index";
import mockResourceBundle from "../../../__testUtils/mockResourceBundle";
import { currentLanguage } from "../translation";

describe("getLanguages", () => {
  it("returns the available languages", () => {
    expect(getLanguages(currentLanguage, ["en-US"])).toEqual(["en-US"]);
  });
});

describe("getFluentBundles", () => {
  it("returns fluent bundles in a resource bundle", () => {
    const resourceBundle = mockResourceBundle();
    const { fluentBundles } = resourceBundle;
    expect(getFluentBundles(resourceBundle)).toEqual(fluentBundles.global);
    expect(getFluentBundles(resourceBundle, "global")).toEqual(
      fluentBundles.global
    );
  });
});
