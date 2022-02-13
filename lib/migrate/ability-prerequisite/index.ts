import { getReference } from "../common";
import { AbilityPrerequisite } from "../../sanity/schema-types";
import { AbilityPrerequisiteData } from "../../download/api.types";

export default function migrateAbilityPrerequisite(
  value: AbilityPrerequisiteData,
  preparedDataMap
): AbilityPrerequisite {
  return {
    _type: "abilityPrerequisite",
    abilityScore: getReference(preparedDataMap, value.ability_score.url),
    minimumScore: value.minimum_score,
  };
}
