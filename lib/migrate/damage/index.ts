import { SanityKeyed } from "sanity-codegen";
import {
  DamageData,
  DifficultyClassData,
  MonsterDamage,
  SpellDamageByCharacterLevel,
  SpellDamageBySlotLevel,
  WeaponDamage,
} from "../../download/api.types";
import {
  Damage,
  DamageAtCharacterLevel,
  DamageAtSlotLevel,
  DifficultyClass,
} from "../../sanity/schema-types";
import { migrateOptional } from "../../manage-data";
import { getReference } from "../common";
import migrateDamageAtCharacterLevels from "../damage-at-character-level";
import migrateDamageAtSlotLevels from "../damage-at-slot-level";
import migrateDifficultyClass from "../difficulty-class";

export default function migrateDamage(
  value: DamageData,
  preparedDataMap
): Damage {
  return {
    _type: "damage",
    ...migrateOptional<Damage>(
      "damageType",
      getReference(preparedDataMap, value.damage_type?.url)
    ),
    ...migrateOptional<Damage>(
      "damageDice",
      (value as WeaponDamage).damage_dice
    ),
    ...migrateOptional<Damage, DifficultyClassData, DifficultyClass>(
      "dc",
      (value as MonsterDamage).dc,
      (val) => migrateDifficultyClass(val, preparedDataMap)
    ),
    ...migrateOptional<
      Damage,
      Record<string, string>,
      Array<SanityKeyed<DamageAtCharacterLevel>>
    >(
      "damageAtCharacterLevel",
      (value as SpellDamageByCharacterLevel).damage_at_character_level,
      migrateDamageAtCharacterLevels
    ),
    ...migrateOptional<
      Damage,
      Record<string, string>,
      Array<SanityKeyed<DamageAtSlotLevel>>
    >(
      "damageAtSlotLevel",
      (value as SpellDamageBySlotLevel).damage_at_slot_level,
      migrateDamageAtSlotLevels
    ),
  };
}
