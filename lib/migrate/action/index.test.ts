import { v4 as uuidv4 } from "uuid";
import migrateAction from "./index";
import { ActionData, ActionReferenceData } from "../../download/api.types";
import { getDnd5eUrl } from "../../manage-data";
import { damage, preparedDataMap as damageDataMap } from "./damage/index.test";
import { damageChoice } from "./damage-choice/index.test";

const abilityScoreRelativeUrl = "/api/ability-scores/str";
const abilityScoreUrl = getDnd5eUrl(abilityScoreRelativeUrl);
const abilityScoreId = uuidv4();
const preparedDataMap = {
  ...damageDataMap,
  [abilityScoreUrl]: { _id: abilityScoreId },
};

const simpleAction: ActionData = {
  name: "Multiattack",
};
const clawReference: ActionReferenceData = {
  name: "Claw",
  notes: "If in Oni form",
  count: 2,
  type: "melee",
};
const glaiveReference: ActionReferenceData = {
  name: "Glaive",
  count: 2,
  type: "melee",
};
const complexAction: ActionData = {
  attack_bonus: 1,
  name: "Multiattack",
  damage: [damage, damageChoice],
  desc: "The dragon makes three attacks: one with its bite and two with its claws.",
  dc: {
    dc_type: {
      index: "str",
      name: "STR",
      url: abilityScoreRelativeUrl,
    },
    dc_value: 18,
    success_type: "none",
  },
  options: {
    choose: 1,
    from: [glaiveReference, [clawReference]],
  },
  usage: {
    type: "at will",
  },
  attacks: [{ name: "First Roar" }],
  attack_options: {
    choose: 1,
    type: "attack",
    from: [{ name: "Cold Breath" }],
  },
};

describe("migrateActionValue", () => {
  it("migrates simple action data", () => {
    expect(migrateAction(simpleAction, preparedDataMap)).toEqual({
      _type: "action",
      name_en_US: simpleAction.name,
    });
  });

  it("migrates complex action data", () => {
    expect(migrateAction(complexAction, preparedDataMap)).toEqual({
      _type: "action",
      attackBonus: complexAction.attack_bonus,
      name_en_US: complexAction.name,
      damage: expect.any(Array),
      damageChoice: expect.any(Array),
      description_en_US: complexAction.desc,
      dc: {
        _type: "difficultyClass",
        difficultyClassType: {
          _ref: abilityScoreId,
          _type: "reference",
        },
        difficultyClassValue: complexAction.dc.dc_value,
        successType: complexAction.dc.success_type,
      },
      options: {
        _type: "actionOptions",
        choose: complexAction.options.choose,
        from: [
          {
            _key: expect.any(String),
            _type: "actionOption",
            attacks: [
              {
                _key: expect.any(String),
                _type: "actionReference",
                count: glaiveReference.count.toString(),
                name_en_US: glaiveReference.name,
                type: glaiveReference.type,
              },
            ],
          },
          {
            _key: expect.any(String),
            _type: "actionOption",
            attacks: [
              {
                _key: expect.any(String),
                _type: "actionReference",
                count: clawReference.count.toString(),
                name_en_US: clawReference.name,
                notes_en_US: clawReference.notes,
                type: clawReference.type,
              },
            ],
          },
        ],
      },
      usage: {
        _type: "actionUsage",
        type: complexAction.usage.type,
      },
      attacks: [
        {
          _key: expect.any(String),
          _type: "action",
          name_en_US: complexAction.attacks[0].name,
        },
      ],
      attackOptions: {
        _type: "actionChoice",
        choose: complexAction.attack_options.choose,
        from: [
          {
            _key: expect.any(String),
            _type: "action",
            name_en_US: complexAction.attack_options.from[0].name,
          },
        ],
      },
    });
  });
});
