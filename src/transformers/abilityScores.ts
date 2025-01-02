import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { AbilityScoreShapeType, SkillShapeType } from "../ldo/dnd5e.shapeTypes";
import { writeFileSync } from "node:fs";
import { AbilityScore } from "../ldo/dnd5e.typings";
import { dataPath, dataUrl } from "../utils/dnd5e";
import { type } from "../../public/data/type";

function transformAbilityScore(
  data: components["schemas"]["AbilityScore"],
  ldoDataset = createLdoDataset(),
): AbilityScore {
  const abilityScore = ldoDataset
    .usingType(AbilityScoreShapeType)
    .fromSubject(`#${data.index}`);
  abilityScore.type = type("AbilityScore");
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

export default async function writeAbilityScores(
  data: Array<components["schemas"]["AbilityScore"]>,
): Promise<void> {
  const turtle = (
    await Promise.all(
      data.map((abilityScore) => toTurtle(transformAbilityScore(abilityScore))),
    )
  ).reduce((memo, abilityScore) => memo.concat(abilityScore));
  writeFileSync(dataPath("abilityScores"), turtle);
}
