import { v4 as uuidv4 } from "uuid";
import migrateDamage from "./index";
import {
  MonsterDamage,
  SpellDamageBySlotLevel,
} from "../../download/api.types";
import { getDnd5eUrl } from "../../manage-data";

const abilityScoreRelativeUrl = "/api/ability-scores/con";
const abilityScoreUrl = getDnd5eUrl(abilityScoreRelativeUrl);
const abilityScoreId = uuidv4();
const damageTypeRelativeUrl = "/api/damage-types/poison";
const damageTypeUrl = getDnd5eUrl(damageTypeRelativeUrl);
const damageTypeId = uuidv4();

const preparedDataMap = {
  [abilityScoreUrl]: { _id: abilityScoreId },
  [damageTypeUrl]: { _id: damageTypeId },
};

describe("migrateDamage", () => {
  it("migrates spell damage by slot level", () => {
    const damageAtSlotLevel: SpellDamageBySlotLevel = {
      damage_at_slot_level: {
        "7": "10d6",
      },
    };
    expect(migrateDamage(damageAtSlotLevel, {})).toEqual({
      _type: "damage",
      damageAtSlotLevel: [
        {
          _key: expect.any(String),
          _type: "damageAtSlotLevel",
          damage: damageAtSlotLevel.damage_at_slot_level[7],
          slot: 7,
        },
      ],
    });
  });

  it("migrates monster damage", () => {
    const monsterDamage: MonsterDamage = {
      damage_type: {
        index: "poison",
        name: "Poison",
        url: damageTypeRelativeUrl,
      },
      dc: {
        dc_type: {
          index: "con",
          name: "CON",
          url: abilityScoreRelativeUrl,
        },
        dc_value: 15,
        success_type: "half",
      },
      damage_dice: "7d6",
    };
    expect(migrateDamage(monsterDamage, preparedDataMap)).toEqual({
      _type: "damage",
      damageDice: monsterDamage.damage_dice,
      damageType: {
        _type: "reference",
        _ref: damageTypeId,
      },
      dc: {
        _type: "difficultyClass",
        difficultyClassType: {
          _type: "reference",
          _ref: abilityScoreId,
        },
        difficultyClassValue: monsterDamage.dc.dc_value,
        successType: monsterDamage.dc.success_type,
      },
    });
  });
});
