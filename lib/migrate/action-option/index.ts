import { ActionReferenceData } from "../../download/api.types";
import { ActionOption } from "../../sanity/schema-types";
import { createKeyedArray } from "../../manage-data";
import { migrateActionReferenceValue } from "../action-reference";

export function migrateActionOptionItem(
  value: ActionReferenceData
): ActionOption {
  return {
    _type: "actionOption",
    attacks: createKeyedArray([migrateActionReferenceValue(value)]),
  };
}

export function migrateActionOptionAsArray(
  value: Array<ActionReferenceData>
): ActionOption {
  return {
    _type: "actionOption",
    attacks: createKeyedArray(
      value.map((val) => migrateActionReferenceValue(val))
    ),
  };
}

export function migrateActionOptionValue(
  value: ActionReferenceData | Array<ActionReferenceData>
): ActionOption {
  return "length" in value
    ? migrateActionOptionAsArray(value as Array<ActionReferenceData>)
    : migrateActionOptionItem(value as ActionReferenceData);
}
