import {
  mockSolidDatasetFrom,
  setThing,
  SolidDataset,
} from "@inrupt/solid-client";
import { faqsURL } from "./mockApp";
import mockFAQThing from "./mockFAQThing";

export default function mockFAQsDataset(faqs = [mockFAQThing()]) {
  return faqs.reduce<SolidDataset>(
    (memo, faq) => setThing(memo, faq),
    mockSolidDatasetFrom(faqsURL)
  );
}
