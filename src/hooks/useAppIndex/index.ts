import useSWR from "swr";
import { getSolidDataset } from "@inrupt/solid-client";
import { getPath } from "../../utils";
import { packageAppIndex } from "../../models/appIndex";

export default function useAppIndex(appIndexURL, appVocabURL) {
  const appIndexResourceURL = getPath(appIndexURL);
  return useSWR("appIndex", async () => {
    const appIndexDataset = await getSolidDataset(appIndexResourceURL);
    return packageAppIndex(appIndexDataset, appIndexURL, appVocabURL);
  });
}
