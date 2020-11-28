import { getStringNoLocale } from "@inrupt/solid-client";
import { foaf, vcard } from "rdf-namespaces";

export default function getProfileName(profile) {
  return (
    getStringNoLocale(profile, vcard.fn) ||
    getStringNoLocale(profile, foaf.name) ||
    "Unknown"
  );
}
