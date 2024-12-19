import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { ConditionShapeType, TypeShapeType } from "../ldo/dnd5e.shapeTypes";
import { writeFileSync } from "node:fs";
import { Condition } from "../ldo/dnd5e.typings";
import { dataPath, dataUrl, vocabUrl } from "../utils/dnd5e";

function transformCondition(
  data: components["schemas"]["Condition"],
): Condition {
  const damageType = createLdoDataset()
    .usingType(ConditionShapeType)
    .fromSubject(dataUrl("conditions", data.index));
  damageType.type = createLdoDataset()
    .usingType(TypeShapeType)
    .fromSubject(vocabUrl("Condition"));
  damageType.label = data.name;
  damageType.description = data.desc;
  return damageType;
}

export default async function transformConditions(
  data: Array<components["schemas"]["Condition"]>,
): Promise<void> {
  const turtle = (
    await Promise.all(
      data.map((condition) => toTurtle(transformCondition(condition))),
    )
  ).reduce((memo, condition) => memo.concat(condition));
  writeFileSync(dataPath("conditions"), turtle);
}
