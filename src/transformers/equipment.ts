import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import {
  EquipmentCategoryShapeType,
  EquipmentShapeType,
  WeaponPropertyShapeType,
  WeaponShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { Equipment, Weapon } from "../ldo/dnd5e.typings";
import { apiUrlToSubjectUrl, dataPath } from "../utils/dnd5e";
import { type } from "../../public/data/type";
import { writeFileSync } from "node:fs";
import equipment from "../dnd5eapi-data/5e-SRD-Equipment.json";
import { transformDamage } from "./damage";

function transformWeapon(
  data: components["schemas"]["Weapon"],
  ldoDataset = createLdoDataset(),
): Weapon {
  return ldoDataset.usingType(WeaponShapeType).fromJson({
    weaponCategory: data.weapon_category,
    weaponRange: data.weapon_range,
    categoryRange: data.category_range,
    range: data.range,
    damage: data.damage && transformDamage(data.damage, ldoDataset),
    twoHandedDamage:
      data.two_handed_damage &&
      transformDamage(data.two_handed_damage, ldoDataset),
    properties: data.properties.map((property) =>
      ldoDataset
        .usingType(WeaponPropertyShapeType)
        .fromSubject(apiUrlToSubjectUrl(property.url)),
    ),
    weight: data.weight,
  });
}

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
  equipment.weapon =
    data["weapon_category"] &&
    transformWeapon(data as components["schemas"]["Weapon"], ldoDataset);
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
