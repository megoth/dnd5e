import {
  mockSolidDatasetFrom,
  mockThingFrom,
  setStringNoLocale,
  setThing,
  setUrl,
} from "@inrupt/solid-client";
import { rdfs } from "rdf-namespaces";
import { chain } from "../src/utils";
import mockAppConfig from "./mockAppConfig";
import { getAppTerm } from "../src/models/app";

const globalResourceUrl = "https://example.com/index.ttl#globalResource";
const errorsUrl = "https://example.com/errors.ttl";
const translationsUrl = "https://example.com/translations.ttl";

export default function mockAppIndex() {
  const { solidBase } = mockAppConfig();
  return chain(
    mockSolidDatasetFrom(solidBase),
    (d) =>
      setThing(
        d,
        chain(mockThingFrom(solidBase), (t) =>
          setUrl(t, getAppTerm("resourceBundle"), globalResourceUrl)
        )
      ),
    (d) =>
      setThing(
        d,
        chain(
          mockThingFrom(globalResourceUrl),
          (t) => setStringNoLocale(t, rdfs.label, "global"),
          (t) => setUrl(t, getAppTerm("errorsIndex"), errorsUrl),
          (t) => setUrl(t, getAppTerm("translationsIndex"), translationsUrl)
        )
      )
  );
}
