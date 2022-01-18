import { ArmorClass as ArmorClassData } from "../download/api.types";
import { ArmorClass } from "../sanity/schema-types";
import { getProperty } from "../manage-data";

export default function migrateArmorClass(
  key: string,
  value?: ArmorClassData
): {} | Record<string, ArmorClass> {
  return value
    ? {
        [key]: {
          _type: "armorClass",
          ...getProperty<ArmorClass>("base", value.base),
          ...getProperty<ArmorClass>("dexBonus", value.dex_bonus),
          ...getProperty<ArmorClass>("maxBonus", value.max_bonus),
        },
      }
    : {};
}
