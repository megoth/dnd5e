import { ActionReferenceData } from "../../download/api.types";
import { ActionOption, ActionReference } from "../../sanity/schema-types";
import { createKeyedArray } from "../../manage-data";
import migrateActionReference from "../action-reference";

function migrateActionOptionAsItem(
  value: ActionReferenceData
): Array<ActionReference> {
  return [migrateActionReference(value)];
}

function migrateActionOptionAsArray(
  value: Array<ActionReferenceData>
): Array<ActionReference> {
  return value.map(migrateActionReference);
}

export default function migrateActionOption(
  value: ActionReferenceData | Array<ActionReferenceData>
): ActionOption {
  return {
    _type: "actionOption",
    attacks: createKeyedArray(
      "length" in value
        ? migrateActionOptionAsArray(value)
        : migrateActionOptionAsItem(value)
    ),
  };
}
