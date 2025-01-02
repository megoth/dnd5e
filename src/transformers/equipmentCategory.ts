import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import {
  EquipmentCategoryShapeType,
  EquipmentShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { EquipmentCategory } from "../ldo/dnd5e.typings";
import { dataPath, dataUrl } from "../utils/dnd5e";
import { type } from "../../public/data/type";
import { writeFileSync } from "node:fs";

export function transformEquipmentCategory(
  data: components["schemas"]["EquipmentCategory"],
  ldoDataset = createLdoDataset(),
): EquipmentCategory {
  const category = ldoDataset
    .usingType(EquipmentCategoryShapeType)
    .fromSubject(`#${data.index}`);
  category.type = type("EquipmentCategory");
  category.label = data.name;
  category.equipmentList = data.equipment.map((equipment) =>
    ldoDataset
      .usingType(EquipmentShapeType)
      .fromSubject(dataUrl("equipment", equipment.index)),
  );
  return category;
}

export default async function writeEquipmentCategory(
  data: Array<components["schemas"]["EquipmentCategory"]>,
): Promise<void> {
  const turtle = (
    await Promise.all(
      data.map((category) => toTurtle(transformEquipmentCategory(category))),
    )
  ).reduce((memo, category) => memo.concat(category));
  writeFileSync(dataPath("equipment-categories"), turtle);
}
