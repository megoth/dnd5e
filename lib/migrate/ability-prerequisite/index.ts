import { getReference } from "../common";
import { AbilityPrerequisite as AbilityPrerequisiteData } from "../../download/api.types";
import { AbilityPrerequisite } from "../../sanity/schema-types";

export default function migrateAbilityPrerequisite(
  preparedDataMap,
  value: AbilityPrerequisiteData
): AbilityPrerequisite {
  return {
    _type: "abilityPrerequisite",
    abilityScore: getReference(preparedDataMap, value.ability_score.url),
    minimumScore: value.minimum_score,
  };
}
