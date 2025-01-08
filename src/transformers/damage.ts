import {
  DamageCharacterLevelShapeType,
  DamageSlotLevelShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { createLdoDataset } from "@ldo/ldo";

export interface IDamageAtSlotLevel {
  damage_at_slot_level: Record<string, string>;
}

export function transformDamageAtSlotLevel(
  data: IDamageAtSlotLevel,
  ldoDataset = createLdoDataset(),
) {
  return {
    damageAtSlotLevel: Object.entries(data["damage_at_slot_level"]).map(
      ([slot, damageDice]: [string, string]) =>
        ldoDataset.usingType(DamageSlotLevelShapeType).fromJson({
          slot: parseInt(slot, 10),
          damageDice,
        }),
    ),
  };
}

export interface IDamageAtCharacterLevel {
  damage_at_character_level: Record<string, string>;
}

export function transformDamageAtCharacterLevel(
  data: IDamageAtCharacterLevel,
  ldoDataset = createLdoDataset(),
) {
  return {
    damageAtCharacterLevel: Object.entries(
      data["damage_at_character_level"],
    ).map(([level, damageDice]: [string, string]) =>
      ldoDataset.usingType(DamageCharacterLevelShapeType).fromJson({
        level: parseInt(level, 10),
        damageDice,
      }),
    ),
  };
}
