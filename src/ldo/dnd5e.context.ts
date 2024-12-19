import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * dnd5eContext: JSONLD Context for dnd5e
 * =============================================================================
 */
export const dnd5eContext: ContextDefinition = {
  type: {
    "@id": "@type",
    "@type": [
      "https://dnd5e.app/vocab/dnd5e#AbilityScore",
      "https://dnd5e.app/vocab/dnd5e#Alignment",
      "https://dnd5e.app/vocab/dnd5e#Class",
      "https://dnd5e.app/vocab/dnd5e#Language",
      "https://dnd5e.app/vocab/dnd5e#Proficiency",
      "https://dnd5e.app/vocab/dnd5e#Race",
    ],
  },
  label: {
    "@id": "http://www.w3.org/2000/01/rdf-schema#label",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  description: {
    "@id": "http://purl.org/dc/terms/description",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
    "@container": "@set",
  },
  abbreviation: {
    "@id": "https://dnd5e.app/vocab/dnd5e#abbreviation",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  skill: {
    "@id": "https://dnd5e.app/vocab/dnd5e#skill",
    "@type": "@id",
    "@container": "@set",
  },
  abilityScore: {
    "@id": "https://dnd5e.app/vocab/dnd5e#abilityScore",
    "@type": "@id",
  },
  languageType: {
    "@id": "https://dnd5e.app/vocab/dnd5e#languageType",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  script: {
    "@id": "https://dnd5e.app/vocab/dnd5e#script",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  typicalSpeakers: {
    "@id": "https://dnd5e.app/vocab/dnd5e#typicalSpeakers",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
    "@container": "@set",
  },
  proficiencyType: {
    "@id": "https://dnd5e.app/vocab/dnd5e#proficiencyType",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  class: {
    "@id": "https://dnd5e.app/vocab/dnd5e#class",
    "@type": "@id",
    "@container": "@set",
  },
  race: {
    "@id": "https://dnd5e.app/vocab/dnd5e#race",
    "@type": "@id",
    "@container": "@set",
  },
  reference: {
    "@id": "https://dnd5e.app/vocab/dnd5e#reference",
    "@type": "@id",
  },
};
