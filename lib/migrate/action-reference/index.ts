import { ActionReferenceData } from "../../download/api.types";
import { ActionReference } from "../../sanity/schema-types";
import { migrateOptional } from "../../manage-data";

export default function migrateActionReference(
  value: ActionReferenceData
): ActionReference {
  return {
    _type: "actionReference",
    name_en_US: value.name,
    count: value.count.toString(),
    ...migrateOptional<ActionReference>("notes_en_US", value.notes),
    type: value.type,
  };
}
