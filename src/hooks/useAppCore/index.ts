import useSWR from "swr";
import useAppIndex from "../useAppIndex";
import { AppModel, createApp } from "../../models/app";

export type AppCoreHookResult = {
  app: AppModel | null;
  error: Error | null;
};

export default function useAppCore(
  appVocabURL,
  appIndexURL,
  defaultLocale
): AppCoreHookResult {
  const { data: appIndex, error: appIndexError } = useAppIndex(
    appIndexURL,
    appVocabURL
  );
  const { data: app, error: appError } = useSWR(["app", appIndex], () =>
    createApp(defaultLocale, appVocabURL, appIndex)
  );
  return {
    app,
    error: appIndexError || appError,
  };
}
