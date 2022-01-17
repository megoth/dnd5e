import migrateData from "./common";
import { AbilityScoreData } from "../download/api.types";
import { AbilityScore } from "../sanity/schema-types";

export default function migrateAbilityScoreData(
  existingData: Record<string, any>
) {
  return migrateData<AbilityScoreData, AbilityScore>(
    existingData,
    (abilityScore) => ({
      _type: "abilityScore",
      name: abilityScore.name,
      fullName_en_US: abilityScore.full_name,
      description_en_US: abilityScore.desc.join("\n\n"),
      slug: {
        _type: "slug",
        current: abilityScore.index.toString(),
      },
    })
  );
}
