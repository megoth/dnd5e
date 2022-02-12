import {
  DamageData,
  MonsterDamage,
  SpellDamageByCharacterLevel,
  SpellDamageBySlotLevel,
  WeaponDamage,
} from "../../download/api.types";
import { Damage } from "../../sanity/schema-types";
import { migrateProperty } from "../../manage-data";
import { getReference, PreparedDocument } from "../common";
import migrateDamageAtCharacterLevels from "../damage-at-character-level";
import migrateDamageAtSlotLevels from "../damage-at-slot-level";
import migrateDifficultyClass from "../difficulty-class";

export function migrateDamageValue(preparedDataMap, value: DamageData): Damage {
  return {
    _type: "damage",
    ...migrateProperty<Damage>(
      "damageType",
      value.damage_type
        ? getReference(preparedDataMap, value.damage_type.url)
        : null
    ),
    ...migrateProperty<Damage>(
      "damageDice",
      (value as WeaponDamage).damage_dice
    ),
    ...migrateDifficultyClass<Damage>("dc", (value as MonsterDamage).dc),
    ...migrateDamageAtCharacterLevels<Damage>(
      "damageAtCharacterLevel",
      (value as SpellDamageByCharacterLevel).damage_at_character_level
    ),
    ...migrateDamageAtSlotLevels<Damage>(
      "damageAtSlotLevel",
      (value as SpellDamageBySlotLevel).damage_at_slot_level
    ),
  };
}

export default function migrateDamage<T>(
  preparedDataMap: Record<string, PreparedDocument>,
  key: keyof T,
  value?: DamageData
): Record<string, Damage> {
  return value ? { [key]: migrateDamageValue(preparedDataMap, value) } : {};
}
