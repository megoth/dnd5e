import { getReference, migrateData } from "./common";
import { SkillData } from "../download/api.types";
import { Skill } from "../sanity/schema-types";

export default function migrateSkillData(preparedDataMap) {
  return migrateData<SkillData, Skill>(preparedDataMap, (skill) => ({
    _type: "skill",
    name_en_US: skill.name,
    description_en_US: skill.desc.join("\n\n"),
    abilityScore: getReference(preparedDataMap, skill.ability_score.url),
  }));
}
