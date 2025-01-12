import {
  DamageCharacterLevelShapeType,
  DamageShapeType,
  DamageSlotLevelShapeType,
  DamageTypeShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { createLdoDataset } from "@ldo/ldo";
import { Damage } from "../ldo/dnd5e.typings";
import { components } from "../typings/dnd5eapi";
import { apiUrlToSubjectUrl } from "../utils/dnd5e";

export function transformDamage(
  data: components["schemas"]["Damage"],
  ldoDataset = createLdoDataset(),
): Damage {
  return ldoDataset.usingType(DamageShapeType).fromJson({
    dice: data.damage_dice,
    damageType:
      data.damage_type &&
      ldoDataset
        .usingType(DamageTypeShapeType)
        .fromSubject(apiUrlToSubjectUrl(data.damage_type.url)),
  });
}

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
