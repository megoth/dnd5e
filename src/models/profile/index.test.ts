import { mockThingFrom, setStringNoLocale } from "@inrupt/solid-client";
import { foaf, vcard } from "rdf-namespaces";
import getProfileName from "./index";

describe("getProfileName", () => {
  const profile = mockThingFrom("http://example.com/#profile");
  const profileUsingVcardFn = setStringNoLocale(profile, vcard.fn, "vcard");
  const profileUsingFoafName = setStringNoLocale(profile, foaf.name, "foaf");

  it("tries to get by vcard.fn", () =>
    expect(getProfileName(profileUsingVcardFn)).toEqual("vcard"));
  it("tries to get by foaf.name", () =>
    expect(getProfileName(profileUsingFoafName)).toEqual("foaf"));
  it("return default string if no name found", () =>
    expect(getProfileName(profile)).toEqual("Unknown"));
});
