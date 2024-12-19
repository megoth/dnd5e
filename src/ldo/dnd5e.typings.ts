import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for dnd5e
 * =============================================================================
 */

/**
 * AbilityScore Type
 */
export interface AbilityScore {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: string;
  label: string;
  description: string[];
  abbreviation: string;
  skill?: Skill[];
}

/**
 * Alignment Type
 */
export interface Alignment {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: string;
  label: string;
  description: string;
  abbreviation: string;
}

/**
 * Skill Type
 */
export interface Skill {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: string;
  label: string;
  description: string[];
  abilityScore: AbilityScore;
}
