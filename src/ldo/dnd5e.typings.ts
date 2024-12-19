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
  type: Type;
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
  type: Type;
  label: string;
  description: string;
  abbreviation: string;
}

/**
 * Class Type
 */
export interface Class {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: Type;
  label: string;
  description?: string;
}

/**
 * Condition Type
 */
export interface Condition {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: Type;
  label: string;
  description?: string[];
}

/**
 * DamageType Type
 */
export interface DamageType {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: Type;
  label: string;
  description?: string[];
}

/**
 * Language Type
 */
export interface Language {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: Type;
  label: string;
  languageType?: string;
  script?: string;
  description?: string;
  typicalSpeakers?: string[];
}

/**
 * Proficiency Type
 */
export interface Proficiency {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: Type;
  proficiencyType?: string;
  label: string;
  class?: Class[];
  race?: Race[];
  reference?: {
    "@id": string;
  };
}

/**
 * Race Type
 */
export interface Race {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: Type;
  label: string;
}

/**
 * Skill Type
 */
export interface Skill {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: Type;
  label: string;
  description: string[];
  abilityScore: AbilityScore;
}

/**
 * Type Type
 */
export interface Type {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: string;
}
