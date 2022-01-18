import { DifficultyClass as DifficultyClassData } from "../download/api.types";
import { DifficultyClass } from "../sanity/schema-types";
import { getProperty } from "../manage-data";

// eslint-disable-next-line import/prefer-default-export
export function getDifficultyClass<T>(
  key: keyof T,
  value?: DifficultyClassData
): {} | Record<keyof T, DifficultyClass> {
  return value
    ? {
        [key]: {
          _type: "difficultyClass",
          ...getProperty<DifficultyClass>(
            "difficultyClassValue",
            value.dc_value
          ),
          ...getProperty<DifficultyClass>(
            "successType",
            value.success_type || value.dc_success
          ),
          ...getProperty<DifficultyClass>("description_en_US", value.desc),
        },
      }
    : {};
}
