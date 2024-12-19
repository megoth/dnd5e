import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { AbilityScoreShapeType, SkillShapeType } from "../ldo/dnd5e.shapeTypes";
import { writeFileSync } from "node:fs";
import { AbilityScore } from "../ldo/dnd5e.typings";

export function transformAbilityScore(
  data: components["schemas"]["AbilityScore"],
  datasetUrl: string,
  skillUrl: string,
): AbilityScore {
  const ldoDataset = createLdoDataset();
  const abilityScore = ldoDataset
    .usingType(AbilityScoreShapeType)
    .fromSubject(datasetUrl + data.index);
  abilityScore.label = data.full_name;
  abilityScore.abbreviation = data.name;
  abilityScore.description = data.desc;
  abilityScore.skill = data.skills.map((skill) =>
    ldoDataset.usingType(SkillShapeType).fromSubject(skillUrl + skill.index),
  );
  return abilityScore;
}

export default async function transformAbilityScores(
  data: Array<components["schemas"]["AbilityScore"]>,
  datasetPath: string,
  datasetUrl: string,
  skillUrl: string,
): Promise<void> {
  const turtle = (
    await Promise.all(
      data.map((abilityScore) =>
        toTurtle(transformAbilityScore(abilityScore, datasetUrl, skillUrl)),
      ),
    )
  ).reduce((memo, alignment) => memo.concat(alignment));
  writeFileSync(process.cwd() + datasetPath, turtle);
}
