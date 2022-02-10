import { Range as RangeData } from "../../download/api.types";
import { Range } from "../../sanity/schema-types";
import { getProperty } from "../../manage-data";

function migrateObject(value: RangeData): Range {
  return {
    _type: "range",
    normal: value.normal,
    ...getProperty<Range>("long", value.long),
  };
}

export default function migrateRange<T>(
  key: keyof T,
  value?: RangeData
): Record<string, Range> {
  return value ? { [key]: migrateObject(value) } : {};
}
