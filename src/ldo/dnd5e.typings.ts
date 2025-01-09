import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for dnd5e
 * =============================================================================
 */

/**
 * AbilityBonus Type
 */
export interface AbilityBonus {
  "@id"?: string;
  "@context"?: ContextDefinition;
  bonus: number;
  abilityScore: AbilityScore;
}

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
 * AreaOfEffect Type
 */
export interface AreaOfEffect {
  "@id"?: string;
  "@context"?: ContextDefinition;
  areaSize: number;
  ofType: string;
}

/**
 * Armor Type
 */
export interface Armor {
  "@id"?: string;
  "@context"?: ContextDefinition;
  armorCategory: string;
  armorClass?: ArmorClass;
  strMinimum?: number;
  stealthDisadvantage?: boolean;
  weight?: number;
}

/**
 * ArmorClass Type
 */
export interface ArmorClass {
  "@id"?: string;
  "@context"?: ContextDefinition;
  base?: number;
  dexBonus?: boolean;
  maxBonus?: number;
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
  breathDamage?: Damage[];
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
  description?: string[];
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
  illustration?: Illustration;
}

/**
 * ClassLevel Type
 */
export interface ClassLevel {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: Type;
  level: number;
  abilityScoreBonuses?: number;
  proficiencyBonus?: number;
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
  cantripsKnown?: number;
  spellsKnown?: number;
  spellSlotsLevel1?: number;
  spellSlotsLevel2?: number;
  spellSlotsLevel3?: number;
  spellSlotsLevel4?: number;
  spellSlotsLevel5?: number;
  spellSlotsLevel6?: number;
  spellSlotsLevel7?: number;
  spellSlotsLevel8?: number;
  spellSlotsLevel9?: number;
}

/**
 * ClassSpecific Type
 */
export interface ClassSpecific {
  "@id"?: string;
  "@context"?: ContextDefinition;
  rageCount?: number;
  rageDamageBonus?: number;
  brutalCriticalDice?: number;
  bardicInspirationDice?: number;
  songOfRestDie?: number;
  magicalSecretsMax5?: number;
  magicalSecretsMax7?: number;
  magicalSecretsMax9?: number;
  channelDivinityChargers?: number;
  destroyUndeadCr?: number;
  wildShapeMaxCr?: number;
  wildShapeSwim?: boolean;
  wildShapeFly?: boolean;
  actionSurges?: number;
  indomitableUses?: number;
  extraAttacks?: number;
  kiPoints?: number;
  unarmoredMovement?: number;
  martialArts?: Dice;
  auraRange?: number;
  favoredEnemies?: number;
  favoredTerrain?: number;
  sneakAttack?: Dice;
  sorceryPoints?: number;
  metamagicKnown?: number;
  creatingSpellSlots?: ClassSpecificCreatingSpellSlots[];
  invocationsKnown?: number;
  mysticArcanumLevel6?: number;
  mysticArcanumLevel7?: number;
  mysticArcanumLevel8?: number;
  mysticArcanumLevel9?: number;
  arcaneRecoverLevels?: number;
}

/**
 * ClassSpellcasting Type
 */
