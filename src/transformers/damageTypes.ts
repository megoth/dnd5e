import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { DamageTypeShapeType } from "../ldo/dnd5e.shapeTypes";
import { writeFileSync } from "node:fs";
import { DamageType } from "../ldo/dnd5e.typings";

export function transformDamageType(
  data: components["schemas"]["DamageType"],
  datasetUrl: string,
): DamageType {
  const ldoDataset = createLdoDataset();
  const damageType = ldoDataset
    .usingType(DamageTypeShapeType)
    .fromSubject(datasetUrl + data.index);
  damageType.label = data.name;
  damageType.description = data.desc;
  return damageType;
}

export default async function transformDamageTypes(
  data: Array<components["schemas"]["DamageType"]>,
  datasetPath: string,
  datasetUrl: string,
): Promise<void> {
  const turtle = (
    await Promise.all(
      data.map((damageType) =>
        toTurtle(transformDamageType(damageType, datasetUrl)),
      ),
    )
  ).reduce((memo, alignment) => memo.concat(alignment));
  writeFileSync(process.cwd() + datasetPath, turtle);
}
