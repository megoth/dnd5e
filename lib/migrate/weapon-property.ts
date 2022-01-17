import { migrateData } from "./common";
import { WeaponPropertyData } from "../download/api.types";
import { WeaponProperty } from "../sanity/schema-types";

export default function migrateWeaponPropertyData(existingDataMap) {
  return migrateData<WeaponPropertyData, WeaponProperty>(
    existingDataMap,
    (weaponProperty) => ({
      _type: "weaponProperty",
      name_en_US: weaponProperty.name,
      description_en_US: weaponProperty.desc.join("\n\n"),
    })
  );
}
