import crypto from "crypto";
import { migrateData } from "../common";
import { FeatData } from "../../download/api.types";
import { Feat } from "../../sanity/schema-types";
import migrateAbilityPrerequisite from "../ability-prerequisite";

export default function migrateFeatData(preparedDataMap) {
  return migrateData<FeatData, Feat>(preparedDataMap, (feat) => ({
    _type: "feat",
    name_en_US: feat.name,
    prerequisites: feat.prerequisites.map((prerequisite) => ({
      _key: crypto.randomBytes(8).toString("hex"),
      ...migrateAbilityPrerequisite(preparedDataMap, prerequisite),
    })),
    description_en_US: feat.desc.join("\n\n"),
  }));
}
