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
              valueExpr: {
                type: "NodeConstraint",
                datatype: "https://dnd5e.app/vocab/dnd5e#AbilityScore",
              },
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
              valueExpr: {
                type: "NodeConstraint",
                datatype: "https://dnd5e.app/vocab/dnd5e#Alignment",
              },
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
              valueExpr: {
                type: "NodeConstraint",
                datatype: "https://dnd5e.app/vocab/dnd5e#AbilityScore",
              },
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
  ],
};
