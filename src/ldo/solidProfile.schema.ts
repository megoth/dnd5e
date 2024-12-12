import { Schema } from "shexj";

/**
 * =============================================================================
 * solidProfileSchema: ShexJ Schema for solidProfile
 * =============================================================================
 */
export const solidProfileSchema: Schema = {
  type: "Schema",
  shapes: [
    {
      id: "https://ldo.js.org/shapes/solidProfile.shex#SolidProfile",
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
                values: [
                  "http://schema.org/Person",
                  "http://xmlns.com/foaf/0.1/Person",
                ],
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/2006/vcard/ns#fn",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://xmlns.com/foaf/0.1/name",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/ns/ldp#inbox",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2000/01/rdf-schema#Resource",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/ns/pim/space#preferencesFile",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/ns/pim/space#ConfigurationFile",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/ns/pim/space#storage",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "https://ldo.js.org/shapes/solidProfile.shex#Storage",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/ns/solid/terms#account",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/ns/solid/terms#Account",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/ns/solid/terms#oidcIssuer",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2000/01/rdf-schema#Resource",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/ns/solid/terms#privateTypeIndex",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/ns/solid/terms#UnlistedDocument",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/ns/solid/terms#publicTypeIndex",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/ns/solid/terms#ListedDocument",
              },
            },
          ],
        },
        extra: ["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"],
      },
    },
  ],
};
