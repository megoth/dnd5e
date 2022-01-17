import { getReference, migrateData } from "./common";
import { SkillData } from "../download/api.types";
import { Skill } from "../sanity/schema-types";

export default function migrateSkillData(existingDataMap) {
  return migrateData<SkillData, Skill>(existingDataMap, (skill) => ({
    _type: "skill",
    name_en_US: skill.name,
    description_en_US: skill.desc.join("\n\n"),
  }));
}

export function addSkillReferences(
  migratedDataMap: Record<string, any>,
  downloadedSkillMap: Record<string, SkillData>
): Record<string, SkillData> {
  return Object.entries(downloadedSkillMap).reduce<Record<string, SkillData>>(
    (memo, [url, skill]) => ({
      ...memo,
      [url]: {
        ...migratedDataMap[url],
        abilityScore: getReference(migratedDataMap, skill.ability_score.url),
      },
    }),
    {}
  );
}
