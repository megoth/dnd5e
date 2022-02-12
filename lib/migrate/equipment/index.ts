import { EquipmentData } from "../../download/api.types";
import { Equipment } from "../../sanity/schema-types";
import { getReference, migrateData } from "../common";
import { migrateProperty, migrateToMarkdown } from "../../manage-data";
import migrateArmorClass from "../armor-class";
import migrateDamage from "../damage";
import migrateCost from "../cost";
import migrateRange from "../range";
import migrateVehicleSpeed from "../vehicle-speed";
import migrateItem from "../item";

export default function migrateEquipmentData(preparedDataMap) {
  return migrateData<EquipmentData, Equipment>(
    preparedDataMap,
    (equipment) => ({
      _type: "equipment",
      name_en_US: equipment.name,
      equipmentCategory: getReference<Equipment>(
        preparedDataMap,
        equipment.equipment_category.url
      ),
      cost: migrateCost<Equipment>("cost", equipment.cost),
      ...migrateProperty<Equipment>(
        "description_en_US",
        migrateToMarkdown(equipment.desc)
      ),
      ...migrateProperty<Equipment>("armorCategory", equipment.armor_category),
      ...migrateArmorClass("armorClass", equipment.armor_class),
      ...migrateProperty<Equipment>("capacity", equipment.capacity),
      ...migrateProperty<Equipment>("rangeCategory", equipment.category_range),
      ...migrateDamage<Equipment>(preparedDataMap, "damage", equipment.damage),

      ...migrateProperty<Equipment>("quantity", equipment.quantity),
      ...migrateRange<Equipment>("range", equipment.range),
      ...migrateProperty<Equipment>(
        "special_en_US",
        migrateToMarkdown(equipment.special)
      ),
      ...migrateVehicleSpeed<Equipment>("speed", equipment.speed),
      ...migrateProperty<Equipment>("strMinimum", equipment.str_minimum),
      ...migrateProperty<Equipment>(
        "stealthDisadvantage",
        equipment.stealth_disadvantage
      ),
      ...migrateRange<Equipment>("throwRange", equipment.throw_range),
      ...migrateProperty<Equipment>("toolCategory", equipment.tool_category),
      ...migrateDamage<Equipment>(
        preparedDataMap,
        "twoHandedDamage",
        equipment.two_handed_damage
      ),
      ...migrateProperty<Equipment>(
        "vehicleCategory",
        equipment.vehicle_category
      ),
      ...migrateProperty<Equipment>("weaponRange", equipment.weapon_range),
      ...migrateProperty<Equipment>("weight", equipment.weight),
      ...migrateProperty<Equipment>(
        "properties",
        equipment.properties?.map(({ url }) =>
          getReference(preparedDataMap, url)
        )
      ),
      ...migrateProperty<Equipment>(
        "gearCategory",
        equipment.gear_category
          ? getReference(preparedDataMap, equipment.gear_category.url)
          : null
      ),
      ...migrateItem<Equipment>(
        preparedDataMap,
        "contents",
        equipment.contents
      ),
    })
  );
}
