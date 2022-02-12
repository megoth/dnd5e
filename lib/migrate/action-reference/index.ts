import { ActionReferenceData } from "../../download/api.types";
import { ActionReference } from "../../sanity/schema-types";
import { migrateProperty } from "../../manage-data";

// eslint-disable-next-line import/prefer-default-export
export function migrateActionReferenceValue(
  value: ActionReferenceData
): ActionReference {
  return {
    _type: "actionReference",
    name_en_US: value.name,
    count: value.count.toString(),
    ...migrateProperty<ActionReference>("notes_en_US", value.notes),
    type: value.type,
  };
}
