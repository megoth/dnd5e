import { ShapeType } from "@ldo/ldo";
import { dnd5eSchema } from "./dnd5e.schema";
import { dnd5eContext } from "./dnd5e.context";
import {
  AbilityBonus,
  AbilityScore,
  AbilityScoreOption,
  ActionOption,
  Alignment,
  AreaOfEffect,
  Armor,
  ArmorClass,
  Background,
  BackgroundFeature,
  BonusOption,
  BreathOption,
  Character,
  Choice,
  ChoiceOption,
  Class,
  ClassSpecific,
  ClassSpellcasting,
  ClassSpellcastingInfo,
  ClassSpecificCreatingSpellSlots,
  Condition,
  EquipmentOption,
  Cost,
  Damage,
  DamageCharacterLevel,
  DamageOption,
  DamageSlotLevel,
  DamageType,
  Dice,
  DifficultyClass,
  Equipment,
  EquipmentCategory,
  EquipmentPack,
  EquipmentPackContent,
  Feature,
  FeaturePrerequisite,
  FeatureSpecific,
  Gear,
  IdealOption,
  Illustration,
  Language,
  Level,
  LevelSpellcasting,
  MagicItem,
  MagicSchool,
  Monster,
  MonsterAbility,
  MonsterAction,
  MonsterArmorClass,
  MonsterAttack,
  MonsterMultiAttackAction,
  MonsterProficiency,
  MonsterSense,
  MonsterSpecialAbility,
  MonsterSpeed,
  MonsterSpell,
  MonsterSpellcasting,
  MonsterSpellLevelSlots,
  MonsterUsage,
  Multiclassing,
  MultipleOption,
  OptionAction,
  OptionSet,
  Prerequisite,
  Proficiency,
  Race,
  ReferenceOption,
  Rule,
  RuleSection,
  ScorePrerequisiteOption,
  SolidProfile,
  Skill,
  Spell,
  SpellDamage,
  StartingEquipment,
  Storage,
  StringOption,
  Subclass,
  SubclassSpecific,
  SubclassSpell,
  Subrace,
  Trait,
  TraitSpecific,
  TraitSpecificBreathWeapon,
  TraitSpecificBreathWeaponDamage,
  TraitSpecificUsage,
  Weapon,
  WeaponProperty,
  WeaponRange,
} from "./dnd5e.typings";

/**
 * =============================================================================
 * LDO ShapeTypes dnd5e
 * =============================================================================
 */

/**
 * AbilityBonus ShapeType
 */
export const AbilityBonusShapeType: ShapeType<AbilityBonus> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#AbilityBonus",
  context: dnd5eContext,
};

/**
 * AbilityScore ShapeType
 */
export const AbilityScoreShapeType: ShapeType<AbilityScore> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#AbilityScore",
  context: dnd5eContext,
};

/**
 * AbilityScoreOption ShapeType
 */
export const AbilityScoreOptionShapeType: ShapeType<AbilityScoreOption> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#AbilityScoreOption",
  context: dnd5eContext,
};

/**
 * ActionOption ShapeType
 */
export const ActionOptionShapeType: ShapeType<ActionOption> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#ActionOption",
  context: dnd5eContext,
};

/**
 * Alignment ShapeType
 */
export const AlignmentShapeType: ShapeType<Alignment> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Alignment",
  context: dnd5eContext,
};

/**
 * AreaOfEffect ShapeType
 */
export const AreaOfEffectShapeType: ShapeType<AreaOfEffect> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#AreaOfEffect",
  context: dnd5eContext,
};

/**
 * Armor ShapeType
 */
export const ArmorShapeType: ShapeType<Armor> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Armor",
  context: dnd5eContext,
};

/**
 * ArmorClass ShapeType
 */
export const ArmorClassShapeType: ShapeType<ArmorClass> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#ArmorClass",
  context: dnd5eContext,
};

/**
 * Background ShapeType
 */
