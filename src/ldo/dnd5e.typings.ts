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
  type: {
    "@id": "AbilityScore";
  };
  label: string;
  description?: string;
  abbreviation: string;
  skillList?: Skill[];
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
  type: {
    "@id": "Alignment";
  };
  label: string;
  description?: string;
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
  type: {
    "@id": "Background";
  };
  label: string;
  startingProficiencies?: Proficiency[];
  startingEquipment?: StartingEquipment[];
  startingEquipmentOptions?: Choice[];
  languageOptions?: Choice;
  backgroundFeature?: BackgroundFeature;
  personalityTraits?: Choice;
  ideals?: Choice;
  bonds?: Choice;
  flaws?: Choice;
  illustration?: Illustration;
}

/**
 * BackgroundFeature Type
 */
export interface BackgroundFeature {
  "@id"?: string;
  "@context"?: ContextDefinition;
  label?: string;
  description?: string;
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
 * Character Type
 */
export interface Character {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "Character";
  };
  label: string;
  illustration?: Illustration;
}

/**
 * Choice Type
 */
export interface Choice {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "Choice";
  };
  description?: string;
  choose?: number;
  ofType?: string;
  from?: OptionSet;
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
  type: {
    "@id": "Class";
  };
  label: string;
  description?: string;
  hitDie: number;
  levels?: Level[];
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
  description?: string;
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
  type: {
    "@id": "Condition";
  };
  label: string;
  description?: string;
}

/**
 * EquipmentOption Type
 */
export interface EquipmentOption {
  "@id"?: string;
  "@context"?: ContextDefinition;
  count?: number;
  equipment?: Equipment;
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
  type: {
    "@id": "DamageType";
  };
  label: string;
  description?: string;
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
  value?: number;
  successType?: string;
}

/**
 * Equipment Type
 */
export interface Equipment {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "Equipment";
  };
  label: string;
  description?: string;
  equipmentCategory?: EquipmentCategory;
  cost?: Cost;
  weapon?: Weapon;
  armor?: Armor;
  gear?: Gear;
  equipmentPack?: EquipmentPack;
  magicItem?: MagicItem;
}

/**
 * EquipmentCategory Type
 */
export interface EquipmentCategory {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "EquipmentCategory";
  };
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
  contents?: EquipmentPackContent[];
}

/**
 * EquipmentPackContent Type
 */
export interface EquipmentPackContent {
  "@id"?: string;
  "@context"?: ContextDefinition;
  quantity?: number;
  item?: Equipment;
}

/**
 * Feature Type
 */
export interface Feature {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "Feature";
  };
  label: string;
  description?: string;
  level?: number;
  class?: Class;
  subclass?: Subclass;
  parent?: Feature;
  featurePrerequisites?: FeaturePrerequisite[];
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
  gearCategory?: EquipmentCategory;
  weight?: number;
}

/**
 * IdealOption Type
 */
export interface IdealOption {
  "@id"?: string;
  "@context"?: ContextDefinition;
  description?: string;
  alignments?: Alignment[];
}

/**
 * Illustration Type
 */
export interface Illustration {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "Illustration";
  };
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
  type: {
    "@id": "Language";
  };
  label: string;
  languageType?: string;
  script?: string;
  description?: string;
  typicalSpeakers?: string[];
}

/**
 * Level Type
 */
export interface Level {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "Level";
  };
  level: number;
  abilityScoreBonuses?: number;
  proficiencyBonus?: number;
  features?: Feature[];
  levelSpellcasting?: LevelSpellcasting;
  classSpecific?: ClassSpecific;
  subclassSpecific?: SubclassSpecific;
}

/**
 * LevelSpellcasting Type
 */
export interface LevelSpellcasting {
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
 * MagicItem Type
 */
export interface MagicItem {
  "@id"?: string;
  "@context"?: ContextDefinition;
  rarity?: string;
  magicItemVariants?: MagicItem[];
  magicItemVariant?: boolean;
}

/**
 * MagicSchool Type
 */
export interface MagicSchool {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "MagicSchool";
  };
  label: string;
  description?: string;
  illustration?: Illustration;
}

/**
 * Monster Type
 */
