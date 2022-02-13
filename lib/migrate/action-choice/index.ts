import { ActionData, ChoiceData } from "../../download/api.types";
import { Choice } from "../choice";
import { Action } from "../../sanity/schema-types";
import migrateAction from "../action";
import { createKeyedArray } from "../../manage-data";

export default function migrateActionChoice(
  value: ChoiceData<ActionData>,
  preparedDataMap
): Choice<"actionChoice", Action> {
  return {
    _type: "actionChoice",
    choose: value.choose,
    from: createKeyedArray(
      value.from.map((action) => migrateAction(action, preparedDataMap))
    ),
  };
}
