import { Damage as DamageData, WeaponDamage } from "../../download/api.types";
import { Damage } from "../../sanity/schema-types";
import { getProperty } from "../../manage-data";
import { getReference, PreparedDocument } from "../common";

function migrateObject(preparedDataMap, value: DamageData): Damage {
  return {
    _type: "damage",
    damageType: getReference(preparedDataMap, value.damage_type.url),
    ...getProperty<Damage>("damageDice", (value as WeaponDamage).damage_dice),
  };
}

export default function migrateDamage<T>(
  preparedDataMap: Record<string, PreparedDocument>,
  key: keyof T,
  value?: DamageData
): Record<string, Damage> {
  return value ? { [key]: migrateObject(preparedDataMap, value) } : {};
}
