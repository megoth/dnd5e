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
 * AbilityScoreOption Type
 */
export interface AbilityScoreOption {
  "@id"?: string;
  "@context"?: ContextDefinition;
  abilityScore?: AbilityScore;
  minimumScore?: number;
}

/**
 * ActionOption Type
 */
export interface ActionOption {
  "@id"?: string;
  "@context"?: ContextDefinition;
  label?: string;
  count?: number;
  actionType?: string;
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
 * Background Type
 */
export interface Background {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: Type;
  label: string;
  startingProficiencies?: Proficiency[];
  startingEquipment?: StartingEquipment[];
  startingEquipmentOptions?: Choice[];
  languageOptions?: Choice;
  feature?: BackgroundFeature;
  personalityTraits?: Choice;
  ideals?: Choice;
  bonds?: Choice;
  flaws?: Choice;
}

/**
 * BackgroundFeature Type
 */
export interface BackgroundFeature {
  "@id"?: string;
  "@context"?: ContextDefinition;
  label?: string;
  description?: string[];
}

/**
 * BonusOption Type
 */
export interface BonusOption {
  "@id"?: string;
  "@context"?: ContextDefinition;
  abilityScore?: AbilityScore;
  bonus?: number;
}

/**
 * BreathOption Type
 */
export interface BreathOption {
  "@id"?: string;
  "@context"?: ContextDefinition;
  label?: string;
  difficultyClass: DifficultyClass;
  damage?: Damage[];
}

/**
 * Choice Type
 */
export interface Choice {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: Type;
  description?: string;
  choose?: number;
  ofType?: string;
  from?: OptionSet;
  fromResourceList?: ResourceListOptionSet;
}

/**
 * ChoiceOption Type
 */
export interface ChoiceOption {
  "@id"?: string;
  "@context"?: ContextDefinition;
  choice: Choice;
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
  hitDie: number;
  levels?: ClassLevel[];
  multiclassing?: Multiclassing;
  proficiencies?: Proficiency[];
  proficiencyChoices?: Choice[];
  savingThrows?: AbilityScore[];
  startingEquipment?: StartingEquipment[];
  startingEquipmentOptions?: Choice[];
}

/**
 * ClassLevel Type
 */
export interface ClassLevel {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: Type;
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
 * CountOption Type
 */
export interface CountOption {
  "@id"?: string;
  "@context"?: ContextDefinition;
  count?: number;
  of?: Equipment;
}

/**
 * Damage Type
 */
export interface Damage {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: Type;
  dice: string;
  type2?: {
    "@id": string;
  };
}

/**
 * DamageOption Type
 */
export interface DamageOption {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type2?: {
    "@id": string;
  };
  "dice:"?: string;
  notes?: string;
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
 * DifficultyClass Type
 */
export interface DifficultyClass {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: Type;
  dcValue?: number;
  successType?: string;
}

/**
 * Equipment Type
 */
export interface Equipment {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: Type;
  label: string;
  description?: string[];
}

/**
 * EquipmentCategory Type
 */
export interface EquipmentCategory {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: Type;
  label: string;
  equipmentList?: Equipment[];
}

/**
 * IdealOption Type
 */
export interface IdealOption {
  "@id"?: string;
  "@context"?: ContextDefinition;
  description2?: string;
  alignments?: {
    "@id": string;
  }[];
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
 * Multiclassing Type
 */
export interface Multiclassing {
  "@id"?: string;
  "@context"?: ContextDefinition;
  prerequisites?: Prerequisite[];
  prerequisiteOptions: Choice;
  proficiencies?: Proficiency[];
  proficiencyChoices?: Choice[];
}

/**
 * MultipleOption Type
 */
export interface MultipleOption {
  "@id"?: string;
  "@context"?: ContextDefinition;
  actions?: ActionOption[];
  choices?: ChoiceOption[];
  counts?: CountOption[];
  references?: ReferenceOption[];
}

/**
 * OptionAction Type
 */
export interface OptionAction {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: Type;
}

/**
 * OptionSet Type
 */
export interface OptionSet {
  "@id"?: string;
  "@context"?: ContextDefinition;
  abilityScores?: AbilityScoreOption[];
  actions?: ActionOption[];
  bonuses?: BonusOption[];
  breaths?: BreathOption[];
  choices?: ChoiceOption[];
  counts?: CountOption[];
  damages?: DamageOption[];
  equipmentCategory?: EquipmentCategory;
  ideals?: IdealOption[];
  multiples?: MultipleOption[];
  references?: ReferenceOption[];
  strings?: StringOption[];
}

/**
 * Prerequisite Type
 */
export interface Prerequisite {
  "@id"?: string;
  "@context"?: ContextDefinition;
  abilityScore?: AbilityScore;
  minimumScore?: number;
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
  classes?: Class[];
  races?: Race[];
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
 * ReferenceOption Type
 */
export interface ReferenceOption {
  "@id"?: string;
  "@context"?: ContextDefinition;
  equipment?: Equipment;
  language?: Language;
  proficiency?: Proficiency;
  spell?: Spell;
}

/**
 * ResourceListOptionSet Type
 */
export interface ResourceListOptionSet {
  "@id"?: string;
  "@context"?: ContextDefinition;
  resourceList?: string;
}

/**
 * ScorePrerequisiteOption Type
 */
export interface ScorePrerequisiteOption {
  "@id"?: string;
  "@context"?: ContextDefinition;
  abilityScore?: AbilityScore;
  minimumScore?: number;
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
 * Spell Type
 */
export interface Spell {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: Type;
  label: string;
}

/**
 * StartingEquipment Type
 */
export interface StartingEquipment {
  "@id"?: string;
  "@context"?: ContextDefinition;
  quantity?: number;
  equipment?: Equipment;
}

/**
 * StringOption Type
 */
export interface StringOption {
  "@id"?: string;
  "@context"?: ContextDefinition;
  "string:"?: string;
}

/**
 * Type Type
 */
export interface Type {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: string;
}
