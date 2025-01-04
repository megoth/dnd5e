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
  ofType2?: string;
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
  classSpellcasting: ClassSpellcasting;
  spells?: Spell[];
  subclasses?: Subclass[];
}

/**
 * ClassLevel Type
 */
export interface ClassLevel {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: Type;
  level: string;
  abilityScoreBonuses?: string;
  proficiencyBonus?: string;
  features?: Feature[];
  levelSpellcasting?: ClassLevelSpellcasting;
  classSpecific?: ClassSpecific;
}

/**
 * ClassLevelSpellcasting Type
 */
export interface ClassLevelSpellcasting {
  "@id"?: string;
  "@context"?: ContextDefinition;
  cantripsKnown?: string;
  spellsKnown?: string;
  spellSlotsLevel1?: string;
  spellSlotsLevel2?: string;
  spellSlotsLevel3?: string;
  spellSlotsLevel4?: string;
  spellSlotsLevel5?: string;
  spellSlotsLevel6?: string;
  spellSlotsLevel7?: string;
  spellSlotsLevel8?: string;
  spellSlotsLevel9?: string;
}

/**
 * ClassSpecific Type
 */
export interface ClassSpecific {
  "@id"?: string;
  "@context"?: ContextDefinition;
  rageCount?: string;
  rageDamageBonus?: string;
  brutalCriticalDice?: string;
  bardicInspirationDice?: string;
  songOfRestDie?: string;
  magicalSecretsMax5?: string;
  magicalSecretsMax7?: string;
  magicalSecretsMax9?: string;
  channelDivinityChargers?: string;
  destroyUndeadCr?: string;
  wildShapeMaxCr?: string;
  wildShapeSwim?: boolean;
  wildShapeFly?: boolean;
  actionSurges?: string;
  indomitableUses?: string;
  extraAttacks?: string;
  kiPoints?: string;
  unarmoredMovement?: string;
  martialArts?: Dice;
  auraRange?: string;
  favoredEnemies?: string;
  favoredTerrain?: string;
  sneakAttack?: Dice;
  sorceryPoints?: string;
  metamagicKnown?: string;
  creatingSpellSlots?: ClassSpecificCreatingSpellSlots[];
  invocationsKnown?: string;
  mysticArcanumLevel6?: string;
  mysticArcanumLevel7?: string;
  mysticArcanumLevel8?: string;
  mysticArcanumLevel9?: string;
  arcaneRecoverLevels?: string;
}

/**
 * ClassSpellcasting Type
 */
export interface ClassSpellcasting {
  "@id"?: string;
  "@context"?: ContextDefinition;
  level: string;
  spellcastingInfo?: ClassSpellcastingInfo[];
  spellcastingAbility: AbilityScore;
}

/**
 * ClassSpellcastingInfo Type
 */
export interface ClassSpellcastingInfo {
  "@id"?: string;
  "@context"?: ContextDefinition;
  label: string;
  description?: string[];
}

/**
 * ClassSpecificCreatingSpellSlots Type
 */
export interface ClassSpecificCreatingSpellSlots {
  "@id"?: string;
  "@context"?: ContextDefinition;
  spellSlotLevel?: string;
  sorceryPointCost?: string;
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
 * Dice Type
 */
export interface Dice {
  "@id"?: string;
  "@context"?: ContextDefinition;
  diceCount?: string;
  diceValue?: string;
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
 * Feature Type
 */
export interface Feature {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: Type;
  label: string;
  description?: string[];
  level?: string;
  class?: Class;
  subclass?: Subclass;
  parent?: Feature;
  prerequisites?: FeaturePrerequisite[];
  featureSpecific?: FeatureSpecific;
}

/**
 * FeaturePrerequisite Type
 */
export interface FeaturePrerequisite {
  "@id"?: string;
  "@context"?: ContextDefinition;
  ofType: string;
  level?: string;
  feature?: Feature;
  spell?: Spell;
}

/**
 * FeatureSpecific Type
 */
export interface FeatureSpecific {
  "@id"?: string;
  "@context"?: ContextDefinition;
  expertiseOptions?: Choice;
  invocations?: Feature[];
  subfeatureOptions?: Choice;
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
 * MagicSchool Type
 */
export interface MagicSchool {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: Type;
  label: string;
  description: string;
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
  description?: string[];
  spellRange: string;
  components?: string[];
  duration: string;
  castingTime?: string;
  magicSchool: MagicSchool;
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
 * Subclass Type
 */
export interface Subclass {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: Type;
}

/**
 * Type Type
 */
export interface Type {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: string;
}
