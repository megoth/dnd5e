import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { ConditionShapeType } from "../ldo/dnd5e.shapeTypes";
import { writeFileSync } from "node:fs";
import { Condition } from "../ldo/dnd5e.typings";
import { dataPath, dataUrl } from "../utils/dnd5e";
import { type } from "../../public/data/type";

function transformCondition(
  data: components["schemas"]["Condition"],
): Condition {
  const damageType = createLdoDataset()
    .usingType(ConditionShapeType)
    .fromSubject(dataUrl("conditions", data.index));
  damageType.type = type("Condition");
  damageType.label = data.name;
  damageType.description = data.desc;
  return damageType;
}

export default async function writeConditions(
  data: Array<components["schemas"]["Condition"]>,
): Promise<void> {
  const turtle = (
    await Promise.all(
      data.map((condition) => toTurtle(transformCondition(condition))),
    )
  ).reduce((memo, condition) => memo.concat(condition));
  writeFileSync(dataPath("conditions"), turtle);
}
