import { LdoJsonldContext } from "@ldo/jsonld-dataset-proxy";

/**
 * =============================================================================
 * solidProfileContext: JSONLD Context for solidProfile
 * =============================================================================
 */
export const solidProfileContext: LdoJsonldContext = {
  Person: {
    "@id": "http://schema.org/Person",
    "@context": {
      type: {
        "@id": "@type",
      },
      fn: {
        "@id": "http://www.w3.org/2006/vcard/ns#fn",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      name: {
        "@id": "http://xmlns.com/foaf/0.1/name",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      inbox: {
        "@id": "http://www.w3.org/ns/ldp#inbox",
        "@type": "http://www.w3.org/2000/01/rdf-schema#Resource",
      },
      preferencesFile: {
        "@id": "http://www.w3.org/ns/pim/space#preferencesFile",
        "@type": "http://www.w3.org/ns/pim/space#ConfigurationFile",
      },
      storage: {
        "@id": "http://www.w3.org/ns/pim/space#storage",
        "@type": "https://ldo.js.org/shapes/solidProfile.shex#Storage",
      },
      account: {
        "@id": "http://www.w3.org/ns/solid/terms#account",
        "@type": "http://www.w3.org/ns/solid/terms#Account",
      },
      oidcIssuer: {
        "@id": "http://www.w3.org/ns/solid/terms#oidcIssuer",
        "@type": "http://www.w3.org/2000/01/rdf-schema#Resource",
      },
      privateTypeIndex: {
        "@id": "http://www.w3.org/ns/solid/terms#privateTypeIndex",
        "@type": "http://www.w3.org/ns/solid/terms#UnlistedDocument",
      },
      publicTypeIndex: {
        "@id": "http://www.w3.org/ns/solid/terms#publicTypeIndex",
        "@type": "http://www.w3.org/ns/solid/terms#ListedDocument",
      },
    },
  },
  Person2: {
    "@id": "http://xmlns.com/foaf/0.1/Person",
    "@context": {
      type: {
        "@id": "@type",
      },
      fn: {
        "@id": "http://www.w3.org/2006/vcard/ns#fn",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      name: {
        "@id": "http://xmlns.com/foaf/0.1/name",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      inbox: {
        "@id": "http://www.w3.org/ns/ldp#inbox",
        "@type": "http://www.w3.org/2000/01/rdf-schema#Resource",
      },
      preferencesFile: {
        "@id": "http://www.w3.org/ns/pim/space#preferencesFile",
        "@type": "http://www.w3.org/ns/pim/space#ConfigurationFile",
      },
      storage: {
        "@id": "http://www.w3.org/ns/pim/space#storage",
        "@type": "https://ldo.js.org/shapes/solidProfile.shex#Storage",
      },
      account: {
        "@id": "http://www.w3.org/ns/solid/terms#account",
        "@type": "http://www.w3.org/ns/solid/terms#Account",
      },
      oidcIssuer: {
        "@id": "http://www.w3.org/ns/solid/terms#oidcIssuer",
        "@type": "http://www.w3.org/2000/01/rdf-schema#Resource",
      },
      privateTypeIndex: {
        "@id": "http://www.w3.org/ns/solid/terms#privateTypeIndex",
        "@type": "http://www.w3.org/ns/solid/terms#UnlistedDocument",
      },
      publicTypeIndex: {
        "@id": "http://www.w3.org/ns/solid/terms#publicTypeIndex",
        "@type": "http://www.w3.org/ns/solid/terms#ListedDocument",
      },
    },
  },
};