export const BackgroundShapeType: ShapeType<Background> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Background",
  context: dnd5eContext,
};

/**
 * BackgroundFeature ShapeType
 */
export const BackgroundFeatureShapeType: ShapeType<BackgroundFeature> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#BackgroundFeature",
  context: dnd5eContext,
};

/**
 * BonusOption ShapeType
 */
export const BonusOptionShapeType: ShapeType<BonusOption> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#BonusOption",
  context: dnd5eContext,
};

/**
 * BreathOption ShapeType
 */
export const BreathOptionShapeType: ShapeType<BreathOption> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#BreathOption",
  context: dnd5eContext,
};

/**
 * Character ShapeType
 */
export const CharacterShapeType: ShapeType<Character> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Character",
  context: dnd5eContext,
};

/**
 * Choice ShapeType
 */
export const ChoiceShapeType: ShapeType<Choice> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Choice",
  context: dnd5eContext,
};

/**
 * ChoiceOption ShapeType
 */
export const ChoiceOptionShapeType: ShapeType<ChoiceOption> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#ChoiceOption",
  context: dnd5eContext,
};

/**
 * Class ShapeType
 */
export const ClassShapeType: ShapeType<Class> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Class",
  context: dnd5eContext,
};

/**
 * ClassSpecific ShapeType
 */
export const ClassSpecificShapeType: ShapeType<ClassSpecific> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#ClassSpecific",
  context: dnd5eContext,
};

/**
 * ClassSpellcasting ShapeType
 */
export const ClassSpellcastingShapeType: ShapeType<ClassSpellcasting> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#ClassSpellcasting",
  context: dnd5eContext,
};

/**
 * ClassSpellcastingInfo ShapeType
 */
export const ClassSpellcastingInfoShapeType: ShapeType<ClassSpellcastingInfo> =
  {
    schema: dnd5eSchema,
    shape: "https://ldo.js.org/shapes/dnd5e.shex#ClassSpellcastingInfo",
    context: dnd5eContext,
  };

/**
 * ClassSpecificCreatingSpellSlots ShapeType
 */
export const ClassSpecificCreatingSpellSlotsShapeType: ShapeType<ClassSpecificCreatingSpellSlots> =
  {
    schema: dnd5eSchema,
    shape:
      "https://ldo.js.org/shapes/dnd5e.shex#ClassSpecificCreatingSpellSlots",
    context: dnd5eContext,
  };

/**
 * Condition ShapeType
 */
export const ConditionShapeType: ShapeType<Condition> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Condition",
  context: dnd5eContext,
};

/**
 * EquipmentOption ShapeType
 */
export const EquipmentOptionShapeType: ShapeType<EquipmentOption> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#EquipmentOption",
  context: dnd5eContext,
};

/**
 * Cost ShapeType
 */
export const CostShapeType: ShapeType<Cost> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Cost",
  context: dnd5eContext,
};

/**
 * Damage ShapeType
 */
export const DamageShapeType: ShapeType<Damage> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Damage",
  context: dnd5eContext,
};

/**
 * DamageCharacterLevel ShapeType
 */
export const DamageCharacterLevelShapeType: ShapeType<DamageCharacterLevel> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#DamageCharacterLevel",
  context: dnd5eContext,
};

/**
 * DamageOption ShapeType
 */
export const DamageOptionShapeType: ShapeType<DamageOption> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#DamageOption",
  context: dnd5eContext,
};

/**
 * DamageSlotLevel ShapeType
 */
export const DamageSlotLevelShapeType: ShapeType<DamageSlotLevel> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#DamageSlotLevel",
  context: dnd5eContext,
};

/**
 * DamageType ShapeType
 */
export const DamageTypeShapeType: ShapeType<DamageType> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#DamageType",
  context: dnd5eContext,
};

/**
 * Dice ShapeType
 */
