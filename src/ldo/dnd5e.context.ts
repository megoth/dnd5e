import { LdoJsonldContext } from "@ldo/jsonld-dataset-proxy";

/**
 * =============================================================================
 * dnd5eContext: JSONLD Context for dnd5e
 * =============================================================================
 */
export const dnd5eContext: LdoJsonldContext = {
  bonus: {
    "@id": "https://dnd5e.app/vocab/dnd5e#bonus",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  abilityScore: {
    "@id": "https://dnd5e.app/vocab/dnd5e#abilityScore",
    "@type": "@id",
  },
  AbilityScore: {
    "@id": "https://dnd5e.app/vocab/dnd5e#AbilityScore",
    "@context": {
      type: {
        "@id": "@type",
      },
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
        "@isCollection": true,
      },
    },
  },
  Skill: {
    "@id": "https://dnd5e.app/vocab/dnd5e#Skill",
    "@context": {
      type: {
        "@id": "@type",
      },
      label: {
        "@id": "http://www.w3.org/2000/01/rdf-schema#label",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      description: {
        "@id": "http://purl.org/dc/terms/description",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      abilityScore: {
        "@id": "https://dnd5e.app/vocab/dnd5e#abilityScore",
        "@type": "@id",
      },
    },
  },
  minimumScore: {
    "@id": "https://dnd5e.app/vocab/dnd5e#minimumScore",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  label: {
    "@id": "http://www.w3.org/2000/01/rdf-schema#label",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  count: {
    "@id": "https://dnd5e.app/vocab/dnd5e#count",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  actionType: {
    "@id": "https://dnd5e.app/vocab/dnd5e#actionType",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  Alignment: {
    "@id": "https://dnd5e.app/vocab/dnd5e#Alignment",
    "@context": {
      type: {
        "@id": "@type",
      },
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
    },
  },
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
  Background: {
    "@id": "https://dnd5e.app/vocab/dnd5e#Background",
    "@context": {
      type: {
        "@id": "@type",
      },
      label: {
        "@id": "http://www.w3.org/2000/01/rdf-schema#label",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      startingProficiencies: {
        "@id": "https://dnd5e.app/vocab/dnd5e#startingProficiencies",
        "@type": "@id",
        "@isCollection": true,
      },
      startingEquipment: {
        "@id": "https://dnd5e.app/vocab/dnd5e#startingEquipment",
        "@type": "@id",
        "@isCollection": true,
      },
      startingEquipmentChoices: {
        "@id": "https://dnd5e.app/vocab/dnd5e#startingEquipmentChoices",
        "@type": "@id",
        "@isCollection": true,
      },
      languageChoice: {
        "@id": "https://dnd5e.app/vocab/dnd5e#languageChoice",
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
      illustration: {
        "@id": "https://dnd5e.app/vocab/dnd5e#illustration",
        "@type": "@id",
      },
    },
  },
  Proficiency: {
    "@id": "https://dnd5e.app/vocab/dnd5e#Proficiency",
    "@context": {
      type: {
        "@id": "@type",
      },
      ofType: {
        "@id": "https://dnd5e.app/vocab/dnd5e#ofType",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      label: {
        "@id": "http://www.w3.org/2000/01/rdf-schema#label",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      classes: {
        "@id": "https://dnd5e.app/vocab/dnd5e#classes",
        "@type": "@id",
        "@isCollection": true,
      },
      races: {
        "@id": "https://dnd5e.app/vocab/dnd5e#races",
        "@type": "@id",
        "@isCollection": true,
      },
      reference: {
        "@id": "https://dnd5e.app/vocab/dnd5e#reference",
        "@type": "@id",
      },
      equipment: {
        "@id": "https://dnd5e.app/vocab/dnd5e#equipment",
        "@type": "@id",
      },
      equipmentCategory: {
        "@id": "https://dnd5e.app/vocab/dnd5e#equipmentCategory",
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
    },
  },
  Class: {
    "@id": "https://dnd5e.app/vocab/dnd5e#Class",
    "@context": {
      type: {
        "@id": "@type",
      },
      label: {
        "@id": "http://www.w3.org/2000/01/rdf-schema#label",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      description: {
        "@id": "http://purl.org/dc/terms/description",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      hitDie: {
        "@id": "https://dnd5e.app/vocab/dnd5e#hitDie",
        "@type": "http://www.w3.org/2001/XMLSchema#integer",
      },
      levels: {
        "@id": "https://dnd5e.app/vocab/dnd5e#levels",
        "@type": "@id",
        "@isCollection": true,
      },
      multiclassing: {
        "@id": "https://dnd5e.app/vocab/dnd5e#multiclassing",
        "@type": "@id",
      },
      proficiencies: {
        "@id": "https://dnd5e.app/vocab/dnd5e#proficiencies",
        "@type": "@id",
        "@isCollection": true,
      },
      proficiencyChoices: {
        "@id": "https://dnd5e.app/vocab/dnd5e#proficiencyChoices",
        "@type": "@id",
        "@isCollection": true,
      },
      savingThrows: {
        "@id": "https://dnd5e.app/vocab/dnd5e#savingThrows",
        "@type": "@id",
        "@isCollection": true,
      },
      startingEquipment: {
        "@id": "https://dnd5e.app/vocab/dnd5e#startingEquipment",
        "@type": "@id",
        "@isCollection": true,
      },
      startingEquipmentChoices: {
        "@id": "https://dnd5e.app/vocab/dnd5e#startingEquipmentChoices",
        "@type": "@id",
        "@isCollection": true,
      },
      classSpellcasting: {
        "@id": "https://dnd5e.app/vocab/dnd5e#classSpellcasting",
        "@type": "@id",
      },
      spells: {
        "@id": "https://dnd5e.app/vocab/dnd5e#spells",
        "@type": "@id",
        "@isCollection": true,
      },
      subclasses: {
        "@id": "https://dnd5e.app/vocab/dnd5e#subclasses",
        "@type": "@id",
        "@isCollection": true,
      },
      illustration: {
        "@id": "https://dnd5e.app/vocab/dnd5e#illustration",
        "@type": "@id",
      },
    },
  },
  Level: {
    "@id": "https://dnd5e.app/vocab/dnd5e#Level",
    "@context": {
      type: {
        "@id": "@type",
      },
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
        "@isCollection": true,
      },
      levelSpellcasting: {
        "@id": "https://dnd5e.app/vocab/dnd5e#levelSpellcasting",
        "@type": "@id",
      },
      classSpecific: {
        "@id": "https://dnd5e.app/vocab/dnd5e#classSpecific",
        "@type": "@id",
      },
      subclassSpecific: {
        "@id": "https://dnd5e.app/vocab/dnd5e#subclassSpecific",
        "@type": "@id",
      },
    },
  },
  Feature: {
    "@id": "https://dnd5e.app/vocab/dnd5e#Feature",
    "@context": {
      type: {
        "@id": "@type",
      },
      label: {
        "@id": "http://www.w3.org/2000/01/rdf-schema#label",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      description: {
        "@id": "http://purl.org/dc/terms/description",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      level: {
        "@id": "https://dnd5e.app/vocab/dnd5e#level",
        "@type": "http://www.w3.org/2001/XMLSchema#integer",
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
      featurePrerequisites: {
        "@id": "https://dnd5e.app/vocab/dnd5e#featurePrerequisites",
        "@type": "@id",
        "@isCollection": true,
      },
      featureSpecific: {
        "@id": "https://dnd5e.app/vocab/dnd5e#featureSpecific",
        "@type": "@id",
      },
    },
  },
  Subclass: {
    "@id": "https://dnd5e.app/vocab/dnd5e#Subclass",
    "@context": {
      type: {
        "@id": "@type",
      },
      label: {
        "@id": "http://www.w3.org/2000/01/rdf-schema#label",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      description: {
        "@id": "http://purl.org/dc/terms/description",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      class: {
        "@id": "https://dnd5e.app/vocab/dnd5e#class",
        "@type": "@id",
      },
      subclassFlavor: {
        "@id": "https://dnd5e.app/vocab/dnd5e#subclassFlavor",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      levels: {
        "@id": "https://dnd5e.app/vocab/dnd5e#levels",
        "@type": "@id",
        "@isCollection": true,
      },
      subclassSpells: {
        "@id": "https://dnd5e.app/vocab/dnd5e#subclassSpells",
        "@type": "@id",
        "@isCollection": true,
      },
      illustration: {
        "@id": "https://dnd5e.app/vocab/dnd5e#illustration",
        "@type": "@id",
      },
    },
  },
  levelPrerequisites: {
    "@id": "https://dnd5e.app/vocab/dnd5e#levelPrerequisites",
    "@type": "@id",
    "@isCollection": true,
  },
  subclassFeaturePrerequisites: {
    "@id": "https://dnd5e.app/vocab/dnd5e#subclassFeaturePrerequisites",
    "@type": "@id",
    "@isCollection": true,
  },
  spell: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spell",
    "@type": "@id",
  },
  Spell: {
    "@id": "https://dnd5e.app/vocab/dnd5e#Spell",
    "@context": {
      type: {
        "@id": "@type",
      },
      label: {
        "@id": "http://www.w3.org/2000/01/rdf-schema#label",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      description: {
        "@id": "http://purl.org/dc/terms/description",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
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
        "@isCollection": true,
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
      level: {
        "@id": "https://dnd5e.app/vocab/dnd5e#level",
        "@type": "http://www.w3.org/2001/XMLSchema#integer",
      },
      attackType: {
        "@id": "https://dnd5e.app/vocab/dnd5e#attackType",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      spellDamage: {
        "@id": "https://dnd5e.app/vocab/dnd5e#spellDamage",
        "@type": "@id",
      },
      magicSchool: {
        "@id": "https://dnd5e.app/vocab/dnd5e#magicSchool",
        "@type": "@id",
      },
      classes: {
        "@id": "https://dnd5e.app/vocab/dnd5e#classes",
        "@type": "@id",
        "@isCollection": true,
      },
      subclasses: {
        "@id": "https://dnd5e.app/vocab/dnd5e#subclasses",
        "@type": "@id",
        "@isCollection": true,
      },
      illustration: {
        "@id": "https://dnd5e.app/vocab/dnd5e#illustration",
        "@type": "@id",
      },
    },
  },
  damageType: {
    "@id": "https://dnd5e.app/vocab/dnd5e#damageType",
    "@type": "@id",
  },
  DamageType: {
    "@id": "https://dnd5e.app/vocab/dnd5e#DamageType",
    "@context": {
      type: {
        "@id": "@type",
      },
      label: {
        "@id": "http://www.w3.org/2000/01/rdf-schema#label",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      description: {
        "@id": "http://purl.org/dc/terms/description",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
    },
  },
  damageAtCharacterLevel: {
    "@id": "https://dnd5e.app/vocab/dnd5e#damageAtCharacterLevel",
    "@type": "@id",
    "@isCollection": true,
  },
  level: {
    "@id": "https://dnd5e.app/vocab/dnd5e#level",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  damageDice: {
    "@id": "https://dnd5e.app/vocab/dnd5e#damageDice",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  damageAtSlotLevel: {
    "@id": "https://dnd5e.app/vocab/dnd5e#damageAtSlotLevel",
    "@type": "@id",
    "@isCollection": true,
  },
  slot: {
    "@id": "https://dnd5e.app/vocab/dnd5e#slot",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  MagicSchool: {
    "@id": "https://dnd5e.app/vocab/dnd5e#MagicSchool",
    "@context": {
      type: {
        "@id": "@type",
      },
      label: {
        "@id": "http://www.w3.org/2000/01/rdf-schema#label",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      description: {
        "@id": "http://purl.org/dc/terms/description",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      illustration: {
        "@id": "https://dnd5e.app/vocab/dnd5e#illustration",
        "@type": "@id",
      },
    },
  },
  Illustration: {
    "@id": "https://dnd5e.app/vocab/dnd5e#Illustration",
    "@context": {
      type: {
        "@id": "@type",
      },
      imageUrl: {
        "@id": "https://dnd5e.app/vocab/dnd5e#imageUrl",
        "@type": "@id",
      },
      description: {
        "@id": "http://purl.org/dc/terms/description",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      creator: {
        "@id": "https://dnd5e.app/vocab/dnd5e#creator",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      creatorUrl: {
        "@id": "https://dnd5e.app/vocab/dnd5e#creatorUrl",
        "@type": "@id",
      },
    },
  },
  feature: {
    "@id": "https://dnd5e.app/vocab/dnd5e#feature",
    "@type": "@id",
  },
  expertiseChoice: {
    "@id": "https://dnd5e.app/vocab/dnd5e#expertiseChoice",
    "@type": "@id",
  },
  Choice: {
    "@id": "https://dnd5e.app/vocab/dnd5e#Choice",
    "@context": {
      type: {
        "@id": "@type",
      },
      description: {
        "@id": "http://purl.org/dc/terms/description",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      choose: {
        "@id": "https://dnd5e.app/vocab/dnd5e#choose",
        "@type": "http://www.w3.org/2001/XMLSchema#integer",
      },
      ofType: {
        "@id": "https://dnd5e.app/vocab/dnd5e#ofType",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      from: {
        "@id": "https://dnd5e.app/vocab/dnd5e#from",
        "@type": "@id",
      },
    },
  },
  abilityScoreOptions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#abilityScoreOptions",
    "@type": "@id",
    "@isCollection": true,
  },
  actionOptions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#actionOptions",
    "@type": "@id",
    "@isCollection": true,
  },
  bonusOptions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#bonusOptions",
    "@type": "@id",
    "@isCollection": true,
  },
  breathOptions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#breathOptions",
    "@type": "@id",
    "@isCollection": true,
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
    "@isCollection": true,
  },
  dice: {
    "@id": "https://dnd5e.app/vocab/dnd5e#dice",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  choiceOptions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#choiceOptions",
    "@type": "@id",
    "@isCollection": true,
  },
  choice: {
    "@id": "https://dnd5e.app/vocab/dnd5e#choice",
    "@type": "@id",
  },
  damageOptions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#damageOptions",
    "@type": "@id",
    "@isCollection": true,
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
  EquipmentCategory: {
    "@id": "https://dnd5e.app/vocab/dnd5e#EquipmentCategory",
    "@context": {
      type: {
        "@id": "@type",
      },
      label: {
        "@id": "http://www.w3.org/2000/01/rdf-schema#label",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      equipmentList: {
        "@id": "https://dnd5e.app/vocab/dnd5e#equipmentList",
        "@type": "@id",
        "@isCollection": true,
      },
    },
  },
  Equipment: {
    "@id": "https://dnd5e.app/vocab/dnd5e#Equipment",
    "@context": {
      type: {
        "@id": "@type",
      },
      label: {
        "@id": "http://www.w3.org/2000/01/rdf-schema#label",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      description: {
        "@id": "http://purl.org/dc/terms/description",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      equipmentCategory: {
        "@id": "https://dnd5e.app/vocab/dnd5e#equipmentCategory",
        "@type": "@id",
      },
      cost: {
        "@id": "https://dnd5e.app/vocab/dnd5e#cost",
        "@type": "@id",
      },
      weapon: {
        "@id": "https://dnd5e.app/vocab/dnd5e#weapon",
        "@type": "@id",
      },
      armor: {
        "@id": "https://dnd5e.app/vocab/dnd5e#armor",
        "@type": "@id",
      },
      gear: {
        "@id": "https://dnd5e.app/vocab/dnd5e#gear",
        "@type": "@id",
      },
      equipmentPack: {
        "@id": "https://dnd5e.app/vocab/dnd5e#equipmentPack",
        "@type": "@id",
      },
      magicItem: {
        "@id": "https://dnd5e.app/vocab/dnd5e#magicItem",
        "@type": "@id",
      },
    },
  },
  quantity: {
    "@id": "https://dnd5e.app/vocab/dnd5e#quantity",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  unit: {
    "@id": "https://dnd5e.app/vocab/dnd5e#unit",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
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
    "@isCollection": true,
  },
  WeaponProperty: {
    "@id": "https://dnd5e.app/vocab/dnd5e#WeaponProperty",
    "@context": {
      type: {
        "@id": "@type",
      },
      label: {
        "@id": "http://www.w3.org/2000/01/rdf-schema#label",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      description: {
        "@id": "http://purl.org/dc/terms/description",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
    },
  },
  gearCategory: {
    "@id": "https://dnd5e.app/vocab/dnd5e#gearCategory",
    "@type": "@id",
  },
  contents: {
    "@id": "https://dnd5e.app/vocab/dnd5e#contents",
    "@type": "@id",
    "@isCollection": true,
  },
  item: {
    "@id": "https://dnd5e.app/vocab/dnd5e#item",
    "@type": "@id",
  },
  rarity: {
    "@id": "https://dnd5e.app/vocab/dnd5e#rarity",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  magicItemVariants: {
    "@id": "https://dnd5e.app/vocab/dnd5e#magicItemVariants",
    "@type": "@id",
    "@isCollection": true,
  },
  magicItemVariant: {
    "@id": "https://dnd5e.app/vocab/dnd5e#magicItemVariant",
    "@type": "http://www.w3.org/2001/XMLSchema#boolean",
  },
  equipmentOptions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#equipmentOptions",
    "@type": "@id",
    "@isCollection": true,
  },
  equipment: {
    "@id": "https://dnd5e.app/vocab/dnd5e#equipment",
    "@type": "@id",
  },
  idealOptions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#idealOptions",
    "@type": "@id",
    "@isCollection": true,
  },
  description: {
    "@id": "http://purl.org/dc/terms/description",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  alignments: {
    "@id": "https://dnd5e.app/vocab/dnd5e#alignments",
    "@type": "@id",
    "@isCollection": true,
  },
  multipleOptions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#multipleOptions",
    "@type": "@id",
    "@isCollection": true,
  },
  referenceOptions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#referenceOptions",
    "@type": "@id",
    "@isCollection": true,
  },
  language: {
    "@id": "https://dnd5e.app/vocab/dnd5e#language",
    "@type": "@id",
  },
  Language: {
    "@id": "https://dnd5e.app/vocab/dnd5e#Language",
    "@context": {
      type: {
        "@id": "@type",
      },
      label: {
        "@id": "http://www.w3.org/2000/01/rdf-schema#label",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      languageType: {
        "@id": "https://dnd5e.app/vocab/dnd5e#languageType",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      script: {
        "@id": "https://dnd5e.app/vocab/dnd5e#script",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      description: {
        "@id": "http://purl.org/dc/terms/description",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      typicalSpeakers: {
        "@id": "https://dnd5e.app/vocab/dnd5e#typicalSpeakers",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
        "@isCollection": true,
      },
    },
  },
  proficiency: {
    "@id": "https://dnd5e.app/vocab/dnd5e#proficiency",
    "@type": "@id",
  },
  stringOptions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#stringOptions",
    "@type": "@id",
    "@isCollection": true,
  },
  string: {
    "@id": "https://dnd5e.app/vocab/dnd5e#string",
    "@type": "http://www.w3.org/2001/XMLSchema#strsing",
  },
  invocations: {
    "@id": "https://dnd5e.app/vocab/dnd5e#invocations",
    "@type": "@id",
    "@isCollection": true,
  },
  subfeatureChoice: {
    "@id": "https://dnd5e.app/vocab/dnd5e#subfeatureChoice",
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
    "@isCollection": true,
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
  additionalMagicalSecretsMaxLvl: {
    "@id": "https://dnd5e.app/vocab/dnd5e#additionalMagicalSecretsMaxLvl",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  prerequisites: {
    "@id": "https://dnd5e.app/vocab/dnd5e#prerequisites",
    "@type": "@id",
    "@isCollection": true,
  },
  prerequisiteChoice: {
    "@id": "https://dnd5e.app/vocab/dnd5e#prerequisiteChoice",
    "@type": "@id",
  },
  proficiencies: {
    "@id": "https://dnd5e.app/vocab/dnd5e#proficiencies",
    "@type": "@id",
    "@isCollection": true,
  },
  proficiencyChoices: {
    "@id": "https://dnd5e.app/vocab/dnd5e#proficiencyChoices",
    "@type": "@id",
    "@isCollection": true,
  },
  spellcastingInfo: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellcastingInfo",
    "@type": "@id",
    "@isCollection": true,
  },
  spellcastingAbility: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellcastingAbility",
    "@type": "@id",
  },
  Race: {
    "@id": "https://dnd5e.app/vocab/dnd5e#Race",
    "@context": {
      type: {
        "@id": "@type",
      },
      label: {
        "@id": "http://www.w3.org/2000/01/rdf-schema#label",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      description: {
        "@id": "http://purl.org/dc/terms/description",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      speed: {
        "@id": "https://dnd5e.app/vocab/dnd5e#speed",
        "@type": "http://www.w3.org/2001/XMLSchema#integer",
      },
      abilityBonuses: {
        "@id": "https://dnd5e.app/vocab/dnd5e#abilityBonuses",
        "@type": "@id",
        "@isCollection": true,
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
      startingProficiencies: {
        "@id": "https://dnd5e.app/vocab/dnd5e#startingProficiencies",
        "@type": "@id",
        "@isCollection": true,
      },
      startingProficiencyChoice: {
        "@id": "https://dnd5e.app/vocab/dnd5e#startingProficiencyChoice",
        "@type": "@id",
      },
      languages: {
        "@id": "https://dnd5e.app/vocab/dnd5e#languages",
        "@type": "@id",
        "@isCollection": true,
      },
      languageDescription: {
        "@id": "https://dnd5e.app/vocab/dnd5e#languageDescription",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      traits: {
        "@id": "https://dnd5e.app/vocab/dnd5e#traits",
        "@type": "@id",
        "@isCollection": true,
      },
      subraces: {
        "@id": "https://dnd5e.app/vocab/dnd5e#subraces",
        "@type": "@id",
        "@isCollection": true,
      },
      illustration: {
        "@id": "https://dnd5e.app/vocab/dnd5e#illustration",
        "@type": "@id",
      },
    },
  },
  Trait: {
    "@id": "https://dnd5e.app/vocab/dnd5e#Trait",
    "@context": {
      type: {
        "@id": "@type",
      },
      label: {
        "@id": "http://www.w3.org/2000/01/rdf-schema#label",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      description: {
        "@id": "http://purl.org/dc/terms/description",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      races: {
        "@id": "https://dnd5e.app/vocab/dnd5e#races",
        "@type": "@id",
        "@isCollection": true,
      },
      subraces: {
        "@id": "https://dnd5e.app/vocab/dnd5e#subraces",
        "@type": "@id",
        "@isCollection": true,
      },
      proficiencies: {
        "@id": "https://dnd5e.app/vocab/dnd5e#proficiencies",
        "@type": "@id",
        "@isCollection": true,
      },
      proficiencyChoices: {
        "@id": "https://dnd5e.app/vocab/dnd5e#proficiencyChoices",
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
    },
  },
  Subrace: {
    "@id": "https://dnd5e.app/vocab/dnd5e#Subrace",
    "@context": {
      type: {
        "@id": "@type",
      },
      label: {
        "@id": "http://www.w3.org/2000/01/rdf-schema#label",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      description: {
        "@id": "http://purl.org/dc/terms/description",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      race: {
        "@id": "https://dnd5e.app/vocab/dnd5e#race",
        "@type": "@id",
      },
      abilityBonuses: {
        "@id": "https://dnd5e.app/vocab/dnd5e#abilityBonuses",
        "@type": "@id",
        "@isCollection": true,
      },
      startingProficiencies: {
        "@id": "https://dnd5e.app/vocab/dnd5e#startingProficiencies",
        "@type": "@id",
        "@isCollection": true,
      },
      languages: {
        "@id": "https://dnd5e.app/vocab/dnd5e#languages",
        "@type": "@id",
        "@isCollection": true,
      },
      languageChoice: {
        "@id": "https://dnd5e.app/vocab/dnd5e#languageChoice",
        "@type": "@id",
      },
      traits: {
        "@id": "https://dnd5e.app/vocab/dnd5e#traits",
        "@type": "@id",
        "@isCollection": true,
      },
      illustration: {
        "@id": "https://dnd5e.app/vocab/dnd5e#illustration",
        "@type": "@id",
      },
    },
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
  areaOfEffect: {
    "@id": "https://dnd5e.app/vocab/dnd5e#areaOfEffect",
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
  Character: {
    "@id": "https://dnd5e.app/vocab/dnd5e#Character",
    "@context": {
      type: {
        "@id": "@type",
      },
      label: {
        "@id": "http://www.w3.org/2000/01/rdf-schema#label",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      illustration: {
        "@id": "https://dnd5e.app/vocab/dnd5e#illustration",
        "@type": "@id",
      },
    },
  },
  Condition: {
    "@id": "https://dnd5e.app/vocab/dnd5e#Condition",
    "@context": {
      type: {
        "@id": "@type",
      },
      label: {
        "@id": "http://www.w3.org/2000/01/rdf-schema#label",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      description: {
        "@id": "http://purl.org/dc/terms/description",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
    },
  },
  Monster: {
    "@id": "https://dnd5e.app/vocab/dnd5e#Monster",
    "@context": {
      type: {
        "@id": "@type",
      },
      label: {
        "@id": "http://www.w3.org/2000/01/rdf-schema#label",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      description: {
        "@id": "http://purl.org/dc/terms/description",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      monsterAbilities: {
        "@id": "https://dnd5e.app/vocab/dnd5e#monsterAbilities",
        "@type": "@id",
        "@isCollection": true,
      },
      size: {
        "@id": "https://dnd5e.app/vocab/dnd5e#size",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      ofType: {
        "@id": "https://dnd5e.app/vocab/dnd5e#ofType",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      subtype: {
        "@id": "https://dnd5e.app/vocab/dnd5e#subtype",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      alignmentDescription: {
        "@id": "https://dnd5e.app/vocab/dnd5e#alignmentDescription",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      monsterArmorClass: {
        "@id": "https://dnd5e.app/vocab/dnd5e#monsterArmorClass",
        "@type": "@id",
        "@isCollection": true,
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
        "@isCollection": true,
      },
      legendaryActions: {
        "@id": "https://dnd5e.app/vocab/dnd5e#legendaryActions",
        "@type": "@id",
        "@isCollection": true,
      },
      challengeRating: {
        "@id": "https://dnd5e.app/vocab/dnd5e#challengeRating",
        "@type": "http://www.w3.org/2001/XMLSchema#integer",
      },
      proficiencyBonus: {
        "@id": "https://dnd5e.app/vocab/dnd5e#proficiencyBonus",
        "@type": "http://www.w3.org/2001/XMLSchema#integer",
      },
      conditionImmunities: {
        "@id": "https://dnd5e.app/vocab/dnd5e#conditionImmunities",
        "@type": "@id",
        "@isCollection": true,
      },
      damageImmunities: {
        "@id": "https://dnd5e.app/vocab/dnd5e#damageImmunities",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
        "@isCollection": true,
      },
      damageResistances: {
        "@id": "https://dnd5e.app/vocab/dnd5e#damageResistances",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
        "@isCollection": true,
      },
      damageVulnerabilities: {
        "@id": "https://dnd5e.app/vocab/dnd5e#damageVulnerabilities",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
        "@isCollection": true,
      },
      forms: {
        "@id": "https://dnd5e.app/vocab/dnd5e#forms",
        "@type": "@id",
        "@isCollection": true,
      },
      monsterLanguages: {
        "@id": "https://dnd5e.app/vocab/dnd5e#monsterLanguages",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      monsterSavingThrows: {
        "@id": "https://dnd5e.app/vocab/dnd5e#monsterSavingThrows",
        "@type": "@id",
        "@isCollection": true,
      },
      monsterSkills: {
        "@id": "https://dnd5e.app/vocab/dnd5e#monsterSkills",
        "@type": "@id",
        "@isCollection": true,
      },
      reactions: {
        "@id": "https://dnd5e.app/vocab/dnd5e#reactions",
        "@type": "@id",
        "@isCollection": true,
      },
      senses: {
        "@id": "https://dnd5e.app/vocab/dnd5e#senses",
        "@type": "@id",
      },
      specialAbilities: {
        "@id": "https://dnd5e.app/vocab/dnd5e#specialAbilities",
        "@type": "@id",
        "@isCollection": true,
      },
      monsterSpeed: {
        "@id": "https://dnd5e.app/vocab/dnd5e#monsterSpeed",
        "@type": "@id",
      },
      xp: {
        "@id": "https://dnd5e.app/vocab/dnd5e#xp",
        "@type": "http://www.w3.org/2001/XMLSchema#integer",
      },
      illustration: {
        "@id": "https://dnd5e.app/vocab/dnd5e#illustration",
        "@type": "@id",
      },
    },
  },
  armorList: {
    "@id": "https://dnd5e.app/vocab/dnd5e#armorList",
    "@type": "@id",
    "@isCollection": true,
  },
  condition: {
    "@id": "https://dnd5e.app/vocab/dnd5e#condition",
    "@type": "@id",
  },
  actionChoice: {
    "@id": "https://dnd5e.app/vocab/dnd5e#actionChoice",
    "@type": "@id",
  },
  monsterMultiAttackActions: {
    "@id": "https://dnd5e.app/vocab/dnd5e#monsterMultiAttackActions",
    "@type": "@id",
    "@isCollection": true,
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
    "@isCollection": true,
  },
  damages: {
    "@id": "https://dnd5e.app/vocab/dnd5e#damages",
    "@type": "@id",
    "@isCollection": true,
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
    "@isCollection": true,
  },
  spellcastingSchool: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellcastingSchool",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  spellcastingSlots: {
    "@id": "https://dnd5e.app/vocab/dnd5e#spellcastingSlots",
    "@type": "@id",
    "@isCollection": true,
  },
  slots: {
    "@id": "https://dnd5e.app/vocab/dnd5e#slots",
    "@type": "http://www.w3.org/2001/XMLSchema#integer",
  },
  monsterSpells: {
    "@id": "https://dnd5e.app/vocab/dnd5e#monsterSpells",
    "@type": "@id",
    "@isCollection": true,
  },
  monsterSpellUsage: {
    "@id": "https://dnd5e.app/vocab/dnd5e#monsterSpellUsage",
    "@type": "@id",
  },
  restTypes: {
    "@id": "https://dnd5e.app/vocab/dnd5e#restTypes",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
    "@isCollection": true,
  },
  monsterUsage: {
    "@id": "https://dnd5e.app/vocab/dnd5e#monsterUsage",
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
  Rule: {
    "@id": "https://dnd5e.app/vocab/dnd5e#Rule",
    "@context": {
      type: {
        "@id": "@type",
      },
      label: {
        "@id": "http://www.w3.org/2000/01/rdf-schema#label",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      description: {
        "@id": "http://purl.org/dc/terms/description",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      ruleSections: {
        "@id": "https://dnd5e.app/vocab/dnd5e#ruleSections",
        "@type": "@id",
        "@isCollection": true,
      },
    },
  },
  RuleSection: {
    "@id": "https://dnd5e.app/vocab/dnd5e#RuleSection",
    "@context": {
      type: {
        "@id": "@type",
      },
      label: {
        "@id": "http://www.w3.org/2000/01/rdf-schema#label",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      description: {
        "@id": "http://purl.org/dc/terms/description",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
    },
  },
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
  Storage: {
    "@id": "https://dnd5e.app/vocab/dnd5e#Storage",
    "@context": {
      type: {
        "@id": "@type",
      },
      label: {
        "@id": "http://www.w3.org/2000/01/rdf-schema#label",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      container: {
        "@id": "https://dnd5e.app/vocab/dnd5e#container",
        "@type": "@id",
      },
    },
  },
  storages: {
    "@id": "https://dnd5e.app/vocab/dnd5e#storages",
    "@type": "@id",
    "@isCollection": true,
  },
  defaultCharacter: {
    "@id": "https://dnd5e.app/vocab/dnd5e#defaultCharacter",
    "@type": "@id",
  },
};
