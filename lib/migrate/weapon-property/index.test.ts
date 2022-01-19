import { v4 as uuidv4 } from "uuid";
import migrateWeaponPropertyData from "./index";

const weaponPropertyUrl =
  "https://www.dnd5eapi.co/api/weapon-properties/special";
const weaponProperty = {
  index: "special",
  name: "Special",
  desc: [
    'A weapon with the special property has unusual rules governing its use, explained in the weapon\'s description (see "Special Weapons" later in this section).',
  ],
  url: "/api/weapon-properties/special",
};
const weaponPropertyId = uuidv4();
const weaponPropertyMap = {
  [weaponPropertyUrl]: weaponProperty,
};

describe("migrateWeaponPropertyData", () => {
  it("migrates data from D&D5e API to Sanity CMS", () => {
    expect(migrateWeaponPropertyData({})(weaponPropertyMap)).toEqual([
      {
        _type: "weaponProperty",
        name_en_US: weaponProperty.name,
        description_en_US: weaponProperty.desc.join("\n\n"),
      },
    ]);
  });

  it("preserves id from old data if available", () => {
    expect(
      migrateWeaponPropertyData({
        [weaponPropertyUrl]: {
          _id: weaponPropertyId,
          name_en_US: "TEST",
        },
      })(weaponPropertyMap)
    ).toEqual([
      {
        _id: weaponPropertyId,
        _type: "weaponProperty",
        name_en_US: weaponProperty.name,
        description_en_US: weaponProperty.desc.join("\n\n"),
      },
    ]);
  });
});
