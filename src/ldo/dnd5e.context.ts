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
  levelSpellcasting: {
    "@id": "https://dnd5e.app/vocab/dnd5e#levelSpellcasting",
    "@type": "@id",
  },
  cantripsKnown: {
    "@id": "https://dnd5e.app/vocab/dnd5e#cantripsKnown",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  spellsKnown: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellsKnown",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  spellSlotsLevel1: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellSlotsLevel1",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  spellSlotsLevel2: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellSlotsLevel2",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  spellSlotsLevel3: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellSlotsLevel3",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  spellSlotsLevel4: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellSlotsLevel4",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  spellSlotsLevel5: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellSlotsLevel5",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  spellSlotsLevel6: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellSlotsLevel6",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  spellSlotsLevel7: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellSlotsLevel7",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  spellSlotsLevel8: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellSlotsLevel8",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  spellSlotsLevel9: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellSlotsLevel9",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  classSpecific: {
    "@id": "https://dnd5e.app/vocab/dnd5e#classSpecific",
    "@type": "@id",
  },
  rageCount: {
    "@id": "https://dnd5e.app/vocab/dnd5e#rageCount",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  rageDamageBonus: {
    "@id": "https://dnd5e.app/vocab/dnd5e#rageDamageBonus",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  brutalCriticalDice: {
    "@id": "https://dnd5e.app/vocab/dnd5e#brutalCriticalDice",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  bardicInspirationDice: {
    "@id": "https://dnd5e.app/vocab/dnd5e#bardicInspirationDice",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  songOfRestDie: {
    "@id": "https://dnd5e.app/vocab/dnd5e#songOfRestDie",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  magicalSecretsMax5: {
    "@id": "https://dnd5e.app/vocab/dnd5e#magicalSecretsMax5",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  magicalSecretsMax7: {
    "@id": "https://dnd5e.app/vocab/dnd5e#magicalSecretsMax7",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  magicalSecretsMax9: {
    "@id": "https://dnd5e.app/vocab/dnd5e#magicalSecretsMax9",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  channelDivinityChargers: {
    "@id": "https://dnd5e.app/vocab/dnd5e#channelDivinityChargers",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  destroyUndeadCr: {
    "@id": "https://dnd5e.app/vocab/dnd5e#destroyUndeadCr",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  wildShapeMaxCr: {
    "@id": "https://dnd5e.app/vocab/dnd5e#wildShapeMaxCr",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  wildShapeSwim: {
    "@id": "https://dnd5e.app/vocab/dnd5e#wildShapeSwim",
    "@type": "http://www.w3.org/2001/XMLSchema#boolean",
  },
  wildShapeFly: {
    "@id": "https://dnd5e.app/vocab/dnd5e#wildShapeFly",
    "@type": "http://www.w3.org/2001/XMLSchema#boolean",
  },
  actionSurges: {
    "@id": "https://dnd5e.app/vocab/dnd5e#actionSurges",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  indomitableUses: {
    "@id": "https://dnd5e.app/vocab/dnd5e#indomitableUses",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  extraAttacks: {
    "@id": "https://dnd5e.app/vocab/dnd5e#extraAttacks",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  kiPoints: {
    "@id": "https://dnd5e.app/vocab/dnd5e#kiPoints",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  unarmoredMovement: {
    "@id": "https://dnd5e.app/vocab/dnd5e#unarmoredMovement",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  martialArts: {
    "@id": "https://dnd5e.app/vocab/dnd5e#martialArts",
    "@type": "@id",
  },
  diceCount: {
    "@id": "https://dnd5e.app/vocab/dnd5e#diceCount",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  diceValue: {
    "@id": "https://dnd5e.app/vocab/dnd5e#diceValue",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  auraRange: {
    "@id": "https://dnd5e.app/vocab/dnd5e#auraRange",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  favoredEnemies: {
    "@id": "https://dnd5e.app/vocab/dnd5e#favoredEnemies",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  favoredTerrain: {
    "@id": "https://dnd5e.app/vocab/dnd5e#favoredTerrain",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  sneakAttack: {
    "@id": "https://dnd5e.app/vocab/dnd5e#sneakAttack",
    "@type": "@id",
  },
  sorceryPoints: {
    "@id": "https://dnd5e.app/vocab/dnd5e#sorceryPoints",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  metamagicKnown: {
    "@id": "https://dnd5e.app/vocab/dnd5e#metamagicKnown",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  creatingSpellSlots: {
    "@id": "https://dnd5e.app/vocab/dnd5e#creatingSpellSlots",
    "@type": "@id",
    "@container": "@set",
  },
  spellSlotLevel: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellSlotLevel",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  sorceryPointCost: {
    "@id": "https://dnd5e.app/vocab/dnd5e#sorceryPointCost",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  invocationsKnown: {
    "@id": "https://dnd5e.app/vocab/dnd5e#invocationsKnown",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  mysticArcanumLevel6: {
    "@id": "https://dnd5e.app/vocab/dnd5e#mysticArcanumLevel6",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  mysticArcanumLevel7: {
    "@id": "https://dnd5e.app/vocab/dnd5e#mysticArcanumLevel7",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  mysticArcanumLevel8: {
    "@id": "https://dnd5e.app/vocab/dnd5e#mysticArcanumLevel8",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  mysticArcanumLevel9: {
    "@id": "https://dnd5e.app/vocab/dnd5e#mysticArcanumLevel9",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
  },
  arcaneRecoverLevels: {
    "@id": "https://dnd5e.app/vocab/dnd5e#arcaneRecoverLevels",
    "@type": "http://www.w3.org/2001/XMLSchema#number",
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
  classSpellcasting: {
    "@id": "https://dnd5e.app/vocab/dnd5e#classSpellcasting",
    "@type": "@id",
  },
  spellcastingInfo: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellcastingInfo",
    "@type": "@id",
    "@container": "@set",
  },
  spellcastingAbility: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellcastingAbility",
    "@type": "@id",
  },
  spells: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spells",
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
