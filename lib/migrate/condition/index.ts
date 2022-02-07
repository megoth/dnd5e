import { migrateData } from "../common";
import { ConditionData } from "../../download/api.types";
import { Condition } from "../../sanity/schema-types";
import { migrateToMarkdown } from "../../manage-data";

export default function migrateConditionData(preparedDataMap) {
  return migrateData<ConditionData, Condition>(
    preparedDataMap,
    (condition) => ({
      _type: "condition",
      name_en_US: condition.name,
      description_en_US: migrateToMarkdown(condition.desc),
    })
  );
}
