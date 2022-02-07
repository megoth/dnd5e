import { v4 as uuidv4 } from "uuid";
import migrateEquipmentData from "./index";
import { EquipmentData, WeaponDamage } from "../../download/api.types";
import { getDnd5eUrl, migrateToMarkdown } from "../../manage-data";

const equipmentUrl = "https://www.dnd5eapi.co/api/equipment/battleaxe";
const weaponCategoryRelativeUrl = "/api/equipment-categories/weapon";
const weaponCategoryUrl = getDnd5eUrl(weaponCategoryRelativeUrl);
const simpleEquipment: EquipmentData = {
  index: "battleaxe",
  name: "Battleaxe",
  equipment_category: {
    index: "weapon",
    name: "Weapon",
    url: weaponCategoryRelativeUrl,
  },
  cost: {
    quantity: 10,
    unit: "gp",
  },
  url: "/api/equipment/battleaxe",
};
const abilityScoreRelativeUrl = "/api/damage-types/bludgeoning";
const abilityScoreUrl = getDnd5eUrl(abilityScoreRelativeUrl);
const propertyRelativeUrl = "/api/weapon-properties/finesse";
const propertyUrl = getDnd5eUrl(propertyRelativeUrl);
const standardGearRelativeUrl = "/api/equipment-categories/standard-gear";
const standardGearUrl = getDnd5eUrl(standardGearRelativeUrl);
const backpackRelativeUrl = "/api/equipment/backpack";
const backpackUrl = getDnd5eUrl(backpackRelativeUrl);
const preparedDataMap = {
  [abilityScoreUrl]: { _id: uuidv4() },
  [backpackUrl]: { _id: uuidv4() },
  [propertyUrl]: { _id: uuidv4() },
  [standardGearUrl]: { _id: uuidv4() },
  [weaponCategoryUrl]: { _id: uuidv4() },
};
const equipmentId = uuidv4();
const complexEquipment: EquipmentData = {
  index: "battleaxe",
  name: "Battleaxe",
  equipment_category: {
    index: "weapon",
    name: "Weapon",
    url: weaponCategoryRelativeUrl,
  },
  cost: {
    quantity: 10,
    unit: "gp",
  },
  desc: ["DESC"],
  armor_category: "Medium",
  armor_class: {
    base: 15,
    dex_bonus: true,
    max_bonus: 2,
  },
  str_minimum: 0,
  stealth_disadvantage: true,
  vehicle_category: "Tack, Harness, and Drawn Vehicles",
  speed: {
    quantity: 40,
    unit: "ft/round",
  },
  capacity: "195 lb.",
  damage: {
    damage_dice: "1d4",
    damage_type: {
      index: "bludgeoning",
      name: "Bludgeoning",
      url: abilityScoreRelativeUrl,
    },
  },
  two_handed_damage: {
    damage_dice: "1d4",
    damage_type: {
      index: "bludgeoning",
      name: "Bludgeoning",
      url: abilityScoreRelativeUrl,
    },
  },
  weapon_category: "Simple",
  weapon_range: "Ranged",
  category_range: "Simple Ranged",
  range: {
    normal: 5,
    long: null,
  },
  throw_range: {
    normal: 5,
    long: 15,
  },
  properties: [
    {
      index: "finesse",
      name: "Finesse",
      url: propertyRelativeUrl,
    },
  ],
  special: ["SPECIAL"],
  gear_category: {
    index: "standard-gear",
    name: "Standard Gear",
    url: standardGearRelativeUrl,
  },
  contents: [
    {
      item: {
        index: "backpack",
        name: "Backpack",
        url: backpackRelativeUrl,
      },
      quantity: 1,
    },
  ],
  tool_category: "Gaming Sets",
  quantity: 20,
  weight: 4,
  url: "/api/equipment/battleaxe",
};

