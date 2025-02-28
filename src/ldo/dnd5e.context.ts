import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * dnd5eContext: JSONLD Context for dnd5e
 * =============================================================================
 */
export const dnd5eContext: ContextDefinition = {
  bonus: {
    "@id": "https://dnd5e.app/vocab/dnd5e#bonus",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  abilityScore: {
    "@id": "https://dnd5e.app/vocab/dnd5e#abilityScore",
    "@type": "@id",
  },
  type: {
    "@id": "@type",
  },
  AbilityScore: "https://dnd5e.app/vocab/dnd5e#AbilityScore",
  label: {
    "@id": "http://www.w3.org/2000/01/rdf-schema#label",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  description: {
    "@id": "http://purl.org/dc/terms/description",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  abbreviation: {
    "@id": "https://dnd5e.app/vocab/dnd5e#abbreviation",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  skillList: {
    "@id": "https://dnd5e.app/vocab/dnd5e#skillList",
    "@type": "@id",
    "@container": "@set",
  },
  Skill: "https://dnd5e.app/vocab/dnd5e#Skill",
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
  Alignment: "https://dnd5e.app/vocab/dnd5e#Alignment",
  areaSize: {
    "@id": "https://dnd5e.app/vocab/dnd5e#areaSize",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  ofType: {
    "@id": "https://dnd5e.app/vocab/dnd5e#ofType",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  armorCategory: {
    "@id": "https://dnd5e.app/vocab/dnd5e#armorCategory",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  armorClass: {
    "@id": "https://dnd5e.app/vocab/dnd5e#armorClass",
    "@type": "@id",
  },
  base: {
    "@id": "https://dnd5e.app/vocab/dnd5e#base",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  dexBonus: {
    "@id": "https://dnd5e.app/vocab/dnd5e#dexBonus",
    "@type": "http://www.w3.org/2001/XMLSchema#boolean",
  },
  maxBonus: {
    "@id": "https://dnd5e.app/vocab/dnd5e#maxBonus",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  strMinimum: {
    "@id": "https://dnd5e.app/vocab/dnd5e#strMinimum",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  stealthDisadvantage: {
    "@id": "https://dnd5e.app/vocab/dnd5e#stealthDisadvantage",
    "@type": "http://www.w3.org/2001/XMLSchema#boolean",
  },
  weight: {
    "@id": "https://dnd5e.app/vocab/dnd5e#weight",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  Background: "https://dnd5e.app/vocab/dnd5e#Background",
  startingProficiencies: {
    "@id": "https://dnd5e.app/vocab/dnd5e#startingProficiencies",
    "@type": "@id",
    "@container": "@set",
  },
  Proficiency: "https://dnd5e.app/vocab/dnd5e#Proficiency",
  classes: {
    "@id": "https://dnd5e.app/vocab/dnd5e#classes",
    "@type": "@id",
    "@container": "@set",
  },
  Class: "https://dnd5e.app/vocab/dnd5e#Class",
  hitDie: {
    "@id": "https://dnd5e.app/vocab/dnd5e#hitDie",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  levels: {
    "@id": "https://dnd5e.app/vocab/dnd5e#levels",
    "@type": "@id",
    "@container": "@set",
  },
  Level: "https://dnd5e.app/vocab/dnd5e#Level",
  level: {
    "@id": "https://dnd5e.app/vocab/dnd5e#level",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  abilityScoreBonuses: {
    "@id": "https://dnd5e.app/vocab/dnd5e#abilityScoreBonuses",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  proficiencyBonus: {
    "@id": "https://dnd5e.app/vocab/dnd5e#proficiencyBonus",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  features: {
    "@id": "https://dnd5e.app/vocab/dnd5e#features",
    "@type": "@id",
    "@container": "@set",
  },
  Feature: "https://dnd5e.app/vocab/dnd5e#Feature",
  class: {
    "@id": "https://dnd5e.app/vocab/dnd5e#class",
    "@type": "@id",
  },
  subclass: {
    "@id": "https://dnd5e.app/vocab/dnd5e#subclass",
    "@type": "@id",
  },
  Subclass: "https://dnd5e.app/vocab/dnd5e#Subclass",
  subclassFlavor: {
    "@id": "https://dnd5e.app/vocab/dnd5e#subclassFlavor",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  subclassSpells: {
    "@id": "https://dnd5e.app/vocab/dnd5e#subclassSpells",
    "@type": "@id",
    "@container": "@set",
  },
  levelPrerequisites: {
    "@id": "https://dnd5e.app/vocab/dnd5e#levelPrerequisites",
    "@type": "@id",
    "@container": "@set",
  },
  subclassFeaturePrerequisites: {
    "@id": "https://dnd5e.app/vocab/dnd5e#subclassFeaturePrerequisites",
    "@type": "@id",
    "@container": "@set",
  },
  spell: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spell",
    "@type": "@id",
  },
  Spell: "https://dnd5e.app/vocab/dnd5e#Spell",
  higherLevel: {
    "@id": "https://dnd5e.app/vocab/dnd5e#higherLevel",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  spellRange: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellRange",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  components: {
    "@id": "https://dnd5e.app/vocab/dnd5e#components",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
    "@container": "@set",
  },
  material: {
    "@id": "https://dnd5e.app/vocab/dnd5e#material",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  areaOfEffect: {
    "@id": "https://dnd5e.app/vocab/dnd5e#areaOfEffect",
    "@type": "@id",
  },
  ritual: {
    "@id": "https://dnd5e.app/vocab/dnd5e#ritual",
    "@type": "http://www.w3.org/2001/XMLSchema#boolean",
  },
  duration: {
    "@id": "https://dnd5e.app/vocab/dnd5e#duration",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  concentration: {
    "@id": "https://dnd5e.app/vocab/dnd5e#concentration",
    "@type": "http://www.w3.org/2001/XMLSchema#boolean",
  },
  castingTime: {
    "@id": "https://dnd5e.app/vocab/dnd5e#castingTime",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  attackType: {
    "@id": "https://dnd5e.app/vocab/dnd5e#attackType",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  spellDamage: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellDamage",
    "@type": "@id",
  },
  damageType: {
    "@id": "https://dnd5e.app/vocab/dnd5e#damageType",
    "@type": "@id",
  },
  DamageType: "https://dnd5e.app/vocab/dnd5e#DamageType",
  damageAtCharacterLevel: {
    "@id": "https://dnd5e.app/vocab/dnd5e#damageAtCharacterLevel",
    "@type": "@id",
    "@container": "@set",
  },
  damageDice: {
    "@id": "https://dnd5e.app/vocab/dnd5e#damageDice",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  damageAtSlotLevel: {
    "@id": "https://dnd5e.app/vocab/dnd5e#damageAtSlotLevel",
    "@type": "@id",
    "@container": "@set",
  },
  slot: {
    "@id": "https://dnd5e.app/vocab/dnd5e#slot",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  magicSchool: {
    "@id": "https://dnd5e.app/vocab/dnd5e#magicSchool",
    "@type": "@id",
  },
  MagicSchool: "https://dnd5e.app/vocab/dnd5e#MagicSchool",
  illustration: {
    "@id": "https://dnd5e.app/vocab/dnd5e#illustration",
    "@type": "@id",
  },
  Illustration: "https://dnd5e.app/vocab/dnd5e#Illustration",
  imageUrl: {
    "@id": "https://dnd5e.app/vocab/dnd5e#imageUrl",
    "@type": "@id",
  },
  creator: {
    "@id": "https://dnd5e.app/vocab/dnd5e#creator",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  creatorUrl: {
    "@id": "https://dnd5e.app/vocab/dnd5e#creatorUrl",
    "@type": "@id",
  },
  subclasses: {
    "@id": "https://dnd5e.app/vocab/dnd5e#subclasses",
    "@type": "@id",
    "@container": "@set",
  },
  parent: {
    "@id": "https://dnd5e.app/vocab/dnd5e#parent",
    "@type": "@id",
  },
  featurePrerequisites: {
    "@id": "https://dnd5e.app/vocab/dnd5e#featurePrerequisites",
    "@type": "@id",
    "@container": "@set",
  },
  feature: {
    "@id": "https://dnd5e.app/vocab/dnd5e#feature",
    "@type": "@id",
  },
  featureSpecific: {
    "@id": "https://dnd5e.app/vocab/dnd5e#featureSpecific",
    "@type": "@id",
  },
  expertiseChoice: {
    "@id": "https://dnd5e.app/vocab/dnd5e#expertiseChoice",
    "@type": "@id",
  },
  Choice: "https://dnd5e.app/vocab/dnd5e#Choice",
  choose: {
    "@id": "https://dnd5e.app/vocab/dnd5e#choose",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  from: {
    "@id": "https://dnd5e.app/vocab/dnd5e#from",
    "@type": "@id",
  },
  abilityScoreOptions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#abilityScoreOptions",
    "@type": "@id",
    "@container": "@set",
  },
  actionOptions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#actionOptions",
    "@type": "@id",
    "@container": "@set",
  },
  bonusOptions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#bonusOptions",
    "@type": "@id",
    "@container": "@set",
  },
  breathOptions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#breathOptions",
    "@type": "@id",
    "@container": "@set",
  },
  difficultyClass: {
    "@id": "https://dnd5e.app/vocab/dnd5e#difficultyClass",
    "@type": "@id",
  },
  dcType: {
    "@id": "https://dnd5e.app/vocab/dnd5e#dcType",
    "@type": "@id",
  },
  value: {
    "@id": "https://dnd5e.app/vocab/dnd5e#value",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  successType: {
    "@id": "https://dnd5e.app/vocab/dnd5e#successType",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  breathDamage: {
    "@id": "https://dnd5e.app/vocab/dnd5e#breathDamage",
    "@type": "@id",
    "@container": "@set",
  },
  dice: {
    "@id": "https://dnd5e.app/vocab/dnd5e#dice",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  choiceOptions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#choiceOptions",
    "@type": "@id",
    "@container": "@set",
  },
  choice: {
    "@id": "https://dnd5e.app/vocab/dnd5e#choice",
    "@type": "@id",
  },
  damageOptions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#damageOptions",
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
  EquipmentCategory: "https://dnd5e.app/vocab/dnd5e#EquipmentCategory",
  equipmentList: {
    "@id": "https://dnd5e.app/vocab/dnd5e#equipmentList",
    "@type": "@id",
    "@container": "@set",
  },
  Equipment: "https://dnd5e.app/vocab/dnd5e#Equipment",
  cost: {
    "@id": "https://dnd5e.app/vocab/dnd5e#cost",
    "@type": "@id",
  },
  quantity: {
    "@id": "https://dnd5e.app/vocab/dnd5e#quantity",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  unit: {
    "@id": "https://dnd5e.app/vocab/dnd5e#unit",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  weapon: {
    "@id": "https://dnd5e.app/vocab/dnd5e#weapon",
    "@type": "@id",
  },
  weaponCategory: {
    "@id": "https://dnd5e.app/vocab/dnd5e#weaponCategory",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  weaponRange: {
    "@id": "https://dnd5e.app/vocab/dnd5e#weaponRange",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  categoryRange: {
    "@id": "https://dnd5e.app/vocab/dnd5e#categoryRange",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  range: {
    "@id": "https://dnd5e.app/vocab/dnd5e#range",
    "@type": "@id",
  },
  normal: {
    "@id": "https://dnd5e.app/vocab/dnd5e#normal",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  long: {
    "@id": "https://dnd5e.app/vocab/dnd5e#long",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  damage: {
    "@id": "https://dnd5e.app/vocab/dnd5e#damage",
    "@type": "@id",
  },
  twoHandedDamage: {
    "@id": "https://dnd5e.app/vocab/dnd5e#twoHandedDamage",
    "@type": "@id",
  },
  properties: {
    "@id": "https://dnd5e.app/vocab/dnd5e#properties",
    "@type": "@id",
    "@container": "@set",
  },
  WeaponProperty: "https://dnd5e.app/vocab/dnd5e#WeaponProperty",
  armor: {
    "@id": "https://dnd5e.app/vocab/dnd5e#armor",
    "@type": "@id",
  },
  gear: {
    "@id": "https://dnd5e.app/vocab/dnd5e#gear",
    "@type": "@id",
  },
  gearCategory: {
    "@id": "https://dnd5e.app/vocab/dnd5e#gearCategory",
    "@type": "@id",
  },
  equipmentPack: {
    "@id": "https://dnd5e.app/vocab/dnd5e#equipmentPack",
    "@type": "@id",
  },
  contents: {
    "@id": "https://dnd5e.app/vocab/dnd5e#contents",
    "@type": "@id",
    "@container": "@set",
  },
  item: {
    "@id": "https://dnd5e.app/vocab/dnd5e#item",
    "@type": "@id",
  },
  magicItem: {
    "@id": "https://dnd5e.app/vocab/dnd5e#magicItem",
    "@type": "@id",
  },
  rarity: {
    "@id": "https://dnd5e.app/vocab/dnd5e#rarity",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  magicItemVariants: {
    "@id": "https://dnd5e.app/vocab/dnd5e#magicItemVariants",
    "@type": "@id",
    "@container": "@set",
  },
  magicItemVariant: {
    "@id": "https://dnd5e.app/vocab/dnd5e#magicItemVariant",
    "@type": "http://www.w3.org/2001/XMLSchema#boolean",
  },
  equipmentOptions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#equipmentOptions",
    "@type": "@id",
    "@container": "@set",
  },
  equipment: {
    "@id": "https://dnd5e.app/vocab/dnd5e#equipment",
    "@type": "@id",
  },
  idealOptions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#idealOptions",
    "@type": "@id",
    "@container": "@set",
  },
  alignments: {
    "@id": "https://dnd5e.app/vocab/dnd5e#alignments",
    "@type": "@id",
    "@container": "@set",
  },
  multipleOptions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#multipleOptions",
    "@type": "@id",
    "@container": "@set",
  },
  referenceOptions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#referenceOptions",
    "@type": "@id",
    "@container": "@set",
  },
  language: {
    "@id": "https://dnd5e.app/vocab/dnd5e#language",
    "@type": "@id",
  },
  Language: "https://dnd5e.app/vocab/dnd5e#Language",
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
  stringOptions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#stringOptions",
    "@type": "@id",
    "@container": "@set",
  },
  string: {
    "@id": "https://dnd5e.app/vocab/dnd5e#string",
    "@type": "http://www.w3.org/2001/XMLSchema#strsing",
  },
  invocations: {
    "@id": "https://dnd5e.app/vocab/dnd5e#invocations",
    "@type": "@id",
    "@container": "@set",
  },
  subfeatureChoice: {
    "@id": "https://dnd5e.app/vocab/dnd5e#subfeatureChoice",
    "@type": "@id",
  },
  levelSpellcasting: {
    "@id": "https://dnd5e.app/vocab/dnd5e#levelSpellcasting",
    "@type": "@id",
  },
  cantripsKnown: {
    "@id": "https://dnd5e.app/vocab/dnd5e#cantripsKnown",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  spellsKnown: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellsKnown",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  spellSlotsLevel1: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellSlotsLevel1",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  spellSlotsLevel2: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellSlotsLevel2",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  spellSlotsLevel3: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellSlotsLevel3",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  spellSlotsLevel4: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellSlotsLevel4",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  spellSlotsLevel5: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellSlotsLevel5",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  spellSlotsLevel6: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellSlotsLevel6",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  spellSlotsLevel7: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellSlotsLevel7",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  spellSlotsLevel8: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellSlotsLevel8",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  spellSlotsLevel9: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellSlotsLevel9",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  classSpecific: {
    "@id": "https://dnd5e.app/vocab/dnd5e#classSpecific",
    "@type": "@id",
  },
  rageCount: {
    "@id": "https://dnd5e.app/vocab/dnd5e#rageCount",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  rageDamageBonus: {
    "@id": "https://dnd5e.app/vocab/dnd5e#rageDamageBonus",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  brutalCriticalDice: {
    "@id": "https://dnd5e.app/vocab/dnd5e#brutalCriticalDice",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  bardicInspirationDice: {
    "@id": "https://dnd5e.app/vocab/dnd5e#bardicInspirationDice",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  songOfRestDie: {
    "@id": "https://dnd5e.app/vocab/dnd5e#songOfRestDie",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  magicalSecretsMax5: {
    "@id": "https://dnd5e.app/vocab/dnd5e#magicalSecretsMax5",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  magicalSecretsMax7: {
    "@id": "https://dnd5e.app/vocab/dnd5e#magicalSecretsMax7",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  magicalSecretsMax9: {
    "@id": "https://dnd5e.app/vocab/dnd5e#magicalSecretsMax9",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  channelDivinityChargers: {
    "@id": "https://dnd5e.app/vocab/dnd5e#channelDivinityChargers",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  destroyUndeadCr: {
    "@id": "https://dnd5e.app/vocab/dnd5e#destroyUndeadCr",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  wildShapeMaxCr: {
    "@id": "https://dnd5e.app/vocab/dnd5e#wildShapeMaxCr",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
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
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  indomitableUses: {
    "@id": "https://dnd5e.app/vocab/dnd5e#indomitableUses",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  extraAttacks: {
    "@id": "https://dnd5e.app/vocab/dnd5e#extraAttacks",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  kiPoints: {
    "@id": "https://dnd5e.app/vocab/dnd5e#kiPoints",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  unarmoredMovement: {
    "@id": "https://dnd5e.app/vocab/dnd5e#unarmoredMovement",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  martialArts: {
    "@id": "https://dnd5e.app/vocab/dnd5e#martialArts",
    "@type": "@id",
  },
  diceCount: {
    "@id": "https://dnd5e.app/vocab/dnd5e#diceCount",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  diceValue: {
    "@id": "https://dnd5e.app/vocab/dnd5e#diceValue",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  auraRange: {
    "@id": "https://dnd5e.app/vocab/dnd5e#auraRange",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  favoredEnemies: {
    "@id": "https://dnd5e.app/vocab/dnd5e#favoredEnemies",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  favoredTerrain: {
    "@id": "https://dnd5e.app/vocab/dnd5e#favoredTerrain",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  sneakAttack: {
    "@id": "https://dnd5e.app/vocab/dnd5e#sneakAttack",
    "@type": "@id",
  },
  sorceryPoints: {
    "@id": "https://dnd5e.app/vocab/dnd5e#sorceryPoints",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  metamagicKnown: {
    "@id": "https://dnd5e.app/vocab/dnd5e#metamagicKnown",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  creatingSpellSlots: {
    "@id": "https://dnd5e.app/vocab/dnd5e#creatingSpellSlots",
    "@type": "@id",
    "@container": "@set",
  },
  spellSlotLevel: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellSlotLevel",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  sorceryPointCost: {
    "@id": "https://dnd5e.app/vocab/dnd5e#sorceryPointCost",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  invocationsKnown: {
    "@id": "https://dnd5e.app/vocab/dnd5e#invocationsKnown",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  mysticArcanumLevel6: {
    "@id": "https://dnd5e.app/vocab/dnd5e#mysticArcanumLevel6",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  mysticArcanumLevel7: {
    "@id": "https://dnd5e.app/vocab/dnd5e#mysticArcanumLevel7",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  mysticArcanumLevel8: {
    "@id": "https://dnd5e.app/vocab/dnd5e#mysticArcanumLevel8",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  mysticArcanumLevel9: {
    "@id": "https://dnd5e.app/vocab/dnd5e#mysticArcanumLevel9",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  arcaneRecoverLevels: {
    "@id": "https://dnd5e.app/vocab/dnd5e#arcaneRecoverLevels",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  subclassSpecific: {
    "@id": "https://dnd5e.app/vocab/dnd5e#subclassSpecific",
    "@type": "@id",
  },
  additionalMagicalSecretsMaxLvl: {
    "@id": "https://dnd5e.app/vocab/dnd5e#additionalMagicalSecretsMaxLvl",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  multiclassing: {
    "@id": "https://dnd5e.app/vocab/dnd5e#multiclassing",
    "@type": "@id",
  },
  prerequisites: {
    "@id": "https://dnd5e.app/vocab/dnd5e#prerequisites",
    "@type": "@id",
    "@container": "@set",
  },
  prerequisiteChoice: {
    "@id": "https://dnd5e.app/vocab/dnd5e#prerequisiteChoice",
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
  startingEquipmentChoices: {
    "@id": "https://dnd5e.app/vocab/dnd5e#startingEquipmentChoices",
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
  Race: "https://dnd5e.app/vocab/dnd5e#Race",
  speed: {
    "@id": "https://dnd5e.app/vocab/dnd5e#speed",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  abilityBonuses: {
    "@id": "https://dnd5e.app/vocab/dnd5e#abilityBonuses",
    "@type": "@id",
    "@container": "@set",
  },
  alignmentDescription: {
    "@id": "https://dnd5e.app/vocab/dnd5e#alignmentDescription",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  age: {
    "@id": "https://dnd5e.app/vocab/dnd5e#age",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  size: {
    "@id": "https://dnd5e.app/vocab/dnd5e#size",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  sizeDescription: {
    "@id": "https://dnd5e.app/vocab/dnd5e#sizeDescription",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  startingProficiencyChoice: {
    "@id": "https://dnd5e.app/vocab/dnd5e#startingProficiencyChoice",
    "@type": "@id",
  },
  languages: {
    "@id": "https://dnd5e.app/vocab/dnd5e#languages",
    "@type": "@id",
    "@container": "@set",
  },
  languageDescription: {
    "@id": "https://dnd5e.app/vocab/dnd5e#languageDescription",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  traits: {
    "@id": "https://dnd5e.app/vocab/dnd5e#traits",
    "@type": "@id",
    "@container": "@set",
  },
  Trait: "https://dnd5e.app/vocab/dnd5e#Trait",
  subraces: {
    "@id": "https://dnd5e.app/vocab/dnd5e#subraces",
    "@type": "@id",
    "@container": "@set",
  },
  Subrace: "https://dnd5e.app/vocab/dnd5e#Subrace",
  race: {
    "@id": "https://dnd5e.app/vocab/dnd5e#race",
    "@type": "@id",
  },
  languageChoice: {
    "@id": "https://dnd5e.app/vocab/dnd5e#languageChoice",
    "@type": "@id",
  },
  traitSpecific: {
    "@id": "https://dnd5e.app/vocab/dnd5e#traitSpecific",
    "@type": "@id",
  },
  spellChoice: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellChoice",
    "@type": "@id",
  },
  subtraitChoice: {
    "@id": "https://dnd5e.app/vocab/dnd5e#subtraitChoice",
    "@type": "@id",
  },
  breathWeapon: {
    "@id": "https://dnd5e.app/vocab/dnd5e#breathWeapon",
    "@type": "@id",
  },
  breathWeaponDamage: {
    "@id": "https://dnd5e.app/vocab/dnd5e#breathWeaponDamage",
    "@type": "@id",
  },
  traitSpecificUsage: {
    "@id": "https://dnd5e.app/vocab/dnd5e#traitSpecificUsage",
    "@type": "@id",
  },
  times: {
    "@id": "https://dnd5e.app/vocab/dnd5e#times",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  reference: {
    "@id": "https://dnd5e.app/vocab/dnd5e#reference",
    "@type": "@id",
  },
  savingThrow: {
    "@id": "https://dnd5e.app/vocab/dnd5e#savingThrow",
    "@type": "@id",
  },
  skill: {
    "@id": "https://dnd5e.app/vocab/dnd5e#skill",
    "@type": "@id",
  },
  backgroundFeature: {
    "@id": "https://dnd5e.app/vocab/dnd5e#backgroundFeature",
    "@type": "@id",
  },
  personalityTraits: {
    "@id": "https://dnd5e.app/vocab/dnd5e#personalityTraits",
    "@type": "@id",
  },
  ideals: {
    "@id": "https://dnd5e.app/vocab/dnd5e#ideals",
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
  Character: "https://dnd5e.app/vocab/dnd5e#Character",
  Condition: "https://dnd5e.app/vocab/dnd5e#Condition",
  Monster: "https://dnd5e.app/vocab/dnd5e#Monster",
  monsterAbilities: {
    "@id": "https://dnd5e.app/vocab/dnd5e#monsterAbilities",
    "@type": "@id",
    "@container": "@set",
  },
  subtype: {
    "@id": "https://dnd5e.app/vocab/dnd5e#subtype",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  monsterArmorClass: {
    "@id": "https://dnd5e.app/vocab/dnd5e#monsterArmorClass",
    "@type": "@id",
    "@container": "@set",
  },
  armorList: {
    "@id": "https://dnd5e.app/vocab/dnd5e#armorList",
    "@type": "@id",
    "@container": "@set",
  },
  condition: {
    "@id": "https://dnd5e.app/vocab/dnd5e#condition",
    "@type": "@id",
  },
  hitPoints: {
    "@id": "https://dnd5e.app/vocab/dnd5e#hitPoints",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  hitDice: {
    "@id": "https://dnd5e.app/vocab/dnd5e#hitDice",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  hitPointsRoll: {
    "@id": "https://dnd5e.app/vocab/dnd5e#hitPointsRoll",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  monsterActions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#monsterActions",
    "@type": "@id",
    "@container": "@set",
  },
  actionChoice: {
    "@id": "https://dnd5e.app/vocab/dnd5e#actionChoice",
    "@type": "@id",
  },
  monsterMultiAttackActions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#monsterMultiAttackActions",
    "@type": "@id",
    "@container": "@set",
  },
  monsterActionChoice: {
    "@id": "https://dnd5e.app/vocab/dnd5e#monsterActionChoice",
    "@type": "@id",
  },
  multiattackType: {
    "@id": "https://dnd5e.app/vocab/dnd5e#multiattackType",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  attackBonus: {
    "@id": "https://dnd5e.app/vocab/dnd5e#attackBonus",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  monsterAttacks: {
    "@id": "https://dnd5e.app/vocab/dnd5e#monsterAttacks",
    "@type": "@id",
    "@container": "@set",
  },
  damages: {
    "@id": "https://dnd5e.app/vocab/dnd5e#damages",
    "@type": "@id",
    "@container": "@set",
  },
  legendaryActions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#legendaryActions",
    "@type": "@id",
    "@container": "@set",
  },
  challengeRating: {
    "@id": "https://dnd5e.app/vocab/dnd5e#challengeRating",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  conditionImmunities: {
    "@id": "https://dnd5e.app/vocab/dnd5e#conditionImmunities",
    "@type": "@id",
    "@container": "@set",
  },
  damageImmunities: {
    "@id": "https://dnd5e.app/vocab/dnd5e#damageImmunities",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
    "@container": "@set",
  },
  damageResistances: {
    "@id": "https://dnd5e.app/vocab/dnd5e#damageResistances",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
    "@container": "@set",
  },
  damageVulnerabilities: {
    "@id": "https://dnd5e.app/vocab/dnd5e#damageVulnerabilities",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
    "@container": "@set",
  },
  forms: {
    "@id": "https://dnd5e.app/vocab/dnd5e#forms",
    "@type": "@id",
    "@container": "@set",
  },
  monsterLanguages: {
    "@id": "https://dnd5e.app/vocab/dnd5e#monsterLanguages",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  monsterSavingThrows: {
    "@id": "https://dnd5e.app/vocab/dnd5e#monsterSavingThrows",
    "@type": "@id",
    "@container": "@set",
  },
  monsterSkills: {
    "@id": "https://dnd5e.app/vocab/dnd5e#monsterSkills",
    "@type": "@id",
    "@container": "@set",
  },
  reactions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#reactions",
    "@type": "@id",
    "@container": "@set",
  },
  senses: {
    "@id": "https://dnd5e.app/vocab/dnd5e#senses",
    "@type": "@id",
  },
  passivePerception: {
    "@id": "https://dnd5e.app/vocab/dnd5e#passivePerception",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  blindsight: {
    "@id": "https://dnd5e.app/vocab/dnd5e#blindsight",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  darkvision: {
    "@id": "https://dnd5e.app/vocab/dnd5e#darkvision",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  tremorsense: {
    "@id": "https://dnd5e.app/vocab/dnd5e#tremorsense",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  truesight: {
    "@id": "https://dnd5e.app/vocab/dnd5e#truesight",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  specialAbilities: {
    "@id": "https://dnd5e.app/vocab/dnd5e#specialAbilities",
    "@type": "@id",
    "@container": "@set",
  },
  monsterSpellcasting: {
    "@id": "https://dnd5e.app/vocab/dnd5e#monsterSpellcasting",
    "@type": "@id",
  },
  dcValue: {
    "@id": "https://dnd5e.app/vocab/dnd5e#dcValue",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  modifier: {
    "@id": "https://dnd5e.app/vocab/dnd5e#modifier",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  componentsRequired: {
    "@id": "https://dnd5e.app/vocab/dnd5e#componentsRequired",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
    "@container": "@set",
  },
  spellcastingSchool: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellcastingSchool",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  spellcastingSlots: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellcastingSlots",
    "@type": "@id",
    "@container": "@set",
  },
  slots: {
    "@id": "https://dnd5e.app/vocab/dnd5e#slots",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  monsterSpells: {
    "@id": "https://dnd5e.app/vocab/dnd5e#monsterSpells",
    "@type": "@id",
    "@container": "@set",
  },
  monsterSpellUsage: {
    "@id": "https://dnd5e.app/vocab/dnd5e#monsterSpellUsage",
    "@type": "@id",
  },
  restTypes: {
    "@id": "https://dnd5e.app/vocab/dnd5e#restTypes",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
    "@container": "@set",
  },
  monsterUsage: {
    "@id": "https://dnd5e.app/vocab/dnd5e#monsterUsage",
    "@type": "@id",
  },
  monsterSpeed: {
    "@id": "https://dnd5e.app/vocab/dnd5e#monsterSpeed",
    "@type": "@id",
  },
  walk: {
    "@id": "https://dnd5e.app/vocab/dnd5e#walk",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  burrow: {
    "@id": "https://dnd5e.app/vocab/dnd5e#burrow",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  climb: {
    "@id": "https://dnd5e.app/vocab/dnd5e#climb",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  fly: {
    "@id": "https://dnd5e.app/vocab/dnd5e#fly",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  swim: {
    "@id": "https://dnd5e.app/vocab/dnd5e#swim",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  xp: {
    "@id": "https://dnd5e.app/vocab/dnd5e#xp",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  Rule: "https://dnd5e.app/vocab/dnd5e#Rule",
  ruleSections: {
    "@id": "https://dnd5e.app/vocab/dnd5e#ruleSections",
    "@type": "@id",
    "@container": "@set",
  },
  RuleSection: "https://dnd5e.app/vocab/dnd5e#RuleSection",
  name: {
    "@id": "http://xmlns.com/foaf/0.1/name",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  preferencesFile: {
    "@id": "http://www.w3.org/ns/pim/space#preferencesFile",
    "@type": "@id",
  },
  storage: {
    "@id": "http://www.w3.org/ns/pim/space#storage",
    "@type": "@id",
  },
  defaultStorage: {
    "@id": "https://dnd5e.app/vocab/dnd5e#defaultStorage",
    "@type": "@id",
  },
  Storage: "https://dnd5e.app/vocab/dnd5e#Storage",
  container: {
    "@id": "https://dnd5e.app/vocab/dnd5e#container",
    "@type": "@id",
  },
  storages: {
    "@id": "https://dnd5e.app/vocab/dnd5e#storages",
    "@type": "@id",
    "@container": "@set",
  },
  defaultCharacter: {
    "@id": "https://dnd5e.app/vocab/dnd5e#defaultCharacter",
    "@type": "@id",
  },
};
