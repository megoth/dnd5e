import { getReference, migrateData } from "../common";
import { RuleData } from "../../download/api.types";
import { Rule } from "../../sanity/schema-types";
import { createKeyedArray } from "../../manage-data";

export default function migrateRuleData(preparedDataMap) {
  return migrateData<RuleData, Rule>(preparedDataMap, (rule) => ({
    _type: "rule",
    name_en_US: rule.name,
    description_en_US: rule.desc,
    subsections: createKeyedArray(
      rule.subsections.map((section) =>
        getReference(preparedDataMap, section.url)
      )
    ),
  }));
}