describe("migrateEquipmentData", () => {
  it("migrates data from D&D5e API to Sanity CMS", () => {
    expect(
      migrateEquipmentData(preparedDataMap)({
        [equipmentUrl]: simpleEquipment,
      })
    ).toEqual([
      {
        _type: "equipment",
        name_en_US: simpleEquipment.name,
        equipmentCategory: {
          _ref: preparedDataMap[weaponCategoryUrl]._id,
          _type: "reference",
        },
        cost: {
          _type: "cost",
          quantity: 10,
          unit: "gp",
        },
      },
    ]);
  });

  it("preserves id from old data if available", () => {
    expect(
      migrateEquipmentData({
        ...preparedDataMap,
        [equipmentUrl]: {
          _id: equipmentId,
          name_en_US: "TEST",
        },
      })({
        [equipmentUrl]: simpleEquipment,
      })
    ).toEqual([
      {
        _id: equipmentId,
        _type: "equipment",
        name_en_US: simpleEquipment.name,
        equipmentCategory: {
          _ref: preparedDataMap[weaponCategoryUrl]._id,
          _type: "reference",
        },
        cost: {
          _type: "cost",
          quantity: 10,
          unit: "gp",
        },
      },
    ]);
  });

  it("handles all optional fields", () => {
    expect(
      migrateEquipmentData(preparedDataMap)({
        [equipmentUrl]: complexEquipment,
      })
    ).toEqual([
      {
        _type: "equipment",
        armorCategory: complexEquipment.armor_category,
        armorClass: {
          _type: "armorClass",
          base: complexEquipment.armor_class.base,
          dexBonus: complexEquipment.armor_class.dex_bonus,
          maxBonus: complexEquipment.armor_class.max_bonus,
        },
        capacity: complexEquipment.capacity,
        name_en_US: complexEquipment.name,
        equipmentCategory: {
          _ref: preparedDataMap[weaponCategoryUrl]._id,
          _type: "reference",
        },
        cost: {
          _type: "cost",
          quantity: complexEquipment.cost.quantity,
          unit: complexEquipment.cost.unit,
        },
        damage: {
          _type: "damage",
          damageDice: (complexEquipment.damage as WeaponDamage).damage_dice,
          damageType: {
            _ref: preparedDataMap[abilityScoreUrl]._id,
            _type: "reference",
          },
        },
        description_en_US: migrateToMarkdown(complexEquipment.desc),
        quantity: complexEquipment.quantity,
        range: {
          _type: "range",
          normal: complexEquipment.range.normal,
        },
        rangeCategory: complexEquipment.category_range,
        special_en_US: migrateToMarkdown(complexEquipment.special),
        speed: {
          _type: "vehicleSpeed",
          quantity: complexEquipment.speed.quantity,
          unit: complexEquipment.speed.unit,
        },
        stealthDisadvantage: complexEquipment.stealth_disadvantage,
        throwRange: {
          _type: "range",
          long: complexEquipment.throw_range.long,
          normal: complexEquipment.throw_range.normal,
        },
        toolCategory: complexEquipment.tool_category,
        twoHandedDamage: {
          _type: "damage",
          damageDice: (complexEquipment.two_handed_damage as WeaponDamage)
            .damage_dice,
          damageType: {
            _ref: preparedDataMap[abilityScoreUrl]._id,
            _type: "reference",
          },
        },
        vehicleCategory: complexEquipment.vehicle_category,
        weaponRange: complexEquipment.weapon_range,
        weight: complexEquipment.weight,
        properties: [
          {
            _ref: preparedDataMap[propertyUrl]._id,
            _type: "reference",
          },
        ],
        gearCategory: {
          _ref: preparedDataMap[standardGearUrl]._id,
          _type: "reference",
        },
        contents: [
          {
            _type: "item",
            item: {
              _type: "reference",
              _ref: preparedDataMap[backpackUrl]._id,
            },
            quantity: complexEquipment.contents[0].quantity,
          },
        ],
      },
    ]);
  });
});
