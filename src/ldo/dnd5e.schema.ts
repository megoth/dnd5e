import { Schema } from "shexj";

/**
 * =============================================================================
 * dnd5eSchema: ShexJ Schema for dnd5e
 * =============================================================================
 */
export const dnd5eSchema: Schema = {
  type: "Schema",
  shapes: [
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#AbilityBonus",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#bonus",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#abilityScore",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#AbilityScore",
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#AbilityScore",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Type",
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 1,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#abbreviation",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#skillList",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Skill",
              min: 0,
              max: -1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#AbilityScoreOption",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#abilityScore",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#AbilityScore",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#minimumScore",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#ActionOption",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#count",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#actionType",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Alignment",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Type",
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#abbreviation",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#AreaOfEffect",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#areaSize",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#ofType",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Armor",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#armorCategory",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#armorClass",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#ArmorClass",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#strMinimum",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#stealthDisadvantage",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#boolean",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#weight",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#ArmorClass",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#base",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#dexBonus",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#boolean",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#maxBonus",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Background",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Type",
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#startingProficiencies",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Proficiency",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#startingEquipment",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#StartingEquipment",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate:
                "https://dnd5e.app/vocab/dnd5e#startingEquipmentOptions",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Choice",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#languageOptions",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Choice",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#feature",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#BackgroundFeature",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#personalityTraits",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Choice",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#ideals",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Choice",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#bonds",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Choice",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#flaws",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Choice",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#BackgroundFeature",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#BonusOption",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#abilityScore",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#AbilityScore",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#bonus",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#BreathOption",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#difficultyClass",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#DifficultyClass",
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#breathDamage",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Damage",
              min: 0,
              max: -1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Choice",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Type",
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#choose",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#ofType",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#from",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#OptionSet",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#fromResourceList",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#ResourceListOptionSet",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#ChoiceOption",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "TripleConstraint",
          predicate: "https://dnd5e.app/vocab/dnd5e#choice",
          valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Choice",
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Class",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Type",
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#hitDie",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#levels",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Level",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#multiclassing",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Multiclassing",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#proficiencies",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Proficiency",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#proficiencyChoices",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Choice",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#savingThrows",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#AbilityScore",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#startingEquipment",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#StartingEquipment",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate:
                "https://dnd5e.app/vocab/dnd5e#startingEquipmentOptions",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Choice",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#classSpellcasting",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#ClassSpellcasting",
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#spells",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Spell",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#subclasses",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Subclass",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#illustration",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Illustration",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#ClassSpecific",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#rageCount",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#rageDamageBonus",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#brutalCriticalDice",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#bardicInspirationDice",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#songOfRestDie",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#magicalSecretsMax5",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#magicalSecretsMax7",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#magicalSecretsMax9",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate:
                "https://dnd5e.app/vocab/dnd5e#channelDivinityChargers",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#destroyUndeadCr",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#wildShapeMaxCr",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#wildShapeSwim",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#boolean",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#wildShapeFly",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#boolean",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#actionSurges",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#indomitableUses",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#extraAttacks",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#kiPoints",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#unarmoredMovement",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#martialArts",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Dice",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#auraRange",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#favoredEnemies",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#favoredTerrain",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#sneakAttack",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Dice",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#sorceryPoints",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#metamagicKnown",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#creatingSpellSlots",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#ClassSpecificCreatingSpellSlots",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#invocationsKnown",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#mysticArcanumLevel6",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#mysticArcanumLevel7",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#mysticArcanumLevel8",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#mysticArcanumLevel9",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#arcaneRecoverLevels",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#ClassSpellcasting",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#level",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#spellcastingInfo",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#ClassSpellcastingInfo",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#spellcastingAbility",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#AbilityScore",
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#ClassSpellcastingInfo",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#ClassSpecificCreatingSpellSlots",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#spellSlotLevel",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#sorceryPointCost",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Condition",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Type",
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#CountOption",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#count",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#of",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Equipment",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Cost",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#quantity",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#unit",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Damage",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#dice",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#damageType",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#DamageType",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#DamageCharacterLevel",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#level",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#damageDice",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#DamageOption",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#type",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#dice:",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#notes",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#DamageSlotLevel",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#slot",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#damageDice",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#DamageType",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Type",
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Dice",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#diceCount",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#diceValue",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#DifficultyClass",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#dcType",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#AbilityScore",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#value",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#successType",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Equipment",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Type",
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#equipmentCategory",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#EquipmentCategory",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#cost",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Cost",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#weapon",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Weapon",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#armor",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Armor",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#gear",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Gear",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#equipmentPack",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#EquipmentPack",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#magicItem",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#MagicItem",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#EquipmentCategory",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Type",
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#equipmentList",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Equipment",
              min: 0,
              max: -1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#EquipmentPack",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#gearCategory",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#EquipmentCategory",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#contents",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#EquipmentPackContent",
              min: 0,
              max: -1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#EquipmentPackContent",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#quantity",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#item",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Equipment",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Feature",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Type",
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#level",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#class",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Class",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#subclass",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Subclass",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#parent",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Feature",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#featurePrerequisites",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#FeaturePrerequisite",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#featureSpecific",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#FeatureSpecific",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#FeaturePrerequisite",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#ofType",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#level",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#feature",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Feature",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#spell",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Spell",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#FeatureSpecific",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#expertiseOptions",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Choice",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#invocations",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Feature",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#subfeatureOptions",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Choice",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Gear",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#gearCategory",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#EquipmentCategory",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#weight",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#IdealOption",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#alignments",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
              min: 0,
              max: -1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Illustration",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Type",
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#imageUrl",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#creator",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#creatorUrl",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Language",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Type",
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#languageType",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#script",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#typicalSpeakers",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Level",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Type",
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#level",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#abilityScoreBonuses",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#proficiencyBonus",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#features",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Feature",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#levelSpellcasting",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#LevelSpellcasting",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#classSpecific",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#ClassSpecific",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#subclassSpecific",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#SubclassSpecific",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#LevelSpellcasting",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#cantripsKnown",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#spellsKnown",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#spellSlotsLevel1",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#spellSlotsLevel2",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#spellSlotsLevel3",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#spellSlotsLevel4",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#spellSlotsLevel5",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#spellSlotsLevel6",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#spellSlotsLevel7",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#spellSlotsLevel8",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#spellSlotsLevel9",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#MagicItem",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#rarity",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#magicItemVariants",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#MagicItem",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#magicItemVariant",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#boolean",
              },
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#MagicSchool",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Type",
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#illustration",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Illustration",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Monster",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Type",
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#monsterAbilities",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#MonsterAbility",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#size",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#ofType",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#subtype",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#alignmentDescription",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#monsterArmorClass",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#MonsterArmorClass",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#hitPoints",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#hitDice",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#hitPointsRoll",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#monsterActions",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#MonsterAction",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#legendaryActions",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#MonsterAction",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#challengeRating",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#proficiencyBonus",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#conditionImmunities",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Condition",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#damageImmunities",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#damageResistances",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#damageVulnerabilities",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#forms",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Monster",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#monsterLanguages",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#monsterSavingThrows",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#MonsterProficiency",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#monsterSkills",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#MonsterProficiency",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#reactions",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#MonsterAction",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#senses",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#MonsterSense",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#specialAbilities",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#MonsterSpecialAbility",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#monsterSpeed",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#MonsterSpeed",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#xp",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#illustration",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Illustration",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#MonsterAbility",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#abilityScore",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#AbilityScore",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#value",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#MonsterAction",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#actionOptions",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Choice",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate:
                "https://dnd5e.app/vocab/dnd5e#monsterMultiAttackActions",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#MonsterMultiAttackAction",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#monsterActionOptions",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Choice",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#multiattackType",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#attackBonus",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#difficultyClass",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#DifficultyClass",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#monsterAttacks",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#MonsterAttack",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#damages",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Damage",
              min: 0,
              max: -1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#MonsterArmorClass",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#ofType",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#value",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#armorList",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Armor",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#spell",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Spell",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#condition",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Condition",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#MonsterAttack",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#difficultyClass",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#DifficultyClass",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#damage",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Damage",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#MonsterMultiAttackAction",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#count",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#ofType",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#MonsterProficiency",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#value",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#proficiency",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Proficiency",
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#MonsterSense",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#passivePerception",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#blindsight",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#darkvision",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#tremorsense",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#truesight",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#MonsterSpecialAbility",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#attackBonus",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#damage",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Damage",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#difficultyClass",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#DifficultyClass",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#monsterSpellcasting",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#MonsterSpellcasting",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#monsterUsage",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#MonsterUsage",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#MonsterSpeed",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#walk",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#burrow",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#climb",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#fly",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#swim",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#MonsterSpell",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#level",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#spell",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Spell",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#monsterSpellUsage",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#MonsterUsage",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#MonsterSpellcasting",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#abilityScore",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#AbilityScore",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#dcValue",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#modifier",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#componentsRequired",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#spellcastingSchool",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#spellcastingSlots",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#MonsterSpellLevelSlots",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#monsterSpells",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#MonsterSpell",
              min: 0,
              max: -1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#MonsterSpellLevelSlots",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#level",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#slots",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#MonsterUsage",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#ofType",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#restTypes",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#times",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Multiclassing",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#prerequisites",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Prerequisite",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#prerequisiteOptions",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Choice",
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#proficiencies",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Proficiency",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#proficiencyChoices",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Choice",
              min: 0,
              max: -1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#MultipleOption",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#actions",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#ActionOption",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#choices",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#ChoiceOption",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#counts",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#CountOption",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#references",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#ReferenceOption",
              min: 0,
              max: -1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#OptionAction",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "TripleConstraint",
          predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
          valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Type",
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#OptionSet",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#abilityScores",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#AbilityScoreOption",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#actions",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#ActionOption",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#bonuses",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#BonusOption",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#breaths",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#BreathOption",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#choices",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#ChoiceOption",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#counts",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#CountOption",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#damageOptions",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#DamageOption",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#equipmentCategory",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#EquipmentCategory",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#ideals",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#IdealOption",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#multiples",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#MultipleOption",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#references",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#ReferenceOption",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#strings",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#StringOption",
              min: 0,
              max: -1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Prerequisite",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#abilityScore",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#AbilityScore",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#minimumScore",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Proficiency",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Type",
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#ofType",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#classes",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Class",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#races",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Race",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#reference",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#equipment",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Equipment",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#equipmentCategory",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#EquipmentCategory",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#savingThrow",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#AbilityScore",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#skill",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Skill",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Race",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Type",
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#speed",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#abilityBonuses",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#AbilityBonus",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#alignmentDescription",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#age",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#size",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#sizeDescription",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#startingProficiencies",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Proficiency",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate:
                "https://dnd5e.app/vocab/dnd5e#startingProficiencyOptions",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Choice",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#languages",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Language",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#languageDescription",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#traits",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Trait",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#subraces",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Subrace",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#illustration",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Illustration",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#ReferenceOption",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#equipment",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Equipment",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#language",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Language",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#proficiency",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Proficiency",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#spell",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Spell",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#ResourceListOptionSet",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "TripleConstraint",
          predicate: "https://dnd5e.app/vocab/dnd5e#resourceList",
          valueExpr: {
            type: "NodeConstraint",
            datatype: "http://www.w3.org/2001/XMLSchema#string",
          },
          min: 0,
          max: 1,
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Rule",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Type",
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#ruleSections",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#RuleSection",
              min: 0,
              max: -1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#RuleSection",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Type",
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#ScorePrerequisiteOption",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#abilityScore",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#AbilityScore",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#minimumScore",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Skill",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Type",
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#abilityScore",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#AbilityScore",
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Spell",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Type",
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#higherLevel",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#spellRange",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#components",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#material",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#areaOfEffect",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#AreaOfEffect",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#ritual",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#boolean",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#duration",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#concentration",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#boolean",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#castingTime",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#level",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#attackType",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#spellDamage",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#SpellDamage",
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#magicSchool",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#MagicSchool",
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#classes",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Class",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#subclasses",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Subclass",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#illustration",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Illustration",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#SpellDamage",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#damageType",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#DamageType",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#damageAtCharacterLevel",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#DamageCharacterLevel",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#damageAtSlotLevel",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#DamageSlotLevel",
              min: 0,
              max: -1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#StartingEquipment",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#quantity",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#equipment",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Equipment",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#StringOption",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "TripleConstraint",
          predicate: "https://dnd5e.app/vocab/dnd5e#string:",
          valueExpr: {
            type: "NodeConstraint",
            datatype: "http://www.w3.org/2001/XMLSchema#strsing",
          },
          min: 0,
          max: 1,
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Subclass",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Type",
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#class",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Class",
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#subclassFlavor",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#levels",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Level",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#subclassSpells",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#SubclassSpell",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#illustration",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Illustration",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#SubclassSpecific",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate:
                "https://dnd5e.app/vocab/dnd5e#additionalMagicalSecretsMaxLvl",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#auraRange",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#SubclassSpell",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#levelPrerequisites",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Level",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate:
                "https://dnd5e.app/vocab/dnd5e#subclassFeaturePrerequisites",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Feature",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#spell",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Spell",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Subrace",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Type",
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#race",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Race",
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#abilityBonuses",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#AbilityBonus",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#startingProficiencies",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Proficiency",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#languages",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Language",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#languageOptions",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Choice",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#traits",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Trait",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#illustration",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Illustration",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Trait",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Type",
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#races",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Race",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#subraces",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Subrace",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#proficiencies",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Proficiency",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#proficiencyChoices",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Choice",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#languageOptions",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Choice",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#traitSpecific",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#TraitSpecific",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#TraitSpecific",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#damageType",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#DamageType",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#spellOptions",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Choice",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#subtraitOptions",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Choice",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#breathWeapon",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#TraitSpecificBreathWeapon",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#TraitSpecificBreathWeapon",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#areaOfEffect",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#AreaOfEffect",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#breathWeaponDamage",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#TraitSpecificBreathWeaponDamage",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#difficultyClass",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#DifficultyClass",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#traitSpecificUsage",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#TraitSpecificUsage",
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#TraitSpecificBreathWeaponDamage",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#damageType",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#DamageType",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#damageAtCharacterLevel",
              valueExpr:
                "https://ldo.js.org/shapes/dnd5e.shex#DamageCharacterLevel",
              min: 0,
              max: -1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#TraitSpecificUsage",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#times",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#ofType",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Type",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "TripleConstraint",
          predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
          valueExpr: {
            type: "NodeConstraint",
            datatype: "http://www.w3.org/2000/01/rdf-schema#Class",
          },
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#Weapon",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#weaponCategory",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#weaponRange",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#categoryRange",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#range",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#WeaponRange",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#damage",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Damage",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#twoHandedDamage",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Damage",
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#properties",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#WeaponProperty",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#weight",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#WeaponProperty",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#Type",
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2000/01/rdf-schema#label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "http://purl.org/dc/terms/description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: -1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#WeaponRange",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#normal",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#long",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#integer",
              },
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
  ],
};
