import { packageAppIndex } from "../src/models/appIndex";
import mockAppIndexDataset, {
  appIndexURL,
  appVocabURL,
} from "./mockAppIndexDataset";

export default function mockAppIndex(dataset = mockAppIndexDataset()) {
  return packageAppIndex(dataset, appIndexURL, appVocabURL);
}
