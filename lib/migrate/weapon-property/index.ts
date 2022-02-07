import { migrateData } from "../common";
import { WeaponPropertyData } from "../../download/api.types";
import { WeaponProperty } from "../../sanity/schema-types";
import { migrateToMarkdown } from "../../manage-data";

export default function migrateWeaponPropertyData(preparedDataMap) {
  return migrateData<WeaponPropertyData, WeaponProperty>(
    preparedDataMap,
    (weaponProperty) => ({
      _type: "weaponProperty",
      name_en_US: weaponProperty.name,
      description_en_US: migrateToMarkdown(weaponProperty.desc),
    })
  );
}
