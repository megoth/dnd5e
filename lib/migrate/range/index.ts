import { Range as RangeData } from "../../download/api.types";
import { Range } from "../../sanity/schema-types";
import { getProperty } from "../../manage-data";

export default function migrateRange<T>(
  key: keyof T,
  value?: RangeData
): {} | Record<keyof T, Range> {
  return value
    ? {
        [key]: {
          _type: "range",
          normal: value.normal,
          ...getProperty<Range>("long", value.long),
        },
      }
    : {};
}