export const DiceShapeType: ShapeType<Dice> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Dice",
  context: dnd5eContext,
};

/**
 * DifficultyClass ShapeType
 */
export const DifficultyClassShapeType: ShapeType<DifficultyClass> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#DifficultyClass",
  context: dnd5eContext,
};

/**
 * Equipment ShapeType
 */
export const EquipmentShapeType: ShapeType<Equipment> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Equipment",
  context: dnd5eContext,
};

/**
 * EquipmentCategory ShapeType
 */
export const EquipmentCategoryShapeType: ShapeType<EquipmentCategory> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#EquipmentCategory",
  context: dnd5eContext,
};

/**
 * EquipmentPack ShapeType
 */
export const EquipmentPackShapeType: ShapeType<EquipmentPack> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#EquipmentPack",
  context: dnd5eContext,
};

/**
 * EquipmentPackContent ShapeType
 */
export const EquipmentPackContentShapeType: ShapeType<EquipmentPackContent> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#EquipmentPackContent",
  context: dnd5eContext,
};

/**
 * Feature ShapeType
 */
export const FeatureShapeType: ShapeType<Feature> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Feature",
  context: dnd5eContext,
};

/**
 * FeaturePrerequisite ShapeType
 */
export const FeaturePrerequisiteShapeType: ShapeType<FeaturePrerequisite> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#FeaturePrerequisite",
  context: dnd5eContext,
};

/**
 * FeatureSpecific ShapeType
 */
export const FeatureSpecificShapeType: ShapeType<FeatureSpecific> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#FeatureSpecific",
  context: dnd5eContext,
};

/**
 * Gear ShapeType
 */
export const GearShapeType: ShapeType<Gear> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Gear",
  context: dnd5eContext,
};

/**
 * IdealOption ShapeType
 */
export const IdealOptionShapeType: ShapeType<IdealOption> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#IdealOption",
  context: dnd5eContext,
};

/**
 * Illustration ShapeType
 */
export const IllustrationShapeType: ShapeType<Illustration> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Illustration",
  context: dnd5eContext,
};

/**
 * Language ShapeType
 */
export const LanguageShapeType: ShapeType<Language> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Language",
  context: dnd5eContext,
};

/**
 * Level ShapeType
 */
export const LevelShapeType: ShapeType<Level> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Level",
  context: dnd5eContext,
};

/**
 * LevelSpellcasting ShapeType
 */
export const LevelSpellcastingShapeType: ShapeType<LevelSpellcasting> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#LevelSpellcasting",
  context: dnd5eContext,
};

/**
 * MagicItem ShapeType
 */
export const MagicItemShapeType: ShapeType<MagicItem> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#MagicItem",
  context: dnd5eContext,
};

/**
 * MagicSchool ShapeType
 */
export const MagicSchoolShapeType: ShapeType<MagicSchool> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#MagicSchool",
  context: dnd5eContext,
};

/**
 * Monster ShapeType
 */
export const MonsterShapeType: ShapeType<Monster> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Monster",
  context: dnd5eContext,
};

/**
 * MonsterAbility ShapeType
 */
export const MonsterAbilityShapeType: ShapeType<MonsterAbility> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#MonsterAbility",
  context: dnd5eContext,
};

/**
 * MonsterAction ShapeType
 */
export const MonsterActionShapeType: ShapeType<MonsterAction> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#MonsterAction",
  context: dnd5eContext,
};

/**
 * MonsterArmorClass ShapeType
 */
export const MonsterArmorClassShapeType: ShapeType<MonsterArmorClass> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#MonsterArmorClass",
  context: dnd5eContext,
};

/**
 * MonsterAttack ShapeType
 */
export const MonsterAttackShapeType: ShapeType<MonsterAttack> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#MonsterAttack",
  context: dnd5eContext,
};

/**
 * MonsterMultiAttackAction ShapeType
 */
