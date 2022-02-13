import { v4 as uuidv4 } from "uuid";
import migrateTraitSpecificDragonkind from "./index";
import { DragonkindTrait } from "../../../download/api.types";
import { getDnd5eUrl } from "../../../manage-data";

const damageTypeRelativeUrl = "/api/damage-types/acid";
export const damageTypeUrl = getDnd5eUrl(damageTypeRelativeUrl);
export const damageTypeId = uuidv4();

export const preparedDataMap = {
  [damageTypeUrl]: { _id: damageTypeId },
};

export const dragonkindTraitSpecific: DragonkindTrait = {
  damage_type: {
    index: "acid",
    name: "Acid",
    url: damageTypeRelativeUrl,
  },
  breath_weapon: {
    name: "Breath Weapon",
  },
};

describe("migrateTraitSpecificDragonkind", () => {
  it("migrates trait specific data for dragonkind", () => {
    expect(
      migrateTraitSpecificDragonkind(dragonkindTraitSpecific, preparedDataMap)
    ).toEqual({
      breathWeapon: {
        _type: "action",
        name_en_US: dragonkindTraitSpecific.breath_weapon.name,
      },
      damageType: {
        _ref: damageTypeId,
        _type: "reference",
      },
    });
  });
});
