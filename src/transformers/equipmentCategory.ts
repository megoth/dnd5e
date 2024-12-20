import { components } from "../typings/dnd5eapi";
import { createLdoDataset } from "@ldo/ldo";
import { EquipmentCategoryShapeType } from "../ldo/dnd5e.shapeTypes";
import { EquipmentCategory } from "../ldo/dnd5e.typings";
import { dataUrl } from "../utils/dnd5e";
import { type } from "../../public/data/type";

export function transformEquipmentCategory(
  data: components["schemas"]["EquipmentCategory"],
  ldoDataset = createLdoDataset(),
): EquipmentCategory {
  const category = ldoDataset
    .usingType(EquipmentCategoryShapeType)
    .fromSubject(dataUrl("equipmentCategories", data.index));
  category.type = type("EquipmentCategory");
  return category;
}
