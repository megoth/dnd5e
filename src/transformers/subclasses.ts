import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { SubclassShapeType } from "../ldo/dnd5e.shapeTypes";
import { writeFileSync } from "node:fs";
import { Subclass } from "../ldo/dnd5e.typings";
import { dataPath } from "../utils/dnd5e";
import { type } from "../../public/data/type";

import subclasses from "../dnd5eapi-data/5e-SRD-Subclasses.json";

function transformSubclass(
  data: components["schemas"]["Subclass"],
  ldoDataset = createLdoDataset(),
): Subclass {
  const subclass = ldoDataset
    .usingType(SubclassShapeType)
    .fromSubject(`#${data.index}`);
  subclass.type = type("Subclass");
  subclass.label = data.name;
  return subclass;
}

export default async function writeSubclasses() {
  const turtle = (
    await Promise.all(
      subclasses.map((subclass) => toTurtle(transformSubclass(subclass))),
    )
  ).reduce((memo, abilityScore) => memo.concat(abilityScore));
  writeFileSync(dataPath("subclasses"), turtle);
}
