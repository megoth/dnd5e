import { v4 as uuidv4 } from "uuid";
import migrateActionDamage from "./index";
import { ActionData } from "../../../download/api.types";
import { getDnd5eUrl } from "../../../manage-data";

const damageTypeRelativeUrl = "/api/damage-types/piercing";
const damageTypeUrl = getDnd5eUrl(damageTypeRelativeUrl);
export const damageTypeId = uuidv4();
export const preparedDataMap = {
  [damageTypeUrl]: { _id: damageTypeId },
};

export const damage = {
  damage_type: {
    index: "piercing",
    name: "Piercing",
    url: damageTypeRelativeUrl,
  },
  damage_dice: "1d4+2",
};
const simpleActionWDamage: ActionData = {
  name: "Multiattack",
  damage: [damage],
};

describe("migrateActionDamage", () => {
  it("migrates damage data for attacks", () => {
    expect(migrateActionDamage(simpleActionWDamage, preparedDataMap)).toEqual([
      {
        _key: expect.any(String),
        _type: "damage",
        damageDice: damage.damage_dice,
        damageType: {
          _ref: damageTypeId,
          _type: "reference",
        },
      },
    ]);
  });
});
