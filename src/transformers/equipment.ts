import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { EquipmentShapeType } from "../ldo/dnd5e.shapeTypes";
import { EquipmentCategory } from "../ldo/dnd5e.typings";
import { dataPath, dataUrl } from "../utils/dnd5e";
import { type } from "../../public/data/type";
import { writeFileSync } from "node:fs";

export function transformEquipment(
  data: components["schemas"]["Equipment"],
  ldoDataset = createLdoDataset(),
): EquipmentCategory {
  const equipment = ldoDataset
    .usingType(EquipmentShapeType)
    .fromSubject(dataUrl("equipments", data.index));
  equipment.type = type("Equipment");
  equipment.label = data.name;
  equipment.description = data.desc;
  return equipment;
}
export default async function writeEquipment(
  data: Array<components["schemas"]["Equipment"]>,
): Promise<void> {
  const turtle = (
    await Promise.all(
      data.map((equipment) => toTurtle(transformEquipment(equipment))),
    )
  ).reduce((memo, equipment) => memo.concat(equipment));
  writeFileSync(dataPath("equipments"), turtle);
}
