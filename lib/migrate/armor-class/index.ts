import { ArmorClassData } from "../../download/api.types";
import { ArmorClass } from "../../sanity/schema-types";
import { migrateOptional } from "../../manage-data";

export default function migrateArmorClass(value: ArmorClassData): ArmorClass {
  return {
    _type: "armorClass",
    ...migrateOptional<ArmorClass>("base", value.base),
    ...migrateOptional<ArmorClass>("dexBonus", value.dex_bonus),
    ...migrateOptional<ArmorClass>("maxBonus", value.max_bonus),
  };
}
