import migrateActionDamageChoice from "./index";
import {
  damage,
  damageTypeId,
  preparedDataMap as damageDataMap,
} from "../damage/index.test";
import { ActionData } from "../../../download/api.types";

// eslint-disable-next-line import/prefer-default-export
export const damageChoice = {
  choose: 1,
  type: "damage",
  from: [damage],
};

const simpleActionWDamageChoice: ActionData = {
  name: "Multiattack",
  damage: [damageChoice],
};

describe("migrateActionDamageChoice", () => {
  it("migrates damage choice data for attacks", () => {
    expect(
      migrateActionDamageChoice(simpleActionWDamageChoice, damageDataMap)
    ).toEqual([
      {
        _key: expect.any(String),
        _type: "damageChoice",
        choose: damageChoice.choose,
        from: [
          {
            _key: expect.any(String),
            _type: "damage",
            damageDice: damage.damage_dice,
            damageType: {
              _ref: damageTypeId,
              _type: "reference",
            },
          },
        ],
      },
    ]);
  });
});
