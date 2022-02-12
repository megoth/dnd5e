import { DifficultyClass as DifficultyClassData } from "../../download/api.types";
import { DifficultyClass } from "../../sanity/schema-types";
import { migrateProperty } from "../../manage-data";

export function migrateDifficultyClassValue(
  value: DifficultyClassData
): DifficultyClass {
  return {
    _type: "difficultyClass",
    ...migrateProperty<DifficultyClass>("difficultyClassValue", value.dc_value),
    ...migrateProperty<DifficultyClass>(
      "successType",
      value.success_type || value.dc_success
    ),
    ...migrateProperty<DifficultyClass>("description_en_US", value.desc),
  };
}

export default function migrateDifficultyClass<T>(
  key: keyof T,
  value?: DifficultyClassData
): Record<string, DifficultyClass> {
  return value ? { [key]: migrateDifficultyClassValue(value) } : {};
}
