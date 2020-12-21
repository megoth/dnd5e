export type ResourceBundleIndex = {
  label: string;
  locale: string;
  urls: {
    errors?: string | null;
    faqs?: string | null;
    localizations?: string | null;
    translations?: string | null;
  };
};
