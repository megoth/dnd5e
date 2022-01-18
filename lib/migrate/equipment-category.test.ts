import { v4 as uuidv4 } from "uuid";
import migrateEquipmentCategoryData from "./equipment-category";

const equipmentCategoryUrl =
  "https://www.dnd5eapi.co/api/equipment-categories/equipment-packs";
const equipmentCategory = {
  index: "equipment-packs",
  name: "Equipment Packs",
  equipment: [
    {
      index: "burglars-pack",
      name: "Burglar's Pack",
      url: "/api/equipment/burglars-pack",
    },
    {
      index: "diplomats-pack",
      name: "Diplomat's Pack",
      url: "/api/equipment/diplomats-pack",
    },
    {
      index: "dungeoneers-pack",
      name: "Dungeoneer's Pack",
      url: "/api/equipment/dungeoneers-pack",
    },
    {
      index: "entertainers-pack",
      name: "Entertainer's Pack",
      url: "/api/equipment/entertainers-pack",
    },
    {
      index: "explorers-pack",
      name: "Explorer's Pack",
      url: "/api/equipment/explorers-pack",
    },
    {
      index: "priests-pack",
      name: "Priest's Pack",
      url: "/api/equipment/priests-pack",
    },
    {
      index: "scholars-pack",
      name: "Scholar's Pack",
      url: "/api/equipment/scholars-pack",
    },
  ],
  url: "/api/equipment-categories/equipment-packs",
};
const equipmentCategoryId = uuidv4();
const equipmentCategoryMap = {
  [equipmentCategoryUrl]: equipmentCategory,
};

describe("migrateEquipmentCategoryData", () => {
  it("migrates data from D&D5e API to Sanity CMS", () => {
    expect(migrateEquipmentCategoryData({})(equipmentCategoryMap)).toEqual({
      [equipmentCategoryUrl]: {
        _id: expect.any(String),
        _type: "equipmentCategory",
        name_en_US: equipmentCategory.name,
        slug: {
          _type: "slug",
          current: equipmentCategory.index,
        },
        url: equipmentCategoryUrl,
      },
    });
  });

  it("preserves id from old data if available", () => {
    expect(
      migrateEquipmentCategoryData({
        [equipmentCategoryUrl]: {
          _id: equipmentCategoryId,
          name_en_US: "TEST",
        },
      })(equipmentCategoryMap)
    ).toEqual({
      [equipmentCategoryUrl]: {
        _id: equipmentCategoryId,
        _type: "equipmentCategory",
        name_en_US: equipmentCategory.name,
        slug: {
          _type: "slug",
          current: equipmentCategory.index,
        },
        url: equipmentCategoryUrl,
      },
    });
  });
});
