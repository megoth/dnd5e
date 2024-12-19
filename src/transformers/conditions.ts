import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { ConditionShapeType } from "../ldo/dnd5e.shapeTypes";
import { writeFileSync } from "node:fs";
import { Condition } from "../ldo/dnd5e.typings";

function transformCondition(
  data: components["schemas"]["Condition"],
  datasetUrl: string,
): Condition {
  const damageType = createLdoDataset()
    .usingType(ConditionShapeType)
    .fromSubject(datasetUrl + data.index);
  damageType.label = data.name;
  damageType.description = data.desc;
  return damageType;
}

export default async function transformConditions(
  data: Array<components["schemas"]["Condition"]>,
  datasetPath: string,
  datasetUrl: string,
): Promise<void> {
  const turtle = (
    await Promise.all(
      data.map((condition) =>
        toTurtle(transformCondition(condition, datasetUrl)),
      ),
    )
  ).reduce((memo, condition) => memo.concat(condition));
  writeFileSync(process.cwd() + datasetPath, turtle);
}
