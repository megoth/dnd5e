import {
  addStringNoLocale,
  addUrl,
  mockSolidDatasetFrom,
  mockThingFrom,
  setThing,
} from "@inrupt/solid-client";
import { vcard, foaf, rdf } from "rdf-namespaces";
import { chain } from "../src/utils";

export const aliceWebIdDatasetURL = "http://example.com/alice";
export const aliceWebIdURL = `${aliceWebIdDatasetURL}#me`;
export const aliceName = "Alice";
export const aliceNick = "A";
export const alicePhoto = "http://example.com/alice.jpg";

export function mockProfileDataset(webId = aliceWebIdURL) {
  const profile = chain(
    mockThingFrom(webId),
    (t) => addStringNoLocale(t, vcard.fn, aliceName),
    (t) => addStringNoLocale(t, vcard.nickname, aliceNick),
    (t) => addUrl(t, vcard.hasPhoto, alicePhoto),
    (t) => addUrl(t, rdf.type, foaf.Person),
    (t) => addUrl(t, foaf.openid, aliceWebIdURL)
  );
  return chain(mockSolidDatasetFrom(aliceWebIdDatasetURL), (d) =>
    setThing(d, profile)
  );
}
