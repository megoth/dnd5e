import { AppModel, getBundleKey } from "../app";

export function getTranslationId(url) {
  return url.replace(/([:/.#])/g, "-");
}

export function getTranslationURL(
  id: string,
  { currentLocale, resourceBundles }: Partial<AppModel>,
  bundleName = "global"
) {
  const bundleKey = getBundleKey(currentLocale, bundleName);
  return `${resourceBundles[bundleKey].urls.translations}#${id}`;
}

export function getFailedMessage(translationURL) {
  return `[Translation for ${translationURL} does not exist]`;
}

export function getMessage(
  { currentLocale, fluentBundles, resourceBundles }: Partial<AppModel>,
  idOrURL,
  args: Record<string, any> = {}
) {
  const translationURL = idOrURL.startsWith("https://")
    ? idOrURL
    : getTranslationURL(idOrURL, { currentLocale, resourceBundles });
  const translationId = getTranslationId(translationURL);
  const fluentBundle = fluentBundles[currentLocale];
  const message = fluentBundle?.getMessage(translationId);
  return message?.value
    ? fluentBundle.formatPattern(message.value, args)
    : getFailedMessage(translationURL);
}
