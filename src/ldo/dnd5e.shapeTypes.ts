import { ShapeType } from "@ldo/ldo";
import { dnd5eSchema } from "./dnd5e.schema";
import { dnd5eContext } from "./dnd5e.context";
import { Alignment } from "./dnd5e.typings";

/**
 * =============================================================================
 * LDO ShapeTypes dnd5e
 * =============================================================================
 */

/**
 * Alignment ShapeType
 */
export const AlignmentShapeType: ShapeType<Alignment> = {
  schema: dnd5eSchema,
  shape: "https://ldo.js.org/shapes/dnd5e.shex#Alignment",
  context: dnd5eContext,
};