export interface ClassSpellcasting {
  "@id"?: string;
  "@context"?: ContextDefinition;
  level: number;
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
  spellSlotLevel?: number;
  sorceryPointCost?: number;
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
 * Cost Type
 */
export interface Cost {
  "@id"?: string;
  "@context"?: ContextDefinition;
  quantity?: number;
  unit?: string;
}

/**
 * Damage Type
 */
export interface Damage {
  "@id"?: string;
  "@context"?: ContextDefinition;
  dice: string;
  damageType?: DamageType;
}

/**
 * DamageCharacterLevel Type
 */
export interface DamageCharacterLevel {
  "@id"?: string;
  "@context"?: ContextDefinition;
  level: number;
  damageDice: string;
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
 * DamageSlotLevel Type
 */
export interface DamageSlotLevel {
  "@id"?: string;
  "@context"?: ContextDefinition;
  slot: number;
  damageDice: string;
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
  diceCount?: number;
  diceValue?: number;
}

/**
 * DifficultyClass Type
 */
export interface DifficultyClass {
  "@id"?: string;
  "@context"?: ContextDefinition;
  dcType?: AbilityScore;
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
  equipmentCategory?: EquipmentCategory;
  cost?: Cost;
  weapon?: Weapon;
  armor?: Armor;
  gear?: Gear;
  equipmentPack?: EquipmentPack;
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
 * EquipmentPack Type
 */
export interface EquipmentPack {
  "@id"?: string;
  "@context"?: ContextDefinition;
  gearCategory?: EquipmentCategory;
  contents?: Equipment[];
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
  level?: number;
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
  level?: number;
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
 * Gear Type
 */
export interface Gear {
  "@id"?: string;
  "@context"?: ContextDefinition;
  gearCategory?: string;
  weight?: number;
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
 * Illustration Type
 */
export interface Illustration {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: Type;
  imageUrl: {
    "@id": string;
  };
  description?: string;
  creator?: string;
  creatorUrl?: {
    "@id": string;
  };
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
  description?: string[];
  speed: number;
  abilityBonuses?: AbilityBonus[];
  alignmentDescription?: string;
  age?: string;
  size?: string;
  sizeDescription?: string;
  startingProficiencies?: Proficiency[];
  startingProficiencyOptions?: Choice;
  languages?: Language[];
  languageDescription?: string;
  traits?: Trait[];
  subraces?: Subrace[];
  illustration?: Illustration;
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
  higherLevel?: string[];
  spellRange: string;
  components?: string[];
  material?: string;
  areaOfEffect?: AreaOfEffect;
  ritual?: boolean;
  duration: string;
  concentration?: boolean;
  castingTime?: string;
  level: number;
  attackType?: string;
  spellDamage: SpellDamage;
  magicSchool: MagicSchool;
  classes?: Class[];
  subclasses?: Subclass[];
}

/**
 * SpellDamage Type
 */
export interface SpellDamage {
  "@id"?: string;
  "@context"?: ContextDefinition;
  damageType?: DamageType;
  damageAtCharacterLevel?: DamageCharacterLevel[];
  damageAtSlotLevel?: DamageSlotLevel[];
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
  label: string;
}

/**
 * Subrace Type
 */
export interface Subrace {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: Type;
}

/**
 * Trait Type
 */
export interface Trait {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: Type;
  label: string;
  description?: string[];
  races?: Race[];
  subraces?: Subrace[];
  proficiencies?: Proficiency[];
  proficiencyChoices?: Choice;
  languageOptions?: Choice;
  traitSpecific?: TraitSpecific;
}

/**
 * TraitSpecific Type
 */
export interface TraitSpecific {
  "@id"?: string;
  "@context"?: ContextDefinition;
  damageType?: DamageType;
  spellOptions?: Choice;
  subtraitOptions?: Choice;
  breathWeapon?: TraitSpecificBreathWeapon;
}

/**
 * TraitSpecificBreathWeapon Type
 */
export interface TraitSpecificBreathWeapon {
  "@id"?: string;
  "@context"?: ContextDefinition;
  label?: string;
  description: string;
  areaOfEffect?: AreaOfEffect;
  breathWeaponDamage?: TraitSpecificBreathWeaponDamage;
  difficultyClass?: DifficultyClass;
  traitSpecificUsage?: TraitSpecificUsage;
}

/**
 * TraitSpecificBreathWeaponDamage Type
 */
export interface TraitSpecificBreathWeaponDamage {
  "@id"?: string;
  "@context"?: ContextDefinition;
  damageType?: DamageType;
  damageAtCharacterLevel?: DamageCharacterLevel[];
}

/**
 * TraitSpecificUsage Type
 */
export interface TraitSpecificUsage {
  "@id"?: string;
  "@context"?: ContextDefinition;
  times: number;
  ofType: string;
}

/**
 * Type Type
 */
export interface Type {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: string;
}

/**
 * Weapon Type
 */
export interface Weapon {
  "@id"?: string;
  "@context"?: ContextDefinition;
  weaponCategory: string;
  weaponRange?: string;
  categoryRange?: string;
  range?: WeaponRange;
  damage?: Damage;
  twoHandedDamage?: Damage;
  properties?: WeaponProperty[];
  weight?: number;
}

/**
 * WeaponProperty Type
 */
export interface WeaponProperty {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: Type;
  label?: string;
  description?: string[];
}

/**
 * WeaponRange Type
 */
export interface WeaponRange {
  "@id"?: string;
  "@context"?: ContextDefinition;
  normal?: number;
  long?: number;
}
