import { negotiateLanguages } from "@fluent/langneg";
import { getNavigatorLanguages } from "./windowHelpers";

export function getLocale(
  selectedLocale?: string | string[],
  availableLanguages: Array<string> = ["en-US"],
): string {
  const languages = getNavigatorLanguages(selectedLocale);
  return negotiateLanguages(languages, availableLanguages, {
    defaultLocale: "en-US",
  })[0];
}
