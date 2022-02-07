import { migrateData } from "../common";
import { AbilityScoreData } from "../../download/api.types";
import { AbilityScore } from "../../sanity/schema-types";
import { migrateToMarkdown } from "../../manage-data";

export default function migrateAbilityScoreData(preparedDataMap) {
  return migrateData<AbilityScoreData, AbilityScore>(
    preparedDataMap,
    (abilityScore) => ({
      _type: "abilityScore",
      name: abilityScore.name,
      fullName_en_US: abilityScore.full_name,
      description_en_US: migrateToMarkdown(abilityScore.desc),
    })
  );
}