export const MonsterMultiAttackActionShapeType: ShapeType<MonsterMultiAttackAction> =
  {
    schema: dnd5eSchema,
    shape: "https://ldo.js.org/shapes/dnd5e.shex#MonsterMultiAttackAction",
    context: dnd5eContext,
  };

/**
 * MonsterProficiency ShapeType
 */
export const MonsterProficiencyShapeType: ShapeType<MonsterProficiency> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#MonsterProficiency",
  context: dnd5eContext,
};

/**
 * MonsterSense ShapeType
 */
export const MonsterSenseShapeType: ShapeType<MonsterSense> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#MonsterSense",
  context: dnd5eContext,
};

/**
 * MonsterSpecialAbility ShapeType
 */
export const MonsterSpecialAbilityShapeType: ShapeType<MonsterSpecialAbility> =
  {
    schema: dnd5eSchema,
    shape: "https://ldo.js.org/shapes/dnd5e.shex#MonsterSpecialAbility",
    context: dnd5eContext,
  };

/**
 * MonsterSpeed ShapeType
 */
export const MonsterSpeedShapeType: ShapeType<MonsterSpeed> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#MonsterSpeed",
  context: dnd5eContext,
};

/**
 * MonsterSpell ShapeType
 */
export const MonsterSpellShapeType: ShapeType<MonsterSpell> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#MonsterSpell",
  context: dnd5eContext,
};

/**
 * MonsterSpellcasting ShapeType
 */
export const MonsterSpellcastingShapeType: ShapeType<MonsterSpellcasting> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#MonsterSpellcasting",
  context: dnd5eContext,
};

/**
 * MonsterSpellLevelSlots ShapeType
 */
export const MonsterSpellLevelSlotsShapeType: ShapeType<MonsterSpellLevelSlots> =
  {
    schema: dnd5eSchema,
    shape: "https://ldo.js.org/shapes/dnd5e.shex#MonsterSpellLevelSlots",
    context: dnd5eContext,
  };

/**
 * MonsterUsage ShapeType
 */
export const MonsterUsageShapeType: ShapeType<MonsterUsage> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#MonsterUsage",
  context: dnd5eContext,
};

/**
 * Multiclassing ShapeType
 */
export const MulticlassingShapeType: ShapeType<Multiclassing> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Multiclassing",
  context: dnd5eContext,
};

/**
 * MultipleOption ShapeType
 */
export const MultipleOptionShapeType: ShapeType<MultipleOption> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#MultipleOption",
  context: dnd5eContext,
};

/**
 * OptionAction ShapeType
 */
export const OptionActionShapeType: ShapeType<OptionAction> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#OptionAction",
  context: dnd5eContext,
};

/**
 * OptionSet ShapeType
 */
export const OptionSetShapeType: ShapeType<OptionSet> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#OptionSet",
  context: dnd5eContext,
};

/**
 * Prerequisite ShapeType
 */
export const PrerequisiteShapeType: ShapeType<Prerequisite> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Prerequisite",
  context: dnd5eContext,
};

/**
 * Proficiency ShapeType
 */
export const ProficiencyShapeType: ShapeType<Proficiency> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Proficiency",
  context: dnd5eContext,
};

/**
 * Race ShapeType
 */
export const RaceShapeType: ShapeType<Race> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Race",
  context: dnd5eContext,
};

/**
 * ReferenceOption ShapeType
 */
export const ReferenceOptionShapeType: ShapeType<ReferenceOption> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#ReferenceOption",
  context: dnd5eContext,
};

/**
 * Rule ShapeType
 */
export const RuleShapeType: ShapeType<Rule> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Rule",
  context: dnd5eContext,
};

/**
 * RuleSection ShapeType
 */
export const RuleSectionShapeType: ShapeType<RuleSection> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#RuleSection",
  context: dnd5eContext,
};

/**
 * ScorePrerequisiteOption ShapeType
 */
