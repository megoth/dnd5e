import { mockThingFrom, setUrl } from "@inrupt/solid-client";
import { rdf } from "rdf-namespaces";
import { getAppTerm } from "../src/models/appIndex";
import { appVocabURL } from "./mockAppIndexDataset";
import { chain } from "../src/utils";
import { faqsURL } from "./mockApp";

export const faqId = "faq";
export const faqURL = `${faqsURL}#${faqId}`;
export const faqLabelURL = "https://example.com/#faqLabel";
export const faqDescriptionURL = "https://example.com/#faqDescription";

export default function mockFAQThing(id = faqId) {
  return chain(
    mockThingFrom(`${faqsURL}#${id}`),
    (t) => setUrl(t, rdf.type, getAppTerm("FAQ", { appVocabURL })),
    (t) => setUrl(t, getAppTerm("faqLabel", { appVocabURL }), faqLabelURL),
    (t) =>
      setUrl(
        t,
        getAppTerm("faqDescription", { appVocabURL }),
        faqDescriptionURL
      )
  );
}
