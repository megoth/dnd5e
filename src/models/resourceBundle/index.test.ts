import mockApp from "../../../__testUtils/mockApp";
import { defaultLocale } from "../../../__testUtils/mockLanguage";
import mockResourceBundle from "../../../__testUtils/mockResourceBundle";
import { updateAppWithResourceBundle } from "./index";
import { getBundleKey } from "../app";

describe("updateAppWithResourceBundle", () => {
  it("adds resource bundle to app model", () => {
    const app = mockApp();
    const label = "test";
    const resourceBundle = mockResourceBundle({
      label,
    });
    const updatedApp = updateAppWithResourceBundle(app, resourceBundle);
    expect(
      updatedApp.resourceBundles[getBundleKey(defaultLocale, label)]
    ).toBeDefined();
  });
});
