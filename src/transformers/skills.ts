import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { AbilityScoreShapeType, SkillShapeType } from "../ldo/dnd5e.shapeTypes";
import { Skill } from "../ldo/dnd5e.typings";
import { writeFileSync } from "node:fs";
import { dataPath, dataUrl } from "../utils/dnd5e";
import { type } from "../../public/data/type";
import skills from "../dnd5eapi-data/5e-SRD-Skills.json";

export function transformSkill(
  data: components["schemas"]["Skill"],
  ldoDataset = createLdoDataset(),
): Skill {
  const skill = ldoDataset
    .usingType(SkillShapeType)
    .fromSubject(`#${data.index}`);
  skill.type = type("Skill");
  skill.label = data.name;
  skill.description = data.desc;
  skill.abilityScore = createLdoDataset()
    .usingType(AbilityScoreShapeType)
    .fromSubject(dataUrl("abilityScores", data.ability_score.index));
  return skill;
}

export default async function writeSkills(): Promise<void> {
  const turtle = (
    await Promise.all(skills.map((skill) => toTurtle(transformSkill(skill))))
  ).reduce((memo, skill) => memo.concat(skill));
  writeFileSync(dataPath("skills"), turtle);
}
