import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { DamageTypeShapeType } from "../ldo/dnd5e.shapeTypes";
import { writeFileSync } from "node:fs";
import { DamageType } from "../ldo/dnd5e.typings";
import { dataPath, dataUrl } from "../utils/dnd5e";
import { type } from "../../public/data/type";

function transformDamageType(
  data: components["schemas"]["DamageType"],
  ldoDataset = createLdoDataset(),
): DamageType {
  const damageType = ldoDataset
    .usingType(DamageTypeShapeType)
    .fromSubject(dataUrl("damageTypes", data.index));
  damageType.type = type("DamageType");
  damageType.label = data.name;
  damageType.description = data.desc;
  return damageType;
}

export default async function writeDamageTypes(
  data: Array<components["schemas"]["DamageType"]>,
): Promise<void> {
  const turtle = (
    await Promise.all(
      data.map((damageType) => toTurtle(transformDamageType(damageType))),
    )
  ).reduce((memo, damageType) => memo.concat(damageType));
  writeFileSync(dataPath("damageTypes"), turtle);
}
