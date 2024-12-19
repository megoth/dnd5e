import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { DamageTypeShapeType, TypeShapeType } from "../ldo/dnd5e.shapeTypes";
import { writeFileSync } from "node:fs";
import { DamageType } from "../ldo/dnd5e.typings";
import { dataPath, dataUrl, vocabUrl } from "../utils/dnd5e";

function transformDamageType(
  data: components["schemas"]["DamageType"],
): DamageType {
  const damageType = createLdoDataset()
    .usingType(DamageTypeShapeType)
    .fromSubject(dataUrl("damageTypes", data.index));
  damageType.type = createLdoDataset()
    .usingType(TypeShapeType)
    .fromSubject(vocabUrl("DamageType"));
  damageType.label = data.name;
  damageType.description = data.desc;
  return damageType;
}

export default async function transformDamageTypes(
  data: Array<components["schemas"]["DamageType"]>,
): Promise<void> {
  const turtle = (
    await Promise.all(
      data.map((damageType) => toTurtle(transformDamageType(damageType))),
    )
  ).reduce((memo, damageType) => memo.concat(damageType));
  writeFileSync(dataPath("damageTypes"), turtle);
}