export interface Monster {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "Monster";
  };
  label: string;
  description?: string;
  monsterAbilities?: MonsterAbility[];
  size?: string;
  ofType?: string;
  subtype?: string;
  alignmentDescription?: string;
  monsterArmorClass?: MonsterArmorClass[];
  hitPoints?: number;
  hitDice?: string;
  hitPointsRoll?: string;
  monsterActions?: MonsterAction[];
  legendaryActions?: MonsterAction[];
  challengeRating?: number;
  proficiencyBonus?: number;
  conditionImmunities?: Condition[];
  damageImmunities?: string[];
  damageResistances?: string[];
  damageVulnerabilities?: string[];
  forms?: Monster[];
  monsterLanguages?: string;
  monsterSavingThrows?: MonsterProficiency[];
  monsterSkills?: MonsterProficiency[];
  reactions?: MonsterAction[];
  senses?: MonsterSense;
  specialAbilities?: MonsterSpecialAbility[];
  monsterSpeed?: MonsterSpeed;
  xp?: number;
  illustration?: Illustration;
}

/**
 * MonsterAbility Type
 */
export interface MonsterAbility {
  "@id"?: string;
  "@context"?: ContextDefinition;
  abilityScore?: AbilityScore;
  value: number;
}

/**
 * MonsterAction Type
 */
export interface MonsterAction {
  "@id"?: string;
  "@context"?: ContextDefinition;
  label?: string;
  description?: string;
  actionOptions?: Choice;
  monsterMultiAttackActions?: MonsterMultiAttackAction[];
  monsterActionOptions?: Choice;
  multiattackType?: string;
  attackBonus?: number;
  difficultyClass?: DifficultyClass;
  monsterAttacks?: MonsterAttack[];
  damages?: Damage[];
}

/**
 * MonsterArmorClass Type
 */
export interface MonsterArmorClass {
  "@id"?: string;
  "@context"?: ContextDefinition;
  ofType?: string;
  value?: number;
  description?: string;
  armorList?: Armor[];
  spell?: Spell;
  condition?: Condition;
}

/**
 * MonsterAttack Type
 */
export interface MonsterAttack {
  "@id"?: string;
  "@context"?: ContextDefinition;
  label?: string;
  difficultyClass?: DifficultyClass;
  damage?: Damage;
}

/**
 * MonsterMultiAttackAction Type
 */
export interface MonsterMultiAttackAction {
  "@id"?: string;
  "@context"?: ContextDefinition;
  label?: string;
  count?: number;
  ofType?: string;
}

/**
 * MonsterProficiency Type
 */
export interface MonsterProficiency {
  "@id"?: string;
  "@context"?: ContextDefinition;
  value?: number;
  proficiency: Proficiency;
}

/**
 * MonsterSense Type
 */
export interface MonsterSense {
  "@id"?: string;
  "@context"?: ContextDefinition;
  passivePerception?: number;
  blindsight?: string;
  darkvision?: string;
  tremorsense?: string;
  truesight?: string;
}

/**
 * MonsterSpecialAbility Type
 */
export interface MonsterSpecialAbility {
  "@id"?: string;
  "@context"?: ContextDefinition;
  label?: string;
  description?: string;
  attackBonus?: number;
  damage?: Damage;
  difficultyClass?: DifficultyClass;
  monsterSpellcasting?: MonsterSpellcasting;
  monsterUsage?: MonsterUsage;
}

/**
 * MonsterSpeed Type
 */
export interface MonsterSpeed {
  "@id"?: string;
  "@context"?: ContextDefinition;
  walk?: string;
  burrow?: string;
  climb?: string;
  fly?: string;
  swim?: string;
}

/**
 * MonsterSpell Type
 */
export interface MonsterSpell {
  "@id"?: string;
  "@context"?: ContextDefinition;
  label?: string;
  level?: number;
  spell?: Spell;
  monsterSpellUsage?: MonsterUsage;
}

/**
 * MonsterSpellcasting Type
 */
export interface MonsterSpellcasting {
  "@id"?: string;
  "@context"?: ContextDefinition;
  abilityScore?: AbilityScore;
  dcValue?: number;
  modifier?: number;
  componentsRequired?: string[];
  spellcastingSchool?: string;
  spellcastingSlots?: MonsterSpellLevelSlots[];
  monsterSpells?: MonsterSpell[];
}

/**
 * MonsterSpellLevelSlots Type
 */
export interface MonsterSpellLevelSlots {
  "@id"?: string;
  "@context"?: ContextDefinition;
  level?: number;
  slots?: number;
}

