import { migrateData } from "../common";
import { FeatData } from "../../download/api.types";
import { Feat } from "../../sanity/schema-types";
import migrateAbilityPrerequisite from "../ability-prerequisite";
import { createKeyedArray, migrateToMarkdown } from "../../manage-data";

export default function migrateFeatData(preparedDataMap) {
  return migrateData<FeatData, Feat>(preparedDataMap, (feat) => ({
    _type: "feat",
    name_en_US: feat.name,
    prerequisites: createKeyedArray(
      feat.prerequisites.map((prerequisite) =>
        migrateAbilityPrerequisite(prerequisite, preparedDataMap)
      )
    ),
    description_en_US: migrateToMarkdown(feat.desc),
  }));
}
