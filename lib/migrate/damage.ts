import { Damage as DamageData, WeaponDamage } from "../download/api.types";
import { Damage } from "../sanity/schema-types";
import { getProperty } from "../manage-data";
import { getReference, PreparedDocument } from "./common";

// eslint-disable-next-line import/prefer-default-export
export default function migrateDamage<T>(
  preparedDataMap: Record<string, PreparedDocument>,
  key: keyof T,
  value?: DamageData
): {} | Record<keyof T, Damage> {
  return value
    ? {
        [key]: {
          _type: "damage",
          damageType: getReference(preparedDataMap, value.damage_type.url),
          ...getProperty<Damage>(
            "damageDice",
            (value as WeaponDamage).damage_dice
          ),
        },
      }
    : {};
}
