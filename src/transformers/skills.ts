import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import {
  AbilityScoreShapeType,
  SkillShapeType,
  TypeShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { Skill } from "../ldo/dnd5e.typings";
import { writeFileSync } from "node:fs";
import { dataPath, dataUrl, vocabUrl } from "../utils/dnd5e";

export function transformSkill(data: components["schemas"]["Skill"]): Skill {
  const skill = createLdoDataset()
    .usingType(SkillShapeType)
    .fromSubject(dataUrl("skills", data.index));
  skill.type = createLdoDataset()
    .usingType(TypeShapeType)
    .fromSubject(vocabUrl("Skill"));
  skill.label = data.name;
  skill.description = data.desc;
  skill.abilityScore = createLdoDataset()
    .usingType(AbilityScoreShapeType)
    .fromSubject(dataUrl("abilityScores", data.ability_score.index));
  return skill;
}

export default async function transformSkills(
  data: Array<components["schemas"]["Skill"]>,
): Promise<void> {
  const turtle = (
    await Promise.all(data.map((skill) => toTurtle(transformSkill(skill))))
  ).reduce((memo, skill) => memo.concat(skill));
  writeFileSync(dataPath("skills"), turtle);
}
