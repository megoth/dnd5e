import {
  ArmorClassData,
  DamageData,
  EquipmentData,
  ItemData,
  RangeData,
  VehicleSpeedData,
} from "../../download/api.types";
import {
  ArmorClass,
  Damage,
  Equipment,
  Item,
  Range,
  VehicleSpeed,
} from "../../sanity/schema-types";
import { getReference, migrateData } from "../common";
import {
  createKeyedArray,
  migrateOptional,
  migrateToMarkdown,
} from "../../manage-data";
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
      cost: migrateCost(equipment.cost),
      ...migrateOptional<Equipment>(
        "description_en_US",
        migrateToMarkdown(equipment.desc)
      ),
      ...migrateOptional<Equipment>("armorCategory", equipment.armor_category),
      ...migrateOptional<Equipment, ArmorClassData, ArmorClass>(
        "armorClass",
        equipment.armor_class,
        migrateArmorClass
      ),
      ...migrateOptional<Equipment>("capacity", equipment.capacity),
      ...migrateOptional<Equipment>("rangeCategory", equipment.category_range),
      ...migrateOptional<Equipment, DamageData, Damage>(
        "damage",
        equipment.damage,
        (val) => migrateDamage(val, preparedDataMap)
      ),

      ...migrateOptional<Equipment>("quantity", equipment.quantity),
      ...migrateOptional<Equipment, RangeData, Range>(
        "range",
        equipment.range,
        migrateRange
      ),
      ...migrateOptional<Equipment>(
        "special_en_US",
        migrateToMarkdown(equipment.special)
      ),
      ...migrateOptional<Equipment, VehicleSpeedData, VehicleSpeed>(
        "speed",
        equipment.speed,
        migrateVehicleSpeed
      ),
      ...migrateOptional<Equipment>("strMinimum", equipment.str_minimum),
      ...migrateOptional<Equipment>(
        "stealthDisadvantage",
        equipment.stealth_disadvantage
      ),
      ...migrateOptional<Equipment, RangeData, Range>(
        "throwRange",
        equipment.throw_range,
        migrateRange
      ),
      ...migrateOptional<Equipment>("toolCategory", equipment.tool_category),
      ...migrateOptional<Equipment, DamageData, Damage>(
        "twoHandedDamage",
        equipment.two_handed_damage,
        (val) => migrateDamage(val, preparedDataMap)
      ),
      ...migrateOptional<Equipment>(
        "vehicleCategory",
        equipment.vehicle_category
      ),
      ...migrateOptional<Equipment>("weaponRange", equipment.weapon_range),
      ...migrateOptional<Equipment>("weight", equipment.weight),
      ...migrateOptional<Equipment>(
        "properties",
        createKeyedArray(
          equipment.properties?.map(({ url }) =>
            getReference(preparedDataMap, url)
          )
        )
      ),
      ...migrateOptional<Equipment>(
        "gearCategory",
        equipment.gear_category
          ? getReference(preparedDataMap, equipment.gear_category.url)
          : null
      ),
      ...migrateOptional<Equipment, Array<ItemData>, Array<Item>>(
        "contents",
        equipment.contents,
        (contents) =>
          createKeyedArray(
            contents.map((val) => migrateItem(val, preparedDataMap))
          )
      ),
    })
  );
}
