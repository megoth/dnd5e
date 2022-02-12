import { ActionReferenceData, ChoiceData } from "../../download/api.types";
import { ActionOptions } from "../../sanity/schema-types";
import { migrateActionOptionValue } from "../action-option";
import { createKeyedArray } from "../../manage-data";

export function migrateActionOptionsValue(
  value: ChoiceData<ActionReferenceData | Array<ActionReferenceData>>
): ActionOptions {
  return {
    _type: "actionOptions",
    choose: value.choose,
    from: createKeyedArray(
      value.from.map((option) => migrateActionOptionValue(option))
    ),
  };
}

export default function migrateActionOptions<T>(
  key: keyof T,
  value?: ChoiceData<ActionReferenceData | Array<ActionReferenceData>>
): Record<string, ActionOptions> {
  return value ? { [key]: migrateActionOptionsValue(value) } : {};
}
