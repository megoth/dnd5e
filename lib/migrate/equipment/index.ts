import { EquipmentData } from "../../download/api.types";
import { Equipment } from "../../sanity/schema-types";
import { getReference, migrateData } from "../common";
import { getProperty } from "../../manage-data";
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
      ...getProperty<Equipment>(
        "description_en_US",
        equipment.desc?.join("\n\n")
      ),
      ...getProperty<Equipment>("armorCategory", equipment.armor_category),
      ...migrateArmorClass("armorClass", equipment.armor_class),
      ...getProperty<Equipment>("capacity", equipment.capacity),
      ...getProperty<Equipment>("rangeCategory", equipment.category_range),
      ...migrateDamage<Equipment>(preparedDataMap, "damage", equipment.damage),

      ...getProperty<Equipment>("quantity", equipment.quantity),
      ...migrateRange<Equipment>("range", equipment.range),
      ...getProperty<Equipment>(
        "special_en_US",
        equipment.special?.join("\n\n")
      ),
      ...migrateVehicleSpeed<Equipment>("speed", equipment.speed),
      ...getProperty<Equipment>("strMinimum", equipment.str_minimum),
      ...getProperty<Equipment>(
        "stealthDisadvantage",
        equipment.stealth_disadvantage
      ),
      ...migrateRange<Equipment>("throwRange", equipment.throw_range),
      ...getProperty<Equipment>("toolCategory", equipment.tool_category),
      ...migrateDamage<Equipment>(
        preparedDataMap,
        "twoHandedDamage",
        equipment.two_handed_damage
      ),
      ...getProperty<Equipment>("vehicleCategory", equipment.vehicle_category),
      ...getProperty<Equipment>("weaponRange", equipment.weapon_range),
      ...getProperty<Equipment>("weight", equipment.weight),
      ...getProperty<Equipment>(
        "properties",
        equipment.properties?.map(({ url }) =>
          getReference(preparedDataMap, url)
        )
      ),
      ...getProperty<Equipment>(
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
