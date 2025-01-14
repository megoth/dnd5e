import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import {
  ArmorClassShapeType,
  ArmorShapeType,
  EquipmentCategoryShapeType,
  EquipmentPackContentShapeType,
  EquipmentPackShapeType,
  EquipmentShapeType,
  GearShapeType,
  WeaponPropertyShapeType,
  WeaponShapeType,
} from "../ldo/dnd5e.shapeTypes";
import {
  Armor,
  Equipment,
  EquipmentPack,
  Gear,
  Weapon,
} from "../ldo/dnd5e.typings";
import { apiUrlToSubjectUrl, dataPath } from "../utils/dnd5e";
import { type } from "../../public/data/type";
import { writeFileSync } from "node:fs";
import equipment from "../dnd5eapi-data/5e-SRD-Equipment.json";
import { transformDamage } from "./damage";

function transformArmor(
  data: components["schemas"]["Armor"],
  ldoDataset = createLdoDataset(),
): Armor {
  return ldoDataset.usingType(ArmorShapeType).fromJson({
    armorCategory: data.armor_category,
    armorClass:
      data.armor_class &&
      ldoDataset.usingType(ArmorClassShapeType).fromJson({
        base: parseInt(data.armor_class.base, 10),
        dexBonus: data.armor_class.dex_bonus as unknown as boolean,
        maxBonus:
          data.armor_class.max_bonus &&
          parseInt(data.armor_class.max_bonus, 10),
      }),
    strMinimum: data.str_minimum,
    stealthDisadvantage: data.stealth_disadvantage,
    weight: data.weight,
  });
}

function transformEquipmentPack(
  data: components["schemas"]["EquipmentPack"],
  ldoDataset = createLdoDataset(),
): EquipmentPack {
  return ldoDataset.usingType(EquipmentPackShapeType).fromJson({
    gearCategory: ldoDataset
      .usingType(EquipmentCategoryShapeType)
      .fromSubject(apiUrlToSubjectUrl(data.gear_category.url)),
    contents: data.contents.map((equipment) =>
      ldoDataset.usingType(EquipmentPackContentShapeType).fromJson({
        quantity: equipment.quantity,
        item: ldoDataset
          .usingType(EquipmentShapeType)
          .fromSubject(apiUrlToSubjectUrl(equipment.item.url)),
      }),
    ),
  });
}

function transformGear(
  data: components["schemas"]["Gear"],
  ldoDataset = createLdoDataset(),
): Gear {
  return ldoDataset.usingType(GearShapeType).fromJson({
    gearCategory: ldoDataset
      .usingType(EquipmentCategoryShapeType)
      .fromSubject(apiUrlToSubjectUrl(data.gear_category.url)),
    weight: data.weight,
  });
}

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
  equipment.armor =
    data["armor_category"] &&
    transformArmor(data as components["schemas"]["Armor"], ldoDataset);
  equipment.gear =
    data["gear_category"] &&
    data["weight"] &&
    transformGear(data as components["schemas"]["Gear"], ldoDataset);
  equipment.equipmentPack =
    data["gear_category"] &&
    data["contents"] &&
    transformEquipmentPack(
      data as components["schemas"]["EquipmentPack"],
      ldoDataset,
    );
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