/**
 * MonsterUsage Type
 */
export interface MonsterUsage {
  "@id"?: string;
  "@context"?: ContextDefinition;
  ofType: string;
  restTypes?: string[];
  times?: number;
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
  actionOptions?: ActionOption[];
  choiceOptions?: ChoiceOption[];
  equipmentOptions?: EquipmentOption[];
  referenceOptions?: ReferenceOption[];
}

/**
 * OptionAction Type
 */
export interface OptionAction {
  "@id"?: string;
  "@context"?: ContextDefinition;
}

/**
 * OptionSet Type
 */
export interface OptionSet {
  "@id"?: string;
  "@context"?: ContextDefinition;
  abilityScoreOptions?: AbilityScoreOption[];
  actionOptions?: ActionOption[];
  bonusOptions?: BonusOption[];
  breathOptions?: BreathOption[];
  choiceOptions?: ChoiceOption[];
  damageOptions?: DamageOption[];
  equipmentCategory?: EquipmentCategory;
  equipmentOptions?: EquipmentOption[];
  idealOptions?: IdealOption[];
  multipleOptions?: MultipleOption[];
  ofType?: string;
  referenceOptions?: ReferenceOption[];
  stringOptions?: StringOption[];
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
  type: {
    "@id": "Proficiency";
  };
  ofType?: string;
  label: string;
  classes?: Class[];
  races?: Race[];
  reference?: {
    "@id": string;
  };
  equipment?: Equipment;
  equipmentCategory?: EquipmentCategory;
  savingThrow?: AbilityScore;
  skill?: Skill;
}

/**
 * Race Type
 */
export interface Race {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "Race";
  };
  label: string;
  description?: string;
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
 * Rule Type
 */
export interface Rule {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "Rule";
  };
  label: string;
  description?: string;
  ruleSections?: RuleSection[];
}

/**
 * RuleSection Type
 */
export interface RuleSection {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "RuleSection";
  };
  label: string;
  description?: string;
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
 * SolidProfile Type
 */
export interface SolidProfile {
  "@id"?: string;
  "@context"?: ContextDefinition;
  name?: string;
  preferencesFile?: {
    "@id": string;
  };
  storage?: {
    "@id": string;
  };
  defaultStorage?: Storage;
  storages?: Storage[];
  defaultCharacter?: Character;
}

/**
 * Skill Type
 */
export interface Skill {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "Skill";
  };
  label: string;
  description?: string;
  abilityScore: AbilityScore;
}

/**
 * Spell Type
 */
export interface Spell {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "Spell";
  };
  label: string;
  description?: string;
  higherLevel: string;
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
  illustration?: Illustration;
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
 * Storage Type
 */
export interface Storage {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "Storage";
  };
  label?: string;
  container?: {
    "@id": string;
  };
}

/**
 * StringOption Type
 */
export interface StringOption {
  "@id"?: string;
  "@context"?: ContextDefinition;
  string?: string;
}

/**
 * Subclass Type
 */
export interface Subclass {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "Subclass";
  };
  label: string;
  description?: string;
  class: Class;
  subclassFlavor?: string;
  levels?: Level[];
  subclassSpells?: SubclassSpell[];
  illustration?: Illustration;
}

/**
 * SubclassSpecific Type
 */
export interface SubclassSpecific {
  "@id"?: string;
  "@context"?: ContextDefinition;
  additionalMagicalSecretsMaxLvl?: number;
  auraRange?: number;
}

/**
 * SubclassSpell Type
 */
export interface SubclassSpell {
  "@id"?: string;
  "@context"?: ContextDefinition;
  levelPrerequisites?: Level[];
  subclassFeaturePrerequisites?: Feature[];
  spell?: Spell;
}

/**
 * Subrace Type
 */
export interface Subrace {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "Subrace";
  };
  label: string;
  description?: string;
  race: Race;
  abilityBonuses?: AbilityBonus[];
  startingProficiencies?: Proficiency[];
  languages?: Language[];
  languageOptions?: Choice;
  traits?: Trait[];
  illustration?: Illustration;
}

/**
 * Trait Type
 */
export interface Trait {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "Trait";
  };
  label: string;
  description?: string;
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
  description?: string;
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
  type: {
    "@id": "WeaponProperty";
  };
  label?: string;
  description?: string;
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
