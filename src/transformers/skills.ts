import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { AbilityScoreShapeType, SkillShapeType } from "../ldo/dnd5e.shapeTypes";
import { Skill } from "../ldo/dnd5e.typings";
import { writeFileSync } from "node:fs";

export function transformSkill(
  data: components["schemas"]["Skill"],
  datasetUrl: string,
  abilityScoreUrl: string,
): Skill {
  const ldoDataset = createLdoDataset();
  const skill = ldoDataset
    .usingType(SkillShapeType)
    .fromSubject(datasetUrl + data.index);
  skill.label = data.name;
  skill.description = data.desc;
  skill.abilityScore = ldoDataset
    .usingType(AbilityScoreShapeType)
    .fromSubject(abilityScoreUrl + data.ability_score.index);
  return skill;
}

export default async function transformSkills(
  data: Array<components["schemas"]["Skill"]>,
  datasetPath: string,
  datasetUrl: string,
  abilityScoreUrl: string,
): Promise<void> {
  const turtle = (
    await Promise.all(
      data.map((skill) =>
        toTurtle(transformSkill(skill, datasetUrl, abilityScoreUrl)),
      ),
    )
  ).reduce((memo, alignment) => memo.concat(alignment));
  writeFileSync(process.cwd() + datasetPath, turtle);
}
