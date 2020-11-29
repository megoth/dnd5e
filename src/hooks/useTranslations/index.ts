import useSWR from "swr";
import { getTranslationBundleAll } from "../../models/translation";
import { useAppConfig } from "../../contexts/appConfig";

export default function useTranslations() {
  const appConfig = useAppConfig();
  return useSWR("translations", () =>
    getTranslationBundleAll([...navigator.languages], appConfig)
  );
}
