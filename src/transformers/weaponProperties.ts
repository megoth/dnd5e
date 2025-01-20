import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { WeaponPropertyShapeType } from "../ldo/dnd5e.shapeTypes";
import { WeaponProperty } from "../ldo/dnd5e.typings";
import properties from "../dnd5eapi-data/5e-SRD-Weapon-Properties.json";
import { writeFileSync } from "node:fs";
import { dataPath } from "../utils/dnd5e";

export function transformWeaponProperty(
  data: components["schemas"]["WeaponProperty"],
  ldoDataset = createLdoDataset(),
): WeaponProperty {
  const property = ldoDataset
    .usingType(WeaponPropertyShapeType)
    .fromSubject(`#${data.index}`);
  property.type = { "@id": "WeaponProperty" };
  property.label = data.name;
  property.description = data.desc;
  return property;
}

export default async function writeWeaponProperties() {
  const turtle = (
    await Promise.all(
      properties.map((property) => toTurtle(transformWeaponProperty(property))),
    )
  ).reduce((memo, properties) => memo.concat(properties));
  writeFileSync(dataPath("weapon-properties"), turtle);
}
