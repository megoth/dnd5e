import { getFluentBundles, getLanguages } from "./index";
import mockApp from "../../../__testUtils/mockApp";
import { currentLanguage } from "../translation";

describe("getLanguages", () => {
  it("returns the available languages", () => {
    expect(getLanguages(currentLanguage, ["en-US"])).toEqual(["en-US"]);
  });
});

describe("getFluentBundles", () => {
  it("returns fluent bundles in an app", () => {
    const app = mockApp();
    const { fluentBundles } = app;
    expect(getFluentBundles(app)).toEqual(fluentBundles.global);
    expect(getFluentBundles(app, "global")).toEqual(fluentBundles.global);
  });
});