export const ScorePrerequisiteOptionShapeType: ShapeType<ScorePrerequisiteOption> =
  {
    schema: dnd5eSchema,
    shape: "https://ldo.js.org/shapes/dnd5e.shex#ScorePrerequisiteOption",
    context: dnd5eContext,
  };

/**
 * SolidProfile ShapeType
 */
export const SolidProfileShapeType: ShapeType<SolidProfile> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#SolidProfile",
  context: dnd5eContext,
};

/**
 * Skill ShapeType
 */
export const SkillShapeType: ShapeType<Skill> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Skill",
  context: dnd5eContext,
};

/**
 * Spell ShapeType
 */
export const SpellShapeType: ShapeType<Spell> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Spell",
  context: dnd5eContext,
};

/**
 * SpellDamage ShapeType
 */
export const SpellDamageShapeType: ShapeType<SpellDamage> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#SpellDamage",
  context: dnd5eContext,
};

/**
 * StartingEquipment ShapeType
 */
export const StartingEquipmentShapeType: ShapeType<StartingEquipment> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#StartingEquipment",
  context: dnd5eContext,
};

/**
 * Storage ShapeType
 */
export const StorageShapeType: ShapeType<Storage> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Storage",
  context: dnd5eContext,
};

/**
 * StringOption ShapeType
 */
export const StringOptionShapeType: ShapeType<StringOption> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#StringOption",
  context: dnd5eContext,
};

/**
 * Subclass ShapeType
 */
export const SubclassShapeType: ShapeType<Subclass> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Subclass",
  context: dnd5eContext,
};

/**
 * SubclassSpecific ShapeType
 */
export const SubclassSpecificShapeType: ShapeType<SubclassSpecific> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#SubclassSpecific",
  context: dnd5eContext,
};

/**
 * SubclassSpell ShapeType
 */
export const SubclassSpellShapeType: ShapeType<SubclassSpell> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#SubclassSpell",
  context: dnd5eContext,
};

/**
 * Subrace ShapeType
 */
export const SubraceShapeType: ShapeType<Subrace> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Subrace",
  context: dnd5eContext,
};

/**
 * Trait ShapeType
 */
export const TraitShapeType: ShapeType<Trait> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Trait",
  context: dnd5eContext,
};

/**
 * TraitSpecific ShapeType
 */
export const TraitSpecificShapeType: ShapeType<TraitSpecific> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#TraitSpecific",
  context: dnd5eContext,
};

/**
 * TraitSpecificBreathWeapon ShapeType
 */
export const TraitSpecificBreathWeaponShapeType: ShapeType<TraitSpecificBreathWeapon> =
  {
    schema: dnd5eSchema,
    shape: "https://ldo.js.org/shapes/dnd5e.shex#TraitSpecificBreathWeapon",
    context: dnd5eContext,
  };

/**
 * TraitSpecificBreathWeaponDamage ShapeType
 */
export const TraitSpecificBreathWeaponDamageShapeType: ShapeType<TraitSpecificBreathWeaponDamage> =
  {
    schema: dnd5eSchema,
    shape:
      "https://ldo.js.org/shapes/dnd5e.shex#TraitSpecificBreathWeaponDamage",
    context: dnd5eContext,
  };

/**
 * TraitSpecificUsage ShapeType
 */
export const TraitSpecificUsageShapeType: ShapeType<TraitSpecificUsage> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#TraitSpecificUsage",
  context: dnd5eContext,
};

/**
 * Weapon ShapeType
 */
export const WeaponShapeType: ShapeType<Weapon> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Weapon",
  context: dnd5eContext,
};

/**
 * WeaponProperty ShapeType
 */
export const WeaponPropertyShapeType: ShapeType<WeaponProperty> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#WeaponProperty",
  context: dnd5eContext,
};

/**
 * WeaponRange ShapeType
 */
export const WeaponRangeShapeType: ShapeType<WeaponRange> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#WeaponRange",
  context: dnd5eContext,
};
