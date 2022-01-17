import { migrateData } from "./common";
import { DamageTypeData } from "../download/api.types";
import { DamageType } from "../sanity/schema-types";

export default function migrateDamageTypeData(existingDataMap) {
  return migrateData<DamageTypeData, DamageType>(
    existingDataMap,
    (damageType) => ({
      _type: "damageType",
      name_en_US: damageType.name,
      description_en_US: damageType.desc.join("\n\n"),
    })
  );
}
