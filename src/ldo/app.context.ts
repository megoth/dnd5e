import { LdoJsonldContext } from "@ldo/jsonld-dataset-proxy";

/**
 * =============================================================================
 * appContext: JSONLD Context for app
 * =============================================================================
 */
export const appContext: LdoJsonldContext = {
  resourceBundle: {
    "@id": "https://dnd5e.app/vocab/app#resourceBundle",
    "@type": "@id",
    "@isCollection": true,
  },
  label: {
    "@id": "http://www.w3.org/2000/01/rdf-schema#label",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  errorsIndex: {
    "@id": "https://dnd5e.app/vocab/app#errorsIndex",
    "@type": "@id",
    "@isCollection": true,
  },
  faqIndex: {
    "@id": "https://dnd5e.app/vocab/app#faqIndex",
    "@type": "@id",
    "@isCollection": true,
  },
  translationBase: {
    "@id": "https://dnd5e.app/vocab/app#translationBase",
    "@type": "@id",
  },
  translationsIndex: {
    "@id": "https://dnd5e.app/vocab/app#translationsIndex",
    "@type": "@id",
    "@isCollection": true,
  },
  language: {
    "@id": "https://dnd5e.app/vocab/app#language",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  translationsResource: {
    "@id": "https://dnd5e.app/vocab/app#translationsResource",
    "@type": "@id",
  },
  supportLanguage: {
    "@id": "https://dnd5e.app/vocab/app#supportLanguage",
    "@type": "@id",
    "@isCollection": true,
  },
  languageFlag: {
    "@id": "https://dnd5e.app/vocab/app#languageFlag",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  rulesBundle: {
    "@id": "https://dnd5e.app/vocab/app#rulesBundle",
    "@type": "@id",
    "@isCollection": true,
  },
  rulesResource: {
    "@id": "https://dnd5e.app/vocab/app#rulesResource",
    "@type": "@id",
    "@isCollection": true,
  },
  faqLabel: {
    "@id": "https://dnd5e.app/vocab/app#faqLabel",
    "@type": "@id",
  },
  definition: {
    "@id": "http://www.w3.org/2004/02/skos/core#definition",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  faqDescription: {
    "@id": "https://dnd5e.app/vocab/app#faqDescription",
    "@type": "@id",
  },
};
