import {
  addStringNoLocale,
  addUrl,
  mockSolidDatasetFrom,
  mockThingFrom,
  setThing,
} from "@inrupt/solid-client";
import { vcard, foaf, rdf } from "rdf-namespaces";
import { chain } from "../src/utils";

export const aliceWebIdDatasetUrl = "http://example.com/alice";
export const aliceWebIdUrl = `${aliceWebIdDatasetUrl}#me`;
export const aliceName = "Alice";
export const aliceNick = "A";
export const alicePhoto = "http://example.com/alice.jpg";

export function mockProfileDataset(webId = aliceWebIdUrl) {
  const profile = chain(
    mockThingFrom(webId),
    (t) => addStringNoLocale(t, vcard.fn, aliceName),
    (t) => addStringNoLocale(t, vcard.nickname, aliceNick),
    (t) => addUrl(t, vcard.hasPhoto, alicePhoto),
    (t) => addUrl(t, rdf.type, foaf.Person),
    (t) => addUrl(t, foaf.openid, aliceWebIdUrl)
  );
  return chain(mockSolidDatasetFrom(aliceWebIdDatasetUrl), (d) =>
    setThing(d, profile)
  );
}
