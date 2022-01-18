import { migrateData } from "./common";
import { EquipmentCategoryData } from "../download/api.types";
import { EquipmentCategory } from "../sanity/schema-types";

export default function migrateEquipmentCategoryData(preparedDataMap) {
  return migrateData<EquipmentCategoryData, EquipmentCategory>(
    preparedDataMap,
    (weaponProperty) => ({
      _type: "equipmentCategory",
      name_en_US: weaponProperty.name,
    })
  );
}
