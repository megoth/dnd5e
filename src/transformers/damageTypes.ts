import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { DamageTypeShapeType } from "../ldo/dnd5e.shapeTypes";
import { writeFileSync } from "node:fs";
import { DamageType } from "../ldo/dnd5e.typings";
import { dataPath } from "../utils/dnd5e";
import damageTypes from "../dnd5eapi-data/5e-SRD-Damage-Types.json";

function transformDamageType(
  data: components["schemas"]["DamageType"],
  ldoDataset = createLdoDataset(),
): DamageType {
  const damageType = ldoDataset
    .usingType(DamageTypeShapeType)
    .fromSubject(`#${data.index}`);
  damageType.type = { "@id": "DamageType" };
  damageType.label = data.name;
  damageType.description = data.desc;
  return damageType;
}

export default async function writeDamageTypes() {
  const turtle = (
    await Promise.all(
      damageTypes.map((damageType) =>
        toTurtle(transformDamageType(damageType)),
      ),
    )
  ).reduce((memo, damageType) => memo.concat(damageType));
  writeFileSync(dataPath("damage-types"), turtle);
}
