import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * appContext: JSONLD Context for app
 * =============================================================================
 */
export const appContext: ContextDefinition = {
  resourceBundle: {
    "@id": "https://dnd5e.app/vocab/app#resourceBundle",
    "@type": "@id",
    "@container": "@set",
  },
  label: {
    "@id": "http://www.w3.org/2000/01/rdf-schema#label",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  errorsIndex: {
    "@id": "https://dnd5e.app/vocab/app#errorsIndex",
    "@type": "@id",
    "@container": "@set",
  },
  faqIndex: {
    "@id": "https://dnd5e.app/vocab/app#faqIndex",
    "@type": "@id",
    "@container": "@set",
  },
  translationBase: {
    "@id": "https://dnd5e.app/vocab/app#translationBase",
    "@type": "@id",
  },
  translationsIndex: {
    "@id": "https://dnd5e.app/vocab/app#translationsIndex",
    "@type": "@id",
    "@container": "@set",
  },
  language: {
    "@id": "https://dnd5e.app/vocab/app#language",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  resource: {
    "@id": "https://dnd5e.app/vocab/app#resource",
    "@type": "@id",
  },
  supportLanguage: {
    "@id": "https://dnd5e.app/vocab/app#supportLanguage",
    "@type": "@id",
    "@container": "@set",
  },
  languageFlag: {
    "@id": "https://dnd5e.app/vocab/app#languageFlag",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  type: {
    "@id": "@type",
    "@type": [
      "https://dnd5e.app/vocab/app#FAQ",
      "http://www.w3.org/2000/01/rdf-schema#Literal",
    ],
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
