import { v4 as uuidv4 } from "uuid";
import migrateMagicItemData from "./index";
import { getDnd5eUrl } from "../../manage-data";

const equipmentCategoryRelativeUrl = "/api/equipment-categories/wondrous-items";
const equipmentCategoryUrl = getDnd5eUrl(equipmentCategoryRelativeUrl);
const equipmentCategoryId = uuidv4();
const preparedDataMap = {
  [equipmentCategoryUrl]: { _id: equipmentCategoryId },
};
const magicItemUrl = "https://www.dnd5eapi.co/api/magic-items/chime-of-opening";
const magicItem = {
  index: "chime-of-opening",
  name: "Chime of Opening",
  equipment_category: {
    index: "wondrous-items",
    name: "Wondrous Items",
    url: equipmentCategoryRelativeUrl,
  },
  desc: [
    "Wondrous item, rare",
    "This hollow metal tube measures about 1 foot long and weighs 1 pound. You can strike it as an action, pointing it at an object within 120 feet of you that can be opened, such as a door, lid, or lock. The chime issues a clear tone, and one lock or latch on the object opens unless the sound can't reach the object. If no locks or latches remain, the object itself opens.",
    "The chime can be used ten times. After the tenth time, it cracks and becomes useless.",
  ],
  url: "/api/magic-items/chime-of-opening",
};

describe("migrateMagicItemData", () => {
  it("migrates data from D&D5e API to Sanity CMS", () => {
    expect(
      migrateMagicItemData(preparedDataMap)({
        [magicItemUrl]: magicItem,
      })
    ).toEqual([
      {
        _type: "magicItem",
        description_en_US: magicItem.desc.join("\n"),
        equipmentCategory: {
          _ref: equipmentCategoryId,
          _type: "reference",
        },
        name_en_US: "Chime of Opening",
      },
    ]);
  });
});
