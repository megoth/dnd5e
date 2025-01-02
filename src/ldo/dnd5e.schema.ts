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
              predicate: "https://dnd5e.app/vocab/dnd5e#skill",
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
              predicate: "https://dnd5e.app/vocab/dnd5e#damage",
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
              max: 1,
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
              max: 1,
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
              valueExpr: "https://ldo.js.org/shapes/dnd5e.shex#ClassLevel",
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
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/dnd5e.shex#ClassLevel",
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
      id: "https://ldo.js.org/shapes/dnd5e.shex#Damage",
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
              predicate: "https://dnd5e.app/vocab/dnd5e#dice",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
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
      id: "https://ldo.js.org/shapes/dnd5e.shex#DifficultyClass",
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
      id: "https://ldo.js.org/shapes/dnd5e.shex#IdealOption",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/dnd5e#description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
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
              max: 1,
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
              predicate: "https://dnd5e.app/vocab/dnd5e#damages",
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
              predicate: "https://dnd5e.app/vocab/dnd5e#proficiencyType",
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
              min: 1,
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
  ],
};
