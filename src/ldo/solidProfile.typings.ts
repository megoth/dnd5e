import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for solidProfile
 * =============================================================================
 */

/**
 * SolidProfile Type
 */
export interface SolidProfile {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type:
    | {
        "@id": "Person";
      }
    | {
        "@id": "Person2";
      };
  fn: string;
  name: string;
  inbox: string;
  preferencesFile: string;
  storage: string;
  account: string;
  oidcIssuer: string;
  privateTypeIndex: string;
  publicTypeIndex: string;
}
