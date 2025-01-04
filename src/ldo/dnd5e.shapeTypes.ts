import { ShapeType } from "@ldo/ldo";
import { dnd5eSchema } from "./dnd5e.schema";
import { dnd5eContext } from "./dnd5e.context";
import {
  AbilityScore,
  AbilityScoreOption,
  ActionOption,
  Alignment,
  Background,
  BackgroundFeature,
  BonusOption,
  BreathOption,
  Choice,
  ChoiceOption,
  Class,
  ClassLevel,
  ClassLevelSpellcasting,
  ClassSpecific,
  ClassSpecificCreatingSpellSlots,
  Condition,
  CountOption,
  Damage,
  DamageOption,
  DamageType,
  Dice,
  DifficultyClass,
  Equipment,
  EquipmentCategory,
  Feature,
  FeaturePrerequisite,
  FeatureSpecific,
  IdealOption,
  Language,
  Multiclassing,
  MultipleOption,
  OptionAction,
  OptionSet,
  Prerequisite,
  Proficiency,
  Race,
  ReferenceOption,
  ResourceListOptionSet,
  ScorePrerequisiteOption,
  Skill,
  Spell,
  StartingEquipment,
  StringOption,
  Subclass,
  Type,
} from "./dnd5e.typings";

/**
 * =============================================================================
 * LDO ShapeTypes dnd5e
 * =============================================================================
 */

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
 * ClassLevel ShapeType
 */
export const ClassLevelShapeType: ShapeType<ClassLevel> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#ClassLevel",
  context: dnd5eContext,
};

/**
 * ClassLevelSpellcasting ShapeType
 */
export const ClassLevelSpellcastingShapeType: ShapeType<ClassLevelSpellcasting> =
  {
    schema: dnd5eSchema,
    shape: "https://ldo.js.org/shapes/dnd5e.shex#ClassLevelSpellcasting",
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
 * CountOption ShapeType
 */
export const CountOptionShapeType: ShapeType<CountOption> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#CountOption",
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
 * DamageOption ShapeType
 */
export const DamageOptionShapeType: ShapeType<DamageOption> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#DamageOption",
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
 * IdealOption ShapeType
 */
export const IdealOptionShapeType: ShapeType<IdealOption> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#IdealOption",
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
 * ResourceListOptionSet ShapeType
 */
export const ResourceListOptionSetShapeType: ShapeType<ResourceListOptionSet> =
  {
    schema: dnd5eSchema,
    shape: "https://ldo.js.org/shapes/dnd5e.shex#ResourceListOptionSet",
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
 * StartingEquipment ShapeType
 */
export const StartingEquipmentShapeType: ShapeType<StartingEquipment> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#StartingEquipment",
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
 * Type ShapeType
 */
export const TypeShapeType: ShapeType<Type> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Type",
  context: dnd5eContext,
};
