import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for dnd5e
 * =============================================================================
 */

/**
 * Alignment Type
 */
export interface Alignment {
  "@id"?: string;
  "@context"?: ContextDefinition;
  label: string;
  description: string;
  abbreviation: string;
}
