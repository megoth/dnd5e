import { migrateData } from "../common";
import { ConditionData } from "../../download/api.types";
import { Condition } from "../../sanity/schema-types";

export default function migrateConditionData(preparedDataMap) {
  return migrateData<ConditionData, Condition>(
    preparedDataMap,
    (condition) => ({
      _type: "condition",
      name_en_US: condition.name,
      description_en_US: condition.desc.join("\n\n"),
    })
  );
}
