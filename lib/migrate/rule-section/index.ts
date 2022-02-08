import { migrateData } from "../common";
import { RuleSectionData } from "../../download/api.types";
import { RuleSection } from "../../sanity/schema-types";

export default function migrateRuleSectionData(preparedDataMap) {
  return migrateData<RuleSectionData, RuleSection>(
    preparedDataMap,
    (weaponProperty) => ({
      _type: "ruleSection",
      name_en_US: weaponProperty.name,
      description_en_US: weaponProperty.desc,
    })
  );
}
