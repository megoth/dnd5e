import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import {
  EquipmentCategoryShapeType,
  EquipmentShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { Equipment } from "../ldo/dnd5e.typings";
import { apiUrlToSubjectUrl, dataPath } from "../utils/dnd5e";
import { type } from "../../public/data/type";
import { writeFileSync } from "node:fs";
import equipment from "../dnd5eapi-data/5e-SRD-Equipment.json";

export function transformEquipment(
  data: components["schemas"]["Equipment"],
  ldoDataset = createLdoDataset(),
): Equipment {
  const equipment = ldoDataset
    .usingType(EquipmentShapeType)
    .fromSubject(`#${data.index}`);
  equipment.type = type("Equipment");
  equipment.label = data.name;
  equipment.description = data.desc;
  equipment.equipmentCategory =
    data.equipment_category &&
    ldoDataset
      .usingType(EquipmentCategoryShapeType)
      .fromSubject(apiUrlToSubjectUrl(data.equipment_category.url));
  equipment.cost = data.cost;
  // weapon
  // armor
  // gear
  // equipmentPack
  return equipment;
}

export default async function writeEquipment() {
  const turtle = (
    await Promise.all(
      equipment.map((equipment) => toTurtle(transformEquipment(equipment))),
    )
  ).reduce((memo, equipment) => memo.concat(equipment));
  writeFileSync(dataPath("equipments"), turtle);
}
