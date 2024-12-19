import { ShapeType } from "@ldo/ldo";
import { dnd5eSchema } from "./dnd5e.schema";
import { dnd5eContext } from "./dnd5e.context";
import { AbilityScore, Alignment, Skill } from "./dnd5e.typings";

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
 * Skill ShapeType
 */
export const SkillShapeType: ShapeType<Skill> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Skill",
  context: dnd5eContext,
};
