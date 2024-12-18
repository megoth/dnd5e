import { Schema } from "shexj";

/**
 * =============================================================================
 * appSchema: ShexJ Schema for app
 * =============================================================================
 */
export const appSchema: Schema = {
  type: "Schema",
  shapes: [
    {
      id: "https://ldo.js.org/shapes/app.shex#App",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/app#resourceBundle",
              valueExpr: "https://ldo.js.org/shapes/app.shex#ResourceBundle",
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/app#supportLanguage",
              valueExpr: "https://ldo.js.org/shapes/app.shex#Locale",
              min: 0,
              max: -1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/app.shex#FAQ",
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
              predicate: "https://dnd5e.app/vocab/app#faqLabel",
              valueExpr: "https://ldo.js.org/shapes/app.shex#Translation",
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/app#faqDescription",
              valueExpr: "https://ldo.js.org/shapes/app.shex#Translation",
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/app.shex#Locale",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/app#language",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/app#languageFlag",
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
      id: "https://ldo.js.org/shapes/app.shex#ResourceBundle",
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
              predicate: "https://dnd5e.app/vocab/app#errorsIndex",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/app#faqIndex",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
              min: 0,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/app#translationBase",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/app#translationsIndex",
              valueExpr: "https://ldo.js.org/shapes/app.shex#TranslationsIndex",
              min: 0,
              max: -1,
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/app.shex#TranslationsIndex",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/app#language",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://dnd5e.app/vocab/app#resource",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
            },
          ],
        },
      },
    },
    {
      id: "https://ldo.js.org/shapes/app.shex#Translation",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "TripleConstraint",
          predicate: "http://www.w3.org/2004/02/skos/core#definition",
          valueExpr: {
            type: "NodeConstraint",
            datatype: "http://www.w3.org/2001/XMLSchema#string",
          },
        },
      },
    },
  ],
};
