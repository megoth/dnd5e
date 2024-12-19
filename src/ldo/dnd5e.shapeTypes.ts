import { ShapeType } from "@ldo/ldo";
import { dnd5eSchema } from "./dnd5e.schema";
import { dnd5eContext } from "./dnd5e.context";
import {
  AbilityScore,
  Alignment,
  Class,
  Condition,
  DamageType,
  Language,
  Proficiency,
  Race,
  Skill,
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
 * Alignment ShapeType
 */
export const AlignmentShapeType: ShapeType<Alignment> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Alignment",
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
 * Condition ShapeType
 */
export const ConditionShapeType: ShapeType<Condition> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Condition",
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
 * Language ShapeType
 */
export const LanguageShapeType: ShapeType<Language> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Language",
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
 * Skill ShapeType
 */
export const SkillShapeType: ShapeType<Skill> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Skill",
  context: dnd5eContext,
};
