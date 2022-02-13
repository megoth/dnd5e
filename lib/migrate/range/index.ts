import { RangeData } from "../../download/api.types";
import { Range } from "../../sanity/schema-types";
import { migrateOptional } from "../../manage-data";

export default function migrateRange(value: RangeData): Range {
  return {
    _type: "range",
    normal: value.normal,
    ...migrateOptional<Range>("long", value.long),
  };
}
