import { packageAppIndex } from "../src/models/appIndex";
import mockAppIndexDataset, { appVocabURL } from "./mockAppIndexDataset";
import { currentLocales } from "../src/models/translation";

export default function mockAppIndex(
  bundleName,
  appIndexURL,
  dataset = mockAppIndexDataset()
) {
  return packageAppIndex(dataset, appIndexURL, currentLocales, appVocabURL);
}
