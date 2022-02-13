import { ActionReferenceData, ChoiceData } from "../../download/api.types";
import { ActionOptions } from "../../sanity/schema-types";
import migrateActionOption from "../action-option";
import { createKeyedArray } from "../../manage-data";

export default function migrateActionOptions(
  value: ChoiceData<ActionReferenceData | Array<ActionReferenceData>>
): ActionOptions {
  return {
    _type: "actionOptions",
    choose: value.choose,
    from: createKeyedArray(value.from.map(migrateActionOption)),
  };
}
