import { DifficultyClassData } from "../../download/api.types";
import { DifficultyClass } from "../../sanity/schema-types";
import { migrateOptional } from "../../manage-data";
import { getReference } from "../common";

export default function migrateDifficultyClass(
  value: DifficultyClassData,
  preparedDataMap
): DifficultyClass {
  return {
    _type: "difficultyClass",
    ...migrateOptional<DifficultyClass>(
      "difficultyClassType",
      getReference(preparedDataMap, value.dc_type.url)
    ),
    ...migrateOptional<DifficultyClass>("difficultyClassValue", value.dc_value),
    ...migrateOptional<DifficultyClass>(
      "successType",
      value.success_type || value.dc_success
    ),
    ...migrateOptional<DifficultyClass>("description_en_US", value.desc),
  };
}
