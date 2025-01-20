import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { ConditionShapeType } from "../ldo/dnd5e.shapeTypes";
import { writeFileSync } from "node:fs";
import { Condition } from "../ldo/dnd5e.typings";
import { dataPath } from "../utils/dnd5e";
import conditions from "../dnd5eapi-data/5e-SRD-Conditions.json";

function transformCondition(
  data: components["schemas"]["Condition"],
  ldoDataset = createLdoDataset(),
): Condition {
  const damageType = ldoDataset
    .usingType(ConditionShapeType)
    .fromSubject(`#${data.index}`);
  damageType.type = { "@id": "Condition" };
  damageType.label = data.name;
  damageType.description = data.desc;
  return damageType;
}

export default async function writeConditions() {
  const turtle = (
    await Promise.all(
      conditions.map((condition) => toTurtle(transformCondition(condition))),
    )
  ).reduce((memo, condition) => memo.concat(condition));
  writeFileSync(dataPath("conditions"), turtle);
}
