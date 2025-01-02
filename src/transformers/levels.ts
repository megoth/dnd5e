import { ClassLevel } from "../ldo/dnd5e.typings";
import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { ClassLevelShapeType, FeatureShapeType } from "../ldo/dnd5e.shapeTypes";
import { type } from "../../public/data/type";
import { writeFileSync } from "node:fs";
import { dataPath, dataUrl } from "../utils/dnd5e";

export function transformLevel(
  data: components["schemas"]["ClassLevel"],
  ldoDataset = createLdoDataset(),
): ClassLevel {
  const classLevel = ldoDataset
    .usingType(ClassLevelShapeType)
    .fromSubject(`#${data.index}`);
  classLevel.type = type("ClassLevel");
  classLevel.level = data.level.toString();
  classLevel.abilityScoreBonuses = data.ability_score_bonuses?.toString();
  classLevel.proficiencyBonus = data.prof_bonus?.toString();
  classLevel.features = data.features.map((feature) =>
    ldoDataset
      .usingType(FeatureShapeType)
      .fromSubject(dataUrl("features", feature.index)),
  );
  return classLevel;
}

export default async function writeLevels(
  data: Array<components["schemas"]["ClassLevel"]>,
): Promise<void> {
  const turtle = (
    await Promise.all(data.map((level) => toTurtle(transformLevel(level))))
  ).reduce((memo, levels) => memo.concat(levels));
  writeFileSync(dataPath("class-levels"), turtle);
}
