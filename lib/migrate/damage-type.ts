import { migrateData } from "./common";
import { DamageTypeData } from "../download/api.types";
import { DamageType } from "../sanity/schema-types";

export default function migrateDamageTypeData(preparedDataMap) {
  return migrateData<DamageTypeData, DamageType>(
    preparedDataMap,
    (damageType) => ({
      _type: "damageType",
      name_en_US: damageType.name,
      description_en_US: damageType.desc.join("\n\n"),
    })
  );
}
