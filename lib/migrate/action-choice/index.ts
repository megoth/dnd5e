import { ActionData, ChoiceData } from "../../download/api.types";
import { Choice } from "../choice";
import { Action } from "../../sanity/schema-types";
import { migrateActionValue } from "../action";
import { createKeyedArray } from "../../manage-data";

export function migrateActionChoiceValue(
  preparedDataMap,
  value: ChoiceData<ActionData>
): Choice<"actionChoice", Action> {
  return {
    _type: "actionChoice",
    choose: value.choose,
    from: createKeyedArray(
      value.from.map((action) => migrateActionValue(preparedDataMap, action))
    ),
  };
}

export default function migrateActionChoice<T>(
  preparedDataMap,
  key: keyof T,
  value?: ChoiceData<ActionData>
): Record<string, Choice<"actionChoice", Action>> {
  return value
    ? { [key]: migrateActionChoiceValue(preparedDataMap, value) }
    : {};
}
