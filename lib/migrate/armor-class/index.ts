import { ArmorClass as ArmorClassData } from "../../download/api.types";
import { ArmorClass } from "../../sanity/schema-types";
import { migrateProperty } from "../../manage-data";

export default function migrateArmorClass(
  key: string,
  value?: ArmorClassData
): Record<string, ArmorClass> {
  return value
    ? {
        [key]: {
          _type: "armorClass",
          ...migrateProperty<ArmorClass>("base", value.base),
          ...migrateProperty<ArmorClass>("dexBonus", value.dex_bonus),
          ...migrateProperty<ArmorClass>("maxBonus", value.max_bonus),
        },
      }
    : {};
}
