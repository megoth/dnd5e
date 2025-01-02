import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * dnd5eContext: JSONLD Context for dnd5e
 * =============================================================================
 */
export const dnd5eContext: ContextDefinition = {
  type: {
    "@id": "@type",
    "@type": ["@id", "http://www.w3.org/2000/01/rdf-schema#Class"],
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
  minimumScore: {
    "@id": "https://dnd5e.app/vocab/dnd5e#minimumScore",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  count: {
    "@id": "https://dnd5e.app/vocab/dnd5e#count",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  actionType: {
    "@id": "https://dnd5e.app/vocab/dnd5e#actionType",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  startingProficiencies: {
    "@id": "https://dnd5e.app/vocab/dnd5e#startingProficiencies",
    "@type": "@id",
    "@container": "@set",
  },
  proficiencyType: {
    "@id": "https://dnd5e.app/vocab/dnd5e#proficiencyType",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  classes: {
    "@id": "https://dnd5e.app/vocab/dnd5e#classes",
    "@type": "@id",
    "@container": "@set",
  },
  hitDie: {
    "@id": "https://dnd5e.app/vocab/dnd5e#hitDie",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  levels: {
    "@id": "https://dnd5e.app/vocab/dnd5e#levels",
    "@type": "@id",
    "@container": "@set",
  },
  level: {
    "@id": "https://dnd5e.app/vocab/dnd5e#level",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  abilityScoreBonuses: {
    "@id": "https://dnd5e.app/vocab/dnd5e#abilityScoreBonuses",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  proficiencyBonus: {
    "@id": "https://dnd5e.app/vocab/dnd5e#proficiencyBonus",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  features: {
    "@id": "https://dnd5e.app/vocab/dnd5e#features",
    "@type": "@id",
    "@container": "@set",
  },
  class: {
    "@id": "https://dnd5e.app/vocab/dnd5e#class",
    "@type": "@id",
  },
  subclass: {
    "@id": "https://dnd5e.app/vocab/dnd5e#subclass",
    "@type": "@id",
  },
  parent: {
    "@id": "https://dnd5e.app/vocab/dnd5e#parent",
    "@type": "@id",
  },
  prerequisites: {
    "@id": "https://dnd5e.app/vocab/dnd5e#prerequisites",
    "@type": "@id",
    "@container": "@set",
  },
  ofType: {
    "@id": "http://www.w3.org/1999/02/22-rdf-syntax-ns#ofType",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  feature: {
    "@id": "https://dnd5e.app/vocab/dnd5e#feature",
    "@type": "@id",
  },
  spell: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spell",
    "@type": "@id",
  },
  featureSpecific: {
    "@id": "https://dnd5e.app/vocab/dnd5e#featureSpecific",
    "@type": "@id",
  },
  expertiseOptions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#expertiseOptions",
    "@type": "@id",
  },
  choose: {
    "@id": "https://dnd5e.app/vocab/dnd5e#choose",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  ofType2: {
    "@id": "https://dnd5e.app/vocab/dnd5e#ofType",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  from: {
    "@id": "https://dnd5e.app/vocab/dnd5e#from",
    "@type": "@id",
  },
  abilityScores: {
    "@id": "https://dnd5e.app/vocab/dnd5e#abilityScores",
    "@type": "@id",
    "@container": "@set",
  },
  actions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#actions",
    "@type": "@id",
    "@container": "@set",
  },
  bonuses: {
    "@id": "https://dnd5e.app/vocab/dnd5e#bonuses",
    "@type": "@id",
    "@container": "@set",
  },
  bonus: {
    "@id": "https://dnd5e.app/vocab/dnd5e#bonus",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  breaths: {
    "@id": "https://dnd5e.app/vocab/dnd5e#breaths",
    "@type": "@id",
    "@container": "@set",
  },
  difficultyClass: {
    "@id": "https://dnd5e.app/vocab/dnd5e#difficultyClass",
    "@type": "@id",
  },
  dcValue: {
    "@id": "https://dnd5e.app/vocab/dnd5e#dcValue",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  successType: {
    "@id": "https://dnd5e.app/vocab/dnd5e#successType",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  damage: {
    "@id": "https://dnd5e.app/vocab/dnd5e#damage",
    "@type": "@id",
    "@container": "@set",
  },
  dice: {
    "@id": "https://dnd5e.app/vocab/dnd5e#dice",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  type2: {
    "@id": "https://dnd5e.app/vocab/dnd5e#type",
    "@type": "@id",
  },
  choices: {
    "@id": "https://dnd5e.app/vocab/dnd5e#choices",
    "@type": "@id",
    "@container": "@set",
  },
  choice: {
    "@id": "https://dnd5e.app/vocab/dnd5e#choice",
    "@type": "@id",
  },
  counts: {
    "@id": "https://dnd5e.app/vocab/dnd5e#counts",
    "@type": "@id",
    "@container": "@set",
  },
  of: {
    "@id": "https://dnd5e.app/vocab/dnd5e#of",
    "@type": "@id",
  },
  damages: {
    "@id": "https://dnd5e.app/vocab/dnd5e#damages",
    "@type": "@id",
    "@container": "@set",
  },
  "dice:": {
    "@id": "https://dnd5e.app/vocab/dnd5e#dice:",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  notes: {
    "@id": "https://dnd5e.app/vocab/dnd5e#notes",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  equipmentCategory: {
    "@id": "https://dnd5e.app/vocab/dnd5e#equipmentCategory",
    "@type": "@id",
  },
  equipmentList: {
    "@id": "https://dnd5e.app/vocab/dnd5e#equipmentList",
    "@type": "@id",
    "@container": "@set",
  },
  ideals: {
    "@id": "https://dnd5e.app/vocab/dnd5e#ideals",
    "@type": "@id",
    "@container": "@set",
  },
  description2: {
    "@id": "https://dnd5e.app/vocab/dnd5e#description",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  alignments: {
    "@id": "https://dnd5e.app/vocab/dnd5e#alignments",
    "@type": "@id",
    "@container": "@set",
  },
  multiples: {
    "@id": "https://dnd5e.app/vocab/dnd5e#multiples",
    "@type": "@id",
    "@container": "@set",
  },
  references: {
    "@id": "https://dnd5e.app/vocab/dnd5e#references",
    "@type": "@id",
    "@container": "@set",
  },
  equipment: {
    "@id": "https://dnd5e.app/vocab/dnd5e#equipment",
    "@type": "@id",
  },
  language: {
    "@id": "https://dnd5e.app/vocab/dnd5e#language",
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
  proficiency: {
    "@id": "https://dnd5e.app/vocab/dnd5e#proficiency",
    "@type": "@id",
  },
  strings: {
    "@id": "https://dnd5e.app/vocab/dnd5e#strings",
    "@type": "@id",
    "@container": "@set",
  },
  "string:": {
    "@id": "https://dnd5e.app/vocab/dnd5e#string:",
    "@type": "http://www.w3.org/2001/XMLSchema#strsing",
  },
  fromResourceList: {
    "@id": "https://dnd5e.app/vocab/dnd5e#fromResourceList",
    "@type": "@id",
  },
  resourceList: {
    "@id": "https://dnd5e.app/vocab/dnd5e#resourceList",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  invocations: {
    "@id": "https://dnd5e.app/vocab/dnd5e#invocations",
    "@type": "@id",
    "@container": "@set",
  },
  subfeatureOptions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#subfeatureOptions",
    "@type": "@id",
  },
  multiclassing: {
    "@id": "https://dnd5e.app/vocab/dnd5e#multiclassing",
    "@type": "@id",
  },
  prerequisiteOptions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#prerequisiteOptions",
    "@type": "@id",
  },
  proficiencies: {
    "@id": "https://dnd5e.app/vocab/dnd5e#proficiencies",
    "@type": "@id",
    "@container": "@set",
  },
  proficiencyChoices: {
    "@id": "https://dnd5e.app/vocab/dnd5e#proficiencyChoices",
    "@type": "@id",
    "@container": "@set",
  },
  savingThrows: {
    "@id": "https://dnd5e.app/vocab/dnd5e#savingThrows",
    "@type": "@id",
    "@container": "@set",
  },
  startingEquipment: {
    "@id": "https://dnd5e.app/vocab/dnd5e#startingEquipment",
    "@type": "@id",
    "@container": "@set",
  },
  quantity: {
    "@id": "https://dnd5e.app/vocab/dnd5e#quantity",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  startingEquipmentOptions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#startingEquipmentOptions",
    "@type": "@id",
    "@container": "@set",
  },
  classLevels: {
    "@id": "https://dnd5e.app/vocab/dnd5e#classLevels",
    "@type": "@id",
    "@container": "@set",
  },
  races: {
    "@id": "https://dnd5e.app/vocab/dnd5e#races",
    "@type": "@id",
    "@container": "@set",
  },
  reference: {
    "@id": "https://dnd5e.app/vocab/dnd5e#reference",
    "@type": "@id",
  },
  languageOptions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#languageOptions",
    "@type": "@id",
  },
  personalityTraits: {
    "@id": "https://dnd5e.app/vocab/dnd5e#personalityTraits",
    "@type": "@id",
  },
  bonds: {
    "@id": "https://dnd5e.app/vocab/dnd5e#bonds",
    "@type": "@id",
  },
  flaws: {
    "@id": "https://dnd5e.app/vocab/dnd5e#flaws",
    "@type": "@id",
  },
};
