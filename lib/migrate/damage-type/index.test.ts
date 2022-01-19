import { v4 as uuidv4 } from "uuid";
import migrateDamageTypeData from "./index";

const damageTypeUrl = "https://www.dnd5eapi.co/api/damage-types/thunder";
const damageType = {
  index: "thunder",
  name: "Thunder",
  desc: [
    "A concussive burst of sound, such as the effect of the thunderwave spell, deals thunder damage.",
  ],
  url: "/api/damage-types/thunder",
};
const damageTypeId = uuidv4();
const damageTypeMap = {
  [damageTypeUrl]: damageType,
};

describe("migrateDamageTypeData", () => {
  it("migrates data from D&D5e API to Sanity CMS", () => {
    expect(migrateDamageTypeData({})(damageTypeMap)).toEqual([
      {
        _type: "damageType",
        name_en_US: damageType.name,
        description_en_US: damageType.desc.join("\n\n"),
      },
    ]);
  });

  it("preserves id from old data if available", () => {
    expect(
      migrateDamageTypeData({
        [damageTypeUrl]: {
          _id: damageTypeId,
          name_en_US: "TEST",
        },
      })(damageTypeMap)
    ).toEqual([
      {
        _id: damageTypeId,
        _type: "damageType",
        name_en_US: damageType.name,
        description_en_US: damageType.desc.join("\n\n"),
      },
    ]);
  });
});
