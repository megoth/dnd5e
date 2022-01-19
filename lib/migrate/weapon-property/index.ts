import { migrateData } from "../common";
import { WeaponPropertyData } from "../../download/api.types";
import { WeaponProperty } from "../../sanity/schema-types";

export default function migrateWeaponPropertyData(preparedDataMap) {
  return migrateData<WeaponPropertyData, WeaponProperty>(
    preparedDataMap,
    (weaponProperty) => ({
      _type: "weaponProperty",
      name_en_US: weaponProperty.name,
      description_en_US: weaponProperty.desc.join("\n\n"),
    })
  );
}
