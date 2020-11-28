import useSWR from "swr";
import { getTranslationBundleAll } from "../../models/translation";

export default function useTranslations() {
  return useSWR("translations", () =>
    getTranslationBundleAll([...navigator.languages])
  );
}
