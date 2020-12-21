import { ResourceBundleModel } from "../src/models/resourceBundle";
import { defaultLocale } from "./mockLanguage";

export const defaultBundle = "global";

export default function mockResourceBundle(
  overrides: Partial<ResourceBundleModel> = {}
): ResourceBundleModel {
  const label = overrides.label || defaultBundle;
  const locale = overrides.locale || defaultLocale;
  return {
    label,
    locale,
    data: {},
    urls: {
      errors: `https://example.com/${label}/errors.ttl`,
      faqs: `https://example.com/${label}/faqs.ttl`,
      localizations: `https://example.com/${label}/translations.${locale}.ttl`,
      translations: `https://example.com/${label}/translations.ttl`,
    },
    ...overrides,
  };
}
