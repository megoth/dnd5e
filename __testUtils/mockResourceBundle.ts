import { ResourceBundleModel } from "../src/models/resourceBundle";
import mockFluentBundle from "./mockFluentBundle";

export default function mockResourceBundle(
  overrides: Partial<ResourceBundleModel> = {}
): ResourceBundleModel {
  const translationsUrl = "https://example.com/translations.ttl";
  return {
    errorsUrl: "https://example.com/errors.ttl",
    translationBundles: [mockFluentBundle(translationsUrl)],
    translationsUrl,
    ...overrides,
  };
}
