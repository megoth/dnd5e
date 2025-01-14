import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import {
  EquipmentCategoryShapeType,
  EquipmentShapeType,
  MagicItemShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { Equipment } from "../ldo/dnd5e.typings";
import { type } from "../../public/data/type";
import items from "../dnd5eapi-data/5e-SRD-Magic-Items.json";
import { writeFileSync } from "node:fs";
import { apiUrlToSubjectUrl, dataPath } from "../utils/dnd5e";

export function transformMagicItem(
  data: components["schemas"]["MagicItem"],
  ldoDataset = createLdoDataset(),
): Equipment {
  const equipment = ldoDataset
    .usingType(EquipmentShapeType)
    .fromSubject(`#${data.index}`);
  equipment.type = type("Equipment");
  equipment.label = data.name;
  equipment.description = data.desc;
  equipment.equipmentCategory = ldoDataset
    .usingType(EquipmentCategoryShapeType)
    .fromSubject(apiUrlToSubjectUrl(data.equipment_category.url));
  equipment.magicItem = ldoDataset.usingType(MagicItemShapeType).fromJson({
    rarity: data.rarity.name,
    magicItemVariants: data.variants.map((variant) =>
      ldoDataset
        .usingType(MagicItemShapeType)
        .fromSubject(apiUrlToSubjectUrl(variant.url)),
    ),
    magicItemVariant: data.variant,
  });
  return equipment;
}

export default async function writeMagicItems() {
  const turtle = (
    await Promise.all(
      items.map((item) =>
        toTurtle(
          transformMagicItem(item as components["schemas"]["MagicItem"]),
        ),
      ),
    )
  ).reduce((memo, items) => memo.concat(items));
  writeFileSync(dataPath("magic-items"), turtle);
}
