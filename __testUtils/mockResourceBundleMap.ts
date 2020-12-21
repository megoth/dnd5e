import { ResourceBundleModel } from "../src/models/resourceBundle";
import { getBundleKey, ResourceBundleMap } from "../src/models/app";
import { defaultLocale } from "./mockLanguage";
import mockResourceBundle, { defaultBundle } from "./mockResourceBundle";

export default function mockResourceBundleMap(
  overrides: Partial<ResourceBundleModel> = {}
): ResourceBundleMap {
  const label = overrides.label || defaultBundle;
  const locale = overrides.locale || defaultLocale;
  return {
    [getBundleKey(locale, label)]: mockResourceBundle(overrides),
  };
}
