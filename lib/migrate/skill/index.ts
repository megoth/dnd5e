import { getReference, migrateData } from "../common";
import { SkillData } from "../../download/api.types";
import { Skill } from "../../sanity/schema-types";
import { migrateToMarkdown } from "../../manage-data";

export default function migrateSkillData(preparedDataMap) {
  return migrateData<SkillData, Skill>(preparedDataMap, (skill) => ({
    _type: "skill",
    name_en_US: skill.name,
    description_en_US: migrateToMarkdown(skill.desc),
    abilityScore: getReference(preparedDataMap, skill.ability_score.url),
  }));
}
