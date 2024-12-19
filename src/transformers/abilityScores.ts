import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import {
  AbilityScoreShapeType,
  SkillShapeType,
  TypeShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { writeFileSync } from "node:fs";
import { AbilityScore } from "../ldo/dnd5e.typings";
import { dataPath, dataUrl, vocabUrl } from "../utils/dnd5e";

function transformAbilityScore(
  data: components["schemas"]["AbilityScore"],
): AbilityScore {
  const ldoDataset = createLdoDataset();
  const abilityScore = ldoDataset
    .usingType(AbilityScoreShapeType)
    .fromSubject(dataUrl("abilityScores", data.index));
  abilityScore.type = createLdoDataset()
    .usingType(TypeShapeType)
    .fromSubject(vocabUrl("AbilityScore"));
  abilityScore.label = data.full_name;
  abilityScore.abbreviation = data.name;
  abilityScore.description = data.desc;
  abilityScore.skill = data.skills.map((skill) =>
    ldoDataset
      .usingType(SkillShapeType)
      .fromSubject(dataUrl("skills", skill.index)),
  );
  return abilityScore;
}

export default async function transformAbilityScores(
  data: Array<components["schemas"]["AbilityScore"]>,
): Promise<void> {
  const turtle = (
    await Promise.all(
      data.map((abilityScore) => toTurtle(transformAbilityScore(abilityScore))),
    )
  ).reduce((memo, abilityScore) => memo.concat(abilityScore));
  writeFileSync(dataPath("abilityScores"), turtle);
}